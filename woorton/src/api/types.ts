import * as Rx from 'rxjs';

export type BidsOrAsks = [number, number];

// REQUEST TO API PARAMETER
export type RequeteApiType = 'GET'| 'POST' | 'DELETE' | 'PUT'

export type Environment = 'production' | 'sandbox'
///

// ErrorAPi
export interface ErrorCustom {
  message: string;  
}
export interface ErrorTypeApi {
  errors: ErrorCustom[]
}

export class ErrorApi extends Error {
  message: any;
  constructor ( message: any) {
    super(message);
    this.message = message
  }
}

export interface ErrorTypeApi {
  msg: string,
}
///

// Request for Quote
export type RequestForQuoteResponseType = RequestForQuoteResponse | ErrorApi

export type RequestForQuoteResponse = {
  client_request_id: string,
  request_id: string,
  instrument: string,
  direction: 'buy' | 'sell',
  amount: string,
  total: number,
  price: number,
  created_at: string,
  expires_at: string
};
////

// Trade
export type TradeResponse = {
  request_id: string,
  client_request_id: string,
  total: number,
  amount: string,
  instrument: string,
  direction: 'buy' | 'sell',
  state: 'executed' | 'pending_quote' | 'canceled',
  created_at: string,
  executed_at: string
} | ErrorApi;
////

// Order
export type OrderResponseType = OrderResponse | ErrorApi

export type OrderResponse = {
  client_request_id: string,
  amount: string,
  price: string,
  total: string,
  direction: 'buy' | 'sell',
  instrument: string,
  state: string,
  order_type: 'FOK' | 'MKT',
  created_at: {},
  expires_at: {}
};
////

// Balance
export type BalanceResponse = {
  EUR: string,
  USD: string,
  GBP: string,
  CHF: string,
  CAD: string,
  UST: string,
  BTC: string,
  ETH: string,
  BCH: string,
  LTC: string,
  XRP: string,
  EOS: string,
} | ErrorApi;
////

// Exposures
export type ExposuresResponse = {
  BTC: string,
  ETH: string,
  BCH: string,
  LTC: string,
  XRP: string,
  EOS: string,
} | ErrorApi;
////

// Instruments
export type InstrumentsResponse = {
  instrument: string[]
} | ErrorApi;
////

// Get Ledger
export type Ledger = {
  operation_id: number,
  trade_id: string,
  date: string,
  category: string,
  currency: string,
  type: string,
  amount: string
}

export type LedgerResponse = {
  lerger: Ledger[]
} | ErrorApi
////

// WebSockets
export interface BuyOrSell { price: string, quantity: string}

export type TestApiResponse = {
  event: string,
  success: boolean,
  instrument: string,
  levels: {
    buy: BuyOrSell[]
    sell: BuyOrSell[]
  },
  timestamp: number
}
////

// STREAM (LEVEL) TYPE
export type StreamLevelResponse = StreamLevelResponseType | ErrorApi;

export interface StreamLevelResponseType {
  asks: BidsOrAsks[],
  bids: BidsOrAsks[]
}
///

// ***************************LEVEL (ABSTRAT)****************************** //

export type Symbol = string;

export interface StreamLevel<A extends Symbol> {
  instrument: string;
  sell: StreamLevelEntry[];
  buy: StreamLevelEntry[];
}

export interface StreamLevelEntry {
  price: string;
  quantity: string;
}

export type StreamLevelObserver<O = {}, A extends Symbol = Symbol> = (token: string, environment: Environment, options?: O) => Rx.Observable<StreamLevel<A>>;
