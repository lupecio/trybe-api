import AppError from "../errors/AppError";

interface Request {
  currency: string;
  value: number;
}

interface Response {
  message: string;
}

class GetBtcBalanceService {
  public async execute({currency, value}: Request): Promise<Response> {
    if (typeof value !== 'number') {
      throw new AppError('Valor inválido');
    }

    const fs = require('fs');

    const currenciesRawData = fs.readFileSync('currencies.json');
    let currencies: {[key: string]: string} = JSON.parse(currenciesRawData);

    if (!currencies.hasOwnProperty(currency)) {
      throw new AppError('Moeda inválida');
    }

    Object.keys(currencies).map(currencyName => {
      if (currencyName === currency) {
        currencies[currencyName] = value.toString();
      }
    });

    fs.writeFileSync('currencies.json', JSON.stringify(currencies), function (err: any) {
      throw new AppError('Erro ao salvar arquivo');
    });

    return {
      message: 'Valor alterado com sucesso!'
    }

  }
}

export default GetBtcBalanceService;
