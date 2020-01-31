import { requestToApi } from '../common';
import { InstrumentsResponse } from '../types';

export const getInstruments = async (): Promise<InstrumentsResponse> => {
  const response = (await requestToApi('GET', '/api/v1/instruments', {}));
  return response;
};
