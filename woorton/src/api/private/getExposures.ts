import { requestToApi } from '../common';
import { ExposuresResponse, Environment } from '../types';

export const getExposures = async (token: string, environment: Environment): Promise<ExposuresResponse> => {
  const response = (await requestToApi(token, environment, 'GET', '/api/v1/exposures', {}));
  return response;
};
