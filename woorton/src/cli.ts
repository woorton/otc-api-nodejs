import commander from 'commander';
import * as Rx from 'rxjs';
import {getBalance, getExposures, getInstruments, 
        getLedger, requestForQuote, trade,
        RequestForQuoteParams, TradeParams,
        order, OrderParams } from './api'
import {RequestForQuoteResponse} from './api/types'
import { subscribe } from './api/websocket/subscribe';
import { watchLevels } from './abstract';


const crypto = require("crypto");

export type WebsocketParams = {
  base: string,
  quote: string
}

// tslint:disable-next-line:no-default-export
export default (program: typeof commander, args: string[]) => {
  program
  .command('getBalance')
  .action(async () => { 
    console.log( await getBalance()) }
  )

  program
  .command('getExposures')
  .action(async () => { 
    console.log( await getExposures()) }
  )

  program
  .command('getInstruments')
  .action(async () => { 
    console.log( await getInstruments()) }
  )

  program
  .command('getLedger')
  .option('--page [page]')
  .option('--per_page [per_page]')
  .action(async options => { 
    const opts = {
      page: options.page,
      per_page: options.per_page
    }
    console.log( await getLedger(opts)) }
  )

  program
    .command('requestForQuote')
    .option('--amount [amount]')
    .option('--instrument [instrument]')
    .option('--direction [direction]')
    .action(async (options: RequestForQuoteParams) => {
      const opts = {
        amount: options.amount,
        instrument: options.instrument,
        direction: options.direction
      }
      console.log( await requestForQuote(opts)) }
  )

  program
    .command('trade')
    .option('--request_id [request_id]')
    .option('--amount [amount]')
    .option('--total [total]')
    .option('--instrument [instrument]')
    .option('--direction [direction]')
    .action(async (options: TradeParams) => {
      const opts = {
        request_id: options.request_id,
        amount: options.amount,
        total: options.total,
        instrument: options.instrument,
        direction: options.direction
      }
      console.log( await trade(opts)) }
  )

  program
    .command('makeTrade')
    .option('--amount [amount]')
    .option('--total [total]')
    .option('--instrument [instrument]')
    .option('--direction [direction]')
    .action(async (options: RequestForQuoteParams) => {
      // First we make a request of trade 
      const optsRfq = {
        client_request_id: crypto.randomBytes(16).toString("hex"),
        amount: options.amount,
        instrument: options.instrument,
        direction: options.direction
      }

      const rfq = await requestForQuote(optsRfq) as RequestForQuoteResponse
      console.log(rfq)

      // We validate the trade 
      const opts = {
        request_id: rfq.request_id,
        amount: options.amount,
        total: rfq.total,
        instrument: options.instrument,
        direction: 'buy'
      } as TradeParams

      console.log( await trade(opts)) }
  )

  program
  .command('order')
  .option('--amount [amount]')
  .option('--requested_price [requested_price]')
  .option('--order_type [order_type]')
  .option('--direction [direction]')
  .option('--instrument [instrument]')
  .action(async (options: OrderParams) => { 
      const opts = {
        amount: options.amount,
        requested_price: options.requested_price,
        order_type: options.order_type,
        direction: options.direction,
        instrument: options.instrument,
      }
      console.log( await order(opts))
    }
  )

  // TEST WEBSOCKET
  program
  .command('testWebsocket')
  .option('--base [base]')
  .option('--quote [quote]')
  .action(async (option: WebsocketParams) => {
    const symbol = `${option.base}${option.quote}`
    const instrument = `${symbol.toUpperCase()}.SPOT`
    const sub = {
      event: 'subscribe',
      instrument: `${instrument}`
    }
    const unsub = {
      event: 'unsubscribe',
      instrument: `${instrument}`
    }
    const operator = subscribe(sub, unsub);
    Rx.from(operator).subscribe({
      next: value => {
        console.log(value)
        if(option.base === undefined || option.quote === undefined){
          console.log('Pass the base and quote')
          process.exit(1);
        }
      },
      error: error => {
        console.error(error);
        process.exit(1);
      },
      complete: () => {
        console.log("finish")
        process.exit(0);
      },
    });
  });

  /* ABSTRACT */
  program
  .command('getLevels')
  .option('--base [base]')
  .option('--quote [quote]')
  .action(async (options: WebsocketParams) => {

    const operator = watchLevels(options)  

    Rx.from(operator).subscribe({
      next: level => {
        console.log(level)
        console.log('')
        if(options.base === undefined || options.quote === undefined){
          console.log('Pass the base and quote')
          process.exit(1);
        }
      },
      error: error => {
        console.error(error);
        process.exit(1);
      },
      complete: () => {
        process.exit(0);
      },
    });
  });

  program.on('command:*', () => {
    program.help();
    process.exit(1);
  });

  program.parse(args);
  if (!program.args.length) {
    program.help();
    process.exit(1);
  }
};