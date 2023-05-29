import { AxiosResponse } from 'axios';
import camelcase from 'camelcase';

// const objectKeysToSnakeCase = (data: {
//   [key: string]: any;
// }): { [key: string]: any } => {
//   if (Array.isArray(data)) {
//     return data.map(objectKeysToSnakeCase);
//   }

//   if (typeof data !== 'object' || data === null) {
//     return data;
//   }

//   const convertedObject: { [key: string]: any } = {};

//   Object.keys(data).forEach((key) => {
//     const value = data[key];

//     if (value instanceof Object) {
//       convertedObject[snakeCase(key)] = objectKeysToSnakeCase(value);
//     } else {
//       convertedObject[snakeCase(key)] = value;
//     }
//   });

//   return convertedObject;
// };

// export const requestDataToSnakeCase = (request: InternalAxiosRequestConfig) => {
//   if (typeof request.data === 'object') {
//     return {
//       ...request,
//       data: objectKeysToSnakeCase(request.data)
//     };
//   }
// };

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
