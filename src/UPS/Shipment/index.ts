import Resource from '../Resource';
import { Response, Request } from '../../types';

class Shipment extends Resource {
  /**
   * @param data Shipment info
   * @param addressValidation Validation will include a city
   */
  public async create(
    data: Request.CreateShipment,
    addressValidation = false
  ): Promise<Response.CreateShipment> {
    return this.client.fetch(
      '/shipments',
      'POST',
      addressValidation ? { additionaladdressvalidation: 'city' } : {},
      data
    );
  }
}

export default Shipment;
