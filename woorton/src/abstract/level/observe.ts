import * as Rx from 'rxjs';
import { subscribe } from '../../api/websocket';
import { share, filter, map } from 'rxjs/operators';
import {TestApiResponse,Environment,
  StreamLevel,
  Symbol,
  StreamLevelObserver
} from '../../api/types';

export interface WatchOptions {
  base: Symbol;
  quote: Symbol;
}

export type WebsocketParams = {
  base: string,
  quote: string
}

const snapshot = (
  subscriber: Rx.Subscriber<StreamLevel<Symbol>>,
  state: (message: StreamLevel<Symbol>) => StreamLevel<Symbol>,
) => (message: StreamLevel<Symbol>) => {
  const current = state(message);
  current.sell = []
  current.buy = []
  current.instrument = message.instrument
  current.sell = message.sell;

  current.buy = message.buy;

  subscriber.next({
    instrument: current.instrument,
    sell: current.sell.slice(),
    buy: current.buy.slice(),
  });
};

export const observe: StreamLevelObserver<WatchOptions> = 
  (token: string, environment: Environment, options: WebsocketParams, ) =>
  new Rx.Observable(subscriber => {
    const symbol = `${options.base}${options.quote}`
    const instrument = `${symbol.toUpperCase()}.SPOT`
    const sub = {
      event: 'subscribe',
      instrument: `${instrument}`
    }
    const unsub = {
      event: 'unsubscribe',
      instrument: `${instrument}`
    }
    const messages$ = subscribe(sub, unsub, token, environment).pipe(share());

    const state: StreamLevel<Symbol> = {
      instrument:'',
      sell: [],
      buy: [],
    };

    const snapshots$ = messages$.pipe(
      filter(value => value.event === `price`),
      map(message => {
        const data = message as TestApiResponse

        const sell = data.levels.sell.map(value => ({
          price: value.price,
          quantity: value.quantity
        }));
        const buy = data.levels.buy.map(value => ({
          price: value.price,
          quantity: value.quantity
        }));
        // tslint:disable-next-line:variable-name
        const instrument = data.instrument 
        return { sell, buy, instrument };
      }),
    );

    const snapshots = snapshots$.subscribe(snapshot(subscriber, () => state));

    return () => {
      snapshots.unsubscribe();
    };
  });