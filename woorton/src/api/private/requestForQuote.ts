import { requestToApi } from '../common';
import { RequestForQuoteResponseType, Environment } from '../types';

const crypto = require("crypto");

export interface RequestForQuoteParams {
  amount: number,
  instrument: string,
  direction: 'buy' | 'sell'
}

export const requestForQuote = 
async (requestParams: RequestForQuoteParams, token: string, environment: Environment): Promise<RequestForQuoteResponseType> => {
  const body = {
    client_request_id: crypto.randomBytes(16).toString("hex"),
    amount: requestParams.amount,
    instrument: requestParams.instrument,
    direction: requestParams.direction
  }
  const response = (await requestToApi(token, environment, 'POST', `/api/v1/request_quotes`, body));
  return response;
};