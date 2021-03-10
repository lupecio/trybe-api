import axios from 'axios';

import Cryto from '../models/Cryto';
import Currency from '../models/Currency';
import CurrencyType from '../models/CurrencyType';

interface ResponseBtc {
  time: {
    updated: Date,
    updatedISO: Date,
    updateduk: Date
  },
  disclaimer: string,
  bpi: {
    USD: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    BRL: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    EUR: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    CAD: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    },
    BTC: {
      code: string,
      rate: string,
      description: string,
      rate_float: number
    }
  }
}

class GetBtcBalanceService {
  public async execute(): Promise<ResponseBtc> {
    const fs = require('fs');
    const { data }: Cryto = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');

    const currenciesRawData = fs.readFileSync('currencies.json');
    let currencies: CurrencyType = JSON.parse(currenciesRawData);

    const brlCurrency = new Currency();
    brlCurrency.code = "BRL";
    brlCurrency.rate = (currencies.BRL * data.bpi.USD.rate_float).toString();
    brlCurrency.description = "Brazilian Real";
    brlCurrency.rate_float = currencies.BRL * data.bpi.USD.rate_float;

    const cadCurrency = new Currency();
    cadCurrency.code = "CAD";
    cadCurrency.rate = (currencies.CAD * data.bpi.USD.rate_float).toString();
    cadCurrency.description = "Canadian Dollar";
    cadCurrency.rate_float = currencies.CAD * data.bpi.USD.rate_float;

    const eurCurrency = new Currency();
    eurCurrency.code = "EUR";
    eurCurrency.rate = (currencies.EUR * data.bpi.USD.rate_float).toString();
    eurCurrency.description = "Euro";
    eurCurrency.rate_float = currencies.EUR * data.bpi.USD.rate_float;

    const currenciesInBTC: ResponseBtc = {
      time: data.time,
      disclaimer: data.disclaimer,
      bpi: {
        USD: data.bpi.USD,
        BTC: data.bpi.BTC,
        EUR: eurCurrency,
        BRL: brlCurrency,
        CAD: cadCurrency
      }
    };

    return currenciesInBTC;
  }
}

export default GetBtcBalanceService;
