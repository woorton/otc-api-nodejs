import { requestToApi } from '../common';
import { BalanceResponse } from '../types';

export const getBalance = async (): Promise<BalanceResponse> => {
  const response = (await requestToApi('GET', '/api/v1/balances', {}));
  return response;
};
