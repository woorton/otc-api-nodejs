import { requestToApi } from '../common';
import { InstrumentsResponse, Environment } from '../types';

export const getInstruments = async (token: string, environment: Environment): Promise<InstrumentsResponse> => {
  const response = (await requestToApi(token, environment, 'GET', '/api/v1/instruments', {}));
  return response;
};
