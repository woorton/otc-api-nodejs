import * as Rx from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import Ws from 'isomorphic-ws';

const token = {
  youSandboxToken : `SandboxToken`,
  yourProdToken: `ProdToken`};

const prefixWebsocket = {
  sandbox: 'wss://sandbox.socket.woorton.com/',
  prod: 'wss://socket.woorton.com/'
};

const createWs = (token: string) =>
  class EnhancedWs extends Ws {
    constructor(address: string, options?: Ws.ClientOptions) {
      const headers = {
        'Authorization':`Bearer ${token}`,
      };
      const opts = {
        ...options,
        headers: {
          ...(options && options.headers),
          ...headers,
        },
      };
      super(address, opts);
    }
  };

const sockets: { [key: string]: WebSocketSubject<any> } = {};

export const connect = () => {
  if (!sockets[`${token}`]) {
    const open$ = new Rx.Subject();
    const close$ = new Rx.Subject();
    sockets[`${token}`] = webSocket({
      url: `${prefixWebsocket.sandbox}`,
      WebSocketCtor: createWs(`${token.youSandboxToken}`) as any,
      closeObserver: close$,
      openObserver: open$,
    });
    open$.subscribe(() => {
      console.log('Opening connection.');
    });
    close$.subscribe(() => {
      console.log('Closing connection.');
    });
  }
  return sockets[`${token}`];
};