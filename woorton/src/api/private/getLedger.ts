import { requestToApi } from '../common';
import { LedgerResponse, Environment } from '../types';

export interface LedgerParams {
  page: string,
  per_page: string
}

export const getLedger = async (params: LedgerParams, token: string, environment: Environment): Promise<LedgerResponse> => {
  const response = (await requestToApi(token, environment, 'GET', '/api/v1/ledger', params));
  return response;
};
