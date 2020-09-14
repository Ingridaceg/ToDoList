import axios from 'axios';
import get from 'lodash/get';

import {httpCodes, httpMethods} from "../core/constants";

const restApi = axios.create({
  baseURL: 'http://localhost:5000'
});

const httpRequest = async (endPoint, method, body = null, headers = {}) => {
  try {
   const response = await restApi({
     data: body,
     method,
     url: endPoint,
     headers,
     timeout: 10000
   });
   const code = get(response, 'status');
   const data = get(response, 'data');
   
   if(code === httpCodes.ok){
     return data;
   } else {
     return `Something happened, code: ${code}, response ${data}`;
   }
   
  } catch (error) {
    console.error(error);
  }
};

export const httpGet = async (endPoint) => httpRequest(endPoint, httpMethods.get);

export const httpPut = async (endPoint, body) => httpRequest(endPoint, httpMethods.put, body);

export const httpDelete = async (endPoint, body) => httpRequest(endPoint, httpMethods.delete, body);