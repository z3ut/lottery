# Lottery

Schedule /roll website

## Description

Schedule rolls with parameters - roll range, date, description. Find scheduled and completed rolls by id.

## Development

Env variables:

- LOTTERY_DB_USER
- LOTTERY_DB_PASSWORD
- LOTTERY_DB_NAME
- LOTTERY_DB_HOST
- LOTTERY_SERVER_PORT
- LOTTERY_SERVER_HOST - used for Location HTTP Header and fetching api from client

Start with Docker compose:

```
docker-compose down -v --rmi all --remove-orphans
docker-compose build --no-cache
docker-compose up --force-recreate
```

Navigate to http://locahost:80
