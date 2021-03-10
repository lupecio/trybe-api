import { Router } from 'express';

import GetBtcBalanceService from '../services/GetBtcBalanceService';
import UpdateCurrenciesService from '../services/UpdateCurrenciesService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const crytoRouter = Router();

crytoRouter.use(ensureAuthenticated);

crytoRouter.get('/btc', async (request, response) => {
  const btcBalanceService = new GetBtcBalanceService();

  const btcCurrentPrice = await btcBalanceService.execute();

  return response.json(btcCurrentPrice);
});

crytoRouter.post('/btc', async (request, response) => {
  const { currency, value } = request.body;

  const updateCurrenryService = new UpdateCurrenciesService();

  const btcCurrentPrice = await updateCurrenryService.execute({
    currency, value
  });

  return response.json(btcCurrentPrice);
});

export default crytoRouter;
