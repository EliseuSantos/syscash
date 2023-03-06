# SysCash

## Requirements
- Docker
- docker-compose

# Instalation
    - Docker
        - docker-compose up -d
    - Manual
        - API
            - cd api
            - npm i
            - cp .env.example .env
            - npm run seed
            - npm run start:dev
        - FRONT
            - cd front
            - npm i
            - cp .env.example .env
            - npm run start



# Containers
- MongoDB: 27017
- MongoDB Express: 8081
- API(nestjs) : 8000
- FrontEnd(reactjs): 3000

# Commands
- API
    - Coverage
        - npm run test
        - open api/coverage/lcov-report/index.html

# Figma
- https://www.figma.com/file/sFQYk5GBpFOn8AUEBz61t3/SysCash?node-id=0%3A1&t=LQi1X9woGFkd4c4A-1


# Framework
- ReactJS
- NestJS

# Arquitetura

- API
    - DDD
