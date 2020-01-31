import { requestToApi } from '../common';
import { TradeResponse, Environment } from '../types';

export interface TradeParams {
  request_id: string,
  amount: number,
  total: number,
  instrument: string,
  direction: 'buy' | 'sell'
}

export const trade = 
async (requestParams: TradeParams, token: string, environment: Environment): Promise<TradeResponse> => {
  const response = (await requestToApi(token, environment, 'POST', `/api/v1/trades`, requestParams));
  return response;
};