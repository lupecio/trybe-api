# Baixar dependências

yarn ou npm install

# Iniciar o projeto

yarn dev:server ou npm run dev:server

# Rodar os testes

yarn test ou npm run test

# Login

## POST /api/login

#### RESPONSE

```
{
  token: "token123"
}
```

# Cryto

## GET /api/btc

#### RESPONSE

```
{
  "time": {
    "updated": "Mar 9, 2021 20:37:00 UTC",
    "updatedISO": "2021-03-09T20:37:00+00:00",
    "updateduk": "Mar 9, 2021 at 20:37 GMT"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "bpi": {
    "USD": {
      "code": "USD",
      "rate": "54,497.5183",
      "description": "United States Dollar",
      "rate_float": 54497.5183
    },
    "BTC": {
      "code": "BTC",
      "rate": "1.0000",
      "description": "Bitcoin",
      "rate_float": 1
    },
    "EUR": {
      "code": "EUR",
      "rate": "50137.71683600001",
      "description": "Euro",
      "rate_float": 50137.71683600001
    },
    "BRL": {
      "code": "BRL",
      "rate": "572223.94215",
      "description": "Brazilian Real",
      "rate_float": 572223.94215
    },
    "CAD": {
      "code": "CAD",
      "rate": "78476.426352",
      "description": "Canadian Dollar",
      "rate_float": 78476.426352
    }
  }
}
```

## POST /api/btc

#### REQUEST

```
  {
    "currency": "BRL",
    "value": 5.4
  }
```

#### RESPONSE

```
  {
    "message": "Valor alterado com sucesso!"
  }
```
