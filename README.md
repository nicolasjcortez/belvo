# Project info
## Dockerfile
#### both front end and backend have their individaul Docker file, you can run it 

## Public URL 
#### forntend:  https://belvofront.herokuapp.com/docs
#### backend:  https://belvoapi.herokuapp.com/docs

# Running backend locally

## Install Packages

#### $ cd /backend/app
#### $ pip install -r requirements

## Change the Postgres database conection string on files

#### database.py => variable: SQLALCHEMY_DATABASE_URL
#### alembic.ini => variable: sqlalchemy.url

## Execute migration on the db

#### $ alembic upgrade head

## Run app locally
#### Uncomment main function on main.py
#### $ python main.py


# Running Frontend locally

## Install Packages

#### $ cd /frontend
#### $ npm i 

## Run locally
#### ng serve




