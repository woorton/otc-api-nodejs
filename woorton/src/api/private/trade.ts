import { requestToApi } from '../common';
import { TradeResponse } from '../types';

export interface TradeParams {
  request_id: string,
  amount: number,
  total: number,
  instrument: string,
  direction: 'buy' | 'sell'
}

export const trade = 
async (requestParams: TradeParams): Promise<TradeResponse> => {
  const response = (await requestToApi('POST', `/api/v1/trades`, requestParams));
  return response;
};