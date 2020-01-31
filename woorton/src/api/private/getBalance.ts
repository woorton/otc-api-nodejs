import { requestToApi } from '../common';
import { BalanceResponse, Environment } from '../types';

export const getBalance = async (token: string, environment: Environment): Promise<BalanceResponse> => {
  const response = (await requestToApi(token, environment, 'GET', '/api/v1/balances', {}));
  return response;
};
