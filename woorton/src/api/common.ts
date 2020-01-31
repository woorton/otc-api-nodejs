import qs from 'qs';
import axios from 'axios';
import { ErrorTypeApi, ErrorApi, RequeteApiType, Environment} from './types';

const prefix = {
  sandbox: 'https://api-sandbox.woorton.com',
  production: 'https://api.woorton.com'
};

export const requestToApi = async ( token: string, environment: Environment, type?: RequeteApiType, path?: string, params?: any ) => {
  const data = {
    ...params,
  }
  const dataQueryString = qs.stringify(data);
  let dataToInsert = '';
  let urlRequest = '';

  if(type === 'GET'){
    dataToInsert = null;
    urlRequest = `${prefix[environment]}${path}?${dataQueryString}`;
  } else {
    dataToInsert = dataQueryString;
    urlRequest = `${prefix[environment]}${path}`;
  }

  try {
    const response = await axios({
      method: type,
      url: urlRequest,
      data: dataToInsert,
      headers: {
        'Authorization': `Bearer ${token}?`
      },
    });
    return response.data;
  }
  catch (error) {
    const errorRequest = error.response.data as ErrorTypeApi; 
    return new ErrorApi( errorRequest.errors[0].message )    }
}