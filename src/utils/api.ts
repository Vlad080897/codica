import { AxiosResponse } from 'axios';
import camelcase from 'camelcase';

type Obj = { [key: string]: any } | any[];

export const objKeysToCamelCase = (obj: Obj): Obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => objKeysToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc: { [key: string]: any }, key) => {
    acc[camelcase(key)] = objKeysToCamelCase(obj[key]);
    return acc;
  }, {});
};

export const responseDataToCamelCase = (response: AxiosResponse) => {
  return {
    ...response,
    data: objKeysToCamelCase(response.data),
  };
};
