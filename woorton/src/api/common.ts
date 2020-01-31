import qs from 'qs';
import axios from 'axios';
import { ErrorTypeApi, ErrorApi, RequeteApiType} from './types';

const token = {
  youSandboxToken : `SandboxToken`,
  yourProdToken: `ProdToken`};

const prefix = {
  sandbox: 'https://api-sandbox.woorton.com',
  prod: 'https://api.woorton.com'
};

export const requestToApi = async ( type?: RequeteApiType, path?: string, params?: any ) => {
  const data = {
    ...params,
  }
  const dataQueryString = qs.stringify(data);
  let dataToInsert = '';
  let urlRequest = '';

  if(type === 'GET'){
    dataToInsert = null;
    urlRequest = `${prefix.sandbox}${path}?${dataQueryString}`;
  } else {
    dataToInsert = dataQueryString;
    urlRequest = `${prefix.sandbox}${path}`;
  }

  try {
    const response = await axios({
      method: type,
      url: urlRequest,
      data: dataToInsert,
      headers: {
        'Authorization': `Bearer ${token.youSandboxToken}?`
      },
    });
    return response.data;
  }
  catch (error) {
    const errorRequest = error.response.data as ErrorTypeApi; 
    return new ErrorApi( errorRequest.errors[0].message )    }
}