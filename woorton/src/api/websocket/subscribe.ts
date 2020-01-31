import * as Rx from 'rxjs';
import { map, share, concatMap } from 'rxjs/operators';
import { connect } from './connect';
import { TestApiResponse} from '../types';

export const subscribe = (paramsSub: any, paramsUnsub: any): Rx.Observable<TestApiResponse> => {
  const subMsg = () => ({
    ...paramsSub
  });

  const unsubMsg = () => ({
    ...paramsUnsub
  });

  const filterFn = (message: any) => {
    return message;
  };

  const multiplex$ = connect().multiplex(subMsg, unsubMsg, filterFn);
  return multiplex$.pipe(
    concatMap(value => {
      if (value.type === 'ERROR') {
        return Rx.throwError(new Error(value.error));
      }
      return Rx.of(value);
    }),
    map((value: any) => {
      return value  as TestApiResponse
    }),
    share(),
  );
};
