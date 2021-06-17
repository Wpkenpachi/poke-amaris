# Amaris Consulting Challenge - Backend Developer

## Required
  - Docker
  - Docker-Compose
## Setup
  - First Clone the project
  - Run `$ docker-compose up` or `$ docker compose up -d` inside the project folder, to up the api server and databases
  - Access [http://localhost:8000/api](http://localhost:8000/api) in the browser to see the swagger documentation
  - Obs: [Insomnia export request file 'Insomnia_2021-06-16_export.json'](Insomnia_2021-06-16_export.json)
# Aboute the Challenge
## FEATURES
  * [x] Login (JWT Auth)
  * [x] User Registration
  * [x] User Edit (Changes allowed only for the own user)
  * [x] Pokemon Registration (Authenticated Route)
  * [x] Pokemon Edit (Authenticated)
  * [x] Get Pokemon List (Authenticated)
  * [x] Get Pokemon Details (Authenticated)
  * [x] Pokemon Delete (Authenticated)

## PRÉ-REQUISITOS
  * [x] É necessário nos enviar a coleção do Postman / Insomnia, para averiguarmos
  * [x] O projeto precisa ter autenticação, usar JWT nos Endpoints
  * [x] No arquivo README.MD do projeto, precisa constar o setup
  * [x] Projeto em NODEJS usando Express
  * [x] Setup com MongoDB

## DESEJÁVEL
  * [x] Setup com Docker ( usando docker-compose se possível )
  * [x] Documentação da API ( swagger, ApiDoc, etc. )
  * [x] Projeto desenvolvido com NESTJS
  * [x] Setup também com PostgreSQL

## DESEJÁVEL PLUS
 * [ ] Projeto usar Kubernetes com o minikube
 * [ ] Testes unitários ( sugestão JEST )