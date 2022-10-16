# Project info
## Features
#### Sign up and Login
#### Create a link in Belvo
#### For accounts that incomes are available, generate a bar chart of income per type

## Dockerfile
#### both front end and backend have their individaul Docker file, you can run it 

## Public URL 
#### forntend:  https://belvofront.herokuapp.com/
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

# BUGS
## Not deleting existing links on belvo
#### When user is deleted on db should delete the links on belvo as well. Some links already exists on belvo, external_id are already set for id 1,2,3. 
## Duplicated Links
#### Is it possible to create same link twice on create link

# Improvements 
## Develop tests on backend and frontend



