import UPS from '../../../src';

const TIMEOUT = 20000;
test(
  'call calculateShipment and check response',
  async () => {
    const ups = new UPS({
      username: String(process.env.API_USERNAME),
      password: String(process.env.API_PASSWORD),
      licenseNumber: String(process.env.API_LICENSE_NUMBER),
      isSandbox: true,
      timeout: TIMEOUT
    });

    const response = await ups.shipment.create({
      ShipmentRequest: {
        Shipment: {
          Description: '1206 PTR',
          Shipper: {
            Name: 'ShipperName',
            AttentionName: 'AttentionName',
            TaxIdentificationNumber: 'TaxID',
            Phone: {
              Number: '1234567890'
            },
            ShipperNumber: String(process.env.API_ACCOUNT),
            Address: {
              AddressLine: 'AddressLine',
              City: 'City',
              StateProvinceCode: 'SP',
              PostalCode: '12.608-220',
              CountryCode: 'BR'
            }
          },
          ShipTo: {
            Name: 'ShipToName',
            AttentionName: 'AttentionName',
            Phone: {
              Number: '1234567890'
            },
            FaxNumber: '1234567999',
            TaxIdentificationNumber: '456999',
            Address: {
              AddressLine: 'AddressLine',
              City: 'City',
              StateProvinceCode: 'SP',
              PostalCode: '12.608-220',
              CountryCode: 'BR'
            }
          },
          ShipFrom: {
            Name: 'ShipperName',
            AttentionName: 'AttentionName',
            Phone: {
              Number: '1234567890'
            },
            FaxNumber: '1234567999',
            TaxIdentificationNumber: '456999',
            Address: {
              AddressLine: 'AddressLine',
              City: 'City',
              StateProvinceCode: 'SP',
              PostalCode: '12.608-220',
              CountryCode: 'BR'
            }
          },
          PaymentInformation: {
            ShipmentCharge: {
              Type: '01' as const,
              BillShipper: {
                AccountNumber: String(process.env.API_ACCOUNT)
              }
            }
          },
          Service: {
            Code: '65' as const,
            Description: 'Expedited'
          },

          Package: [
            {
              Description: 'International Goods',
              Packaging: {
                Code: '02' as const
              },
              PackageWeight: {
                UnitOfMeasurement: {
                  Code: 'KGS' as const
                },
                Weight: '10'
              },
              PackageServiceOptions: ''
            },

            {
              Description: 'International Goods',
              Packaging: {
                Code: '02' as const
              },
              PackageWeight: {
                UnitOfMeasurement: {
                  Code: 'KGS' as const
                },
                Weight: '20'
              },
              PackageServiceOptions: ''
            }
          ],
          ItemizedChargesRequestedIndicator: '',
          RatingMethodRequestedIndicator: '',
          TaxInformationIndicator: '',
          ShipmentRatingOptions: {
            NegotiatedRatesIndicator: ''
          }
        },
        LabelSpecification: {
          LabelImageFormat: {
            Code: 'GIF' as const
          }
        }
      }
    });
    expect(response).toBeTruthy();
  },
  TIMEOUT
);
