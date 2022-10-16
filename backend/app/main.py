from datetime import datetime, timedelta
import json
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import engine
import uvicorn
from belvo.client import Client
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import crud, models, schemas, security
from deps import get_db, get_current_user
from database import SessionLocal, engine
from fastapi.security import  OAuth2PasswordRequestForm
from belvo.exceptions import RequestError

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
client = Client("92a0aad7-c815-4d14-8206-f5baf1f51605", "QhjuC9FVyPx#Yka-tUw*BLsbJe43S88iFFPcVrV2qPPjHanwaTLKsn5*wnGPoC2e", "sandbox")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/belvo/auth/token")
def token():
    token = client.WidgetToken.create()
    return token


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


@app.post("/token/", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/me/links/")
async def create_link_for_user(   link: schemas.LinkCreate, 
                            db: Session = Depends(get_db),
                            current_user: models.User = Depends(get_current_user),
                        ):
    return crud.create_user_link(db=db, link=link, user_id=current_user.id)

def get_generator(gen):
    yield from gen

@app.get("/users/me/links/details")
def get_links_for_user(  
                         current_user: models.User = Depends(get_current_user),
                        ):
    try:
        gen = client.Links.list(external_id=current_user.id)
        response = list(get_generator(gen))
    except RequestError as e:
        return format_error(e)

    pretty_print_response(response)
    return response


@app.post("/accounts")
def retrieve_accounts(link: schemas.LinkBase):
    try:
        response = client.Accounts.create(link=link.link)

    except RequestError as e:
        return format_error(e)

    pretty_print_response(response)
    return response


@app.post("/transactions")
def retrieve_transactions(link: schemas.LinkBase):
    try:
        response = client.Transactions.create(
            link=link.link,
            date_from=datetime.strftime(datetime.now() - timedelta(days=30), "%Y-%m-%d"),
            date_to=datetime.strftime(datetime.now(), "%Y-%m-%d"),
        )

    except RequestError as e:
        return format_error(e)

    pretty_print_response(response)
    return response

@app.post("/transactions_table")
def retrieve_transactions_table(req: schemas.LinkAndAccount):
    try:
        all_transactions = client.Transactions.create(
            link=req.link_id,
            date_from=datetime.strftime(datetime.now() - timedelta(days=30), "%Y-%m-%d"),
            date_to=datetime.strftime(datetime.now(), "%Y-%m-%d"),
        )
        account_transactions = [i for i in all_transactions if i['account']["id"] == req.account_id]
        response = []
        for trans in account_transactions:
            filtered_trans = {
                "type": trans["type"],
                "accounting_date": trans["accounting_date"],
                "currency": trans["currency"],
                "amount": trans["amount"],
                "status": trans["status"],
                "description": trans["description"]
            }
            response.append(filtered_trans)
        response.sort(key=lambda item:item['accounting_date'], reverse=True)
    except RequestError as e:
        return format_error(e)

    pretty_print_response(response)
    return response

@app.post("/incomes")
def retrieve_income_report_data(incomes_req: schemas.LinkAndAccount):
    try:
        all_incomes = client.Incomes.create(
            link=incomes_req.link_id
        )
        account_incomes = [i for i in all_incomes if i['account']["id"] == incomes_req.account_id]
        if len(account_incomes) <= 0:
            return {}
        account_income = account_incomes[0]

        response = {}
        response["currency"] = account_income["currency"]
        response["types_amount"] = {}
        for sources in account_income["sources"]:
            total_amount = 0
            for transaction in sources["transactions"]:
                total_amount += transaction["amount"]

            trans_type = sources["type"]
            if trans_type in response["types_amount"]:
                response["types_amount"][trans_type] += total_amount
            else:
               response["types_amount"][trans_type]  = total_amount
        
        # converting into chart data
        chart = []
        for type_a in response["types_amount"]:
            bar = {}
            bar["name"] = type_a
            bar["value"] = response["types_amount"][type_a]
            chart.append(bar)
        response["chart"] = chart


    except RequestError as e:
        return format_error(e)

    return response


@app.post("/owners")
def retrieve_owners(link: schemas.LinkBase):
    try:
        response = client.Owners.create(link=link.link)

    except RequestError as e:
        return format_error(e)

    pretty_print_response(response)
    return response


def format_error(e):
    return {
        "error": {
            "display_message": e.display_message,
            "error_code": e.code,
            "error_type": e.type,
            "error_message": e.message,
        }
    }

def pretty_print_response(response):
    print(json.dumps(response, indent=2, sort_keys=True))


# Comment to deploy
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000, debug=True)