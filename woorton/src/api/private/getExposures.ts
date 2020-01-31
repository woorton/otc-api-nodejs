import { requestToApi } from '../common';
import { ExposuresResponse } from '../types';

export const getExposures = async (): Promise<ExposuresResponse> => {
  const response = (await requestToApi('GET', '/api/v1/exposures', {}));
  return response;
};
