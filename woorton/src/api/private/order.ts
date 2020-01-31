import { requestToApi } from '../common';
import { OrderResponseType } from '../types';

export interface OrderParams {
  amount: string,
  requested_price?: string,
  order_type: 'FOK' | 'MKT',
  direction: 'buy' | 'sell',
  instrument: string,
}

export const order = 
async (requestParams: OrderParams): Promise<OrderResponseType> => {
  const crypto = require("crypto");
  const body = {
    client_request_id: crypto.randomBytes(16).toString("hex"),
    requested_price: requestParams.requested_price,
    amount: requestParams.amount,
    order_type: requestParams.order_type,
    instrument: requestParams.instrument,
    direction: requestParams.direction
  }
  console.log(body)
  const response = (await requestToApi('POST', `/api/v1/orders`, body));
  return response;
};