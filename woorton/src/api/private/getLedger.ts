import { requestToApi } from '../common';
import { LedgerResponse } from '../types';

export interface LedgerParams {
  page: string,
  per_page: string
}

export const getLedger = async (params: LedgerParams): Promise<LedgerResponse> => {
  const response = (await requestToApi('GET', '/api/v1/ledger', params));
  return response;
};
