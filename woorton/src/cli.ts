import commander from 'commander';
import * as Rx from 'rxjs';
import {getBalance, getExposures, getInstruments, 
        getLedger, requestForQuote, trade,
        RequestForQuoteParams, TradeParams,
        order, OrderParams } from './api'
import {RequestForQuoteResponse, Environment} from './api/types'
import { watchLevels } from './abstract';


const crypto = require("crypto");

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export type WebsocketParams = {
  base: string,
  quote: string
}

export type RequestParams = {
  token: string,
  environment: Environment
}
// tslint:disable-next-line:no-default-export
export default (program: typeof commander, args: string[]) => {
  program
  .command('getBalance')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async (options: RequestParams) => { 
    console.log( await getBalance(options.token, options.environment)) }
  )

  program
  .command('getExposures')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async (options: RequestParams) => { 
    console.log( await getExposures(options.token, options.environment)) }
  )

  program
  .command('getInstruments')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async (options: RequestParams) => { 
    console.log( await getInstruments(options.token, options.environment)) }
  )

  program
  .command('getLedger')
  .option('--page [page]')
  .option('--per_page [per_page]')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async options => { 
    const opts = {
      page: options.page,
      per_page: options.per_page
    }
    const paramsReq = {
      token: options.token,
      environment: options.environment
    }
    console.log( await getLedger(opts, paramsReq.token, paramsReq.environment)) }
  )

  program
    .command('requestForQuote')
    .option('--amount [amount]')
    .option('--total [total]')
    .option('--instrument [instrument]')
    .option('--direction [direction]')
    .option('--token [token]')
    .option('--environment [environment]')
    .action(async (options) => {
      // First we make a request of trade 
      const optsRfq = {
        client_request_id: crypto.randomBytes(16).toString("hex"),
        amount: options.amount,
        instrument: options.instrument,
        direction: options.direction
      } as RequestForQuoteParams

      const paramsReq = {
        token: options.token,
        environment: options.environment
      }
      const rfq = await requestForQuote(optsRfq, paramsReq.token, paramsReq.environment) as RequestForQuoteResponse
      console.log(rfq)

      // We validate the trade 
      const opts = {
        request_id: rfq.request_id,
        amount: options.amount,
        total: rfq.total,
        instrument: options.instrument,
        direction: 'buy'
      } as TradeParams

      rl.question('Do you confirm the Quote? y/n : ', async (answer: string) => {
        if (answer === 'y' || answer === 'Y' || answer === 'yes'){
          console.log( await trade(opts, paramsReq.token, paramsReq.environment)) 
          rl.close();
        } else {
          console.log(`Nothing Done`);
          rl.close();
        }
      });
    }
  )

  program
  .command('order')
  .option('--amount [amount]')
  .option('--requested_price [requested_price]')
  .option('--order_type [order_type]')
  .option('--direction [direction]')
  .option('--instrument [instrument]')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async (options) => { 
      const opts = {
        amount: options.amount,
        requested_price: options.requested_price,
        order_type: options.order_type,
        direction: options.direction,
        instrument: options.instrument,
      } as OrderParams

      const paramsReq = {
        token: options.token,
        environment: options.environment
      }
      console.log( await order(opts, paramsReq.token, paramsReq.environment))
    }
  )

  /* ABSTRACT */
  program
  .command('streamPrice')
  .option('--base [base]')
  .option('--quote [quote]')
  .option('--token [token]')
  .option('--environment [environment]')
  .action(async (options) => {

    const paramsReq = {
      token: options.token,
      environment: options.environment
    }

    const operator = watchLevels(paramsReq.token, paramsReq.environment, options,)  

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