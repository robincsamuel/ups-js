import axios, { Method, AxiosRequestConfig, AxiosError } from 'axios';
import {
  UPSFetchOtherError,
  UPSFetchClientError,
  UPSFetchServerError
} from '../errors';
import { Config, Response, Request } from '../types';

import Shipment from './Shipment';
import Package from './Package';

const ENDPOINT_TEST = (version: string) =>
  `https://wwwcie.ups.com/ship/${version}`;
const ENDPOINT_PRODUCTION = (version: string) =>
  `https://onlinetools.ups.com/ship/${version}`;

class UPS {
  private isSandbox: boolean;
  private timeout: number;
  private username: string;
  private password: string;
  private licenseNumber: string;
  private version: string;

  constructor(config: Config) {
    this.username = config.username;
    this.password = config.password;
    this.licenseNumber = config.licenseNumber;
    this.isSandbox = config.isSandbox;
    this.version = config.version || 'v1';
    this.timeout = config.timeout || 10000;
  }

  public async fetch<T = any>(
    url: string,
    method: Method = 'POST',
    params: AxiosRequestConfig['params'] = {},
    data: AxiosRequestConfig['data'] = {}
  ) {
    return axios
      .request<any, Response.Server<T>>({
        baseURL: this.isSandbox
          ? ENDPOINT_TEST(this.version)
          : ENDPOINT_PRODUCTION(this.version),
        method,
        url,
        timeout: this.timeout,
        headers: {
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          transId: '',
          transactionSrc: 'ups-js-client',
          Accept: 'application/json',
          AccessLicenseNumber: this.licenseNumber,
          Username: this.username,
          Password: this.password
        },
        params,
        data
      })
      .then((response) => response.data)
      .catch((error: AxiosError<Response.ServerError>) => {
        if (error.response) {
          throw new UPSFetchServerError(
            error.message,
            error.config,
            error.code,
            error.request,
            error.response
          );
        } else if (error.request) {
          throw new UPSFetchClientError(
            error.message,
            error.config,
            error.code,
            error.request
          );
        } else {
          throw new UPSFetchOtherError(error.message, error.config);
        }
      });
  }

  shipment = new Shipment(this);
  package = new Package(this);
}

export default UPS;
