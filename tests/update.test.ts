import UpdateCurrenciesService from '../src/services/UpdateCurrenciesService';
import AppError from '../src/errors/AppError';

test('update value of currency', async() => {
  const updateCurrency = new UpdateCurrenciesService();

  const currenyUpdated = await updateCurrency.execute({
    currency: 'BRL',
    value: 11.0
  });

  const fs = require('fs');

  const currenciesRawData = fs.readFileSync('currencies.json');
  let currencies: {[key: string]: string} = JSON.parse(currenciesRawData);

  expect(currenyUpdated.message).toBe("Valor alterado com sucesso!");
  expect(currencies['BRL']).toBe("11");
});

test('update currency with wrong currency', async() => {
  const updateCurrency = new UpdateCurrenciesService();

  await expect(updateCurrency.execute({
    currency: 'AUS',
    value: 11.0
  })).rejects.toBeInstanceOf(AppError)
});
