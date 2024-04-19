import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DataFormatterHelper } from './providers/data-formatter.helper';
import { SmileCenterFilter } from './providers/smile-center-filter.helper';
import { CenterResponse } from './models/center-response';

@Injectable()
export class CenterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly dataFormatterHelper: DataFormatterHelper,
    private readonly smileCenterFilter: SmileCenterFilter,
  ) {}

  async findAll(queryParameters: any): Promise<Array<CenterResponse>> {
    const thirdPartySystemResponse = await this.httpService.axiosRef
      .get(
        `${this.configService.get<string>('PARSE_API_ADDRESS')}/SmileCenters`,
        {
          headers: {
            'X-Parse-Application-Id':
              this.configService.get<string>('APPLICATION_ID'),
            'X-Parse-REST-API-Key':
              this.configService.get<string>('REST_API_KEY'),
          },
        },
      )
      .catch((error) => {
        throw new Error('Was an error while calling third party system');
      });

    let smileCenters = thirdPartySystemResponse.data.results;

    if (queryParameters) {
      smileCenters = this.smileCenterFilter.filterSmileCenters(
        thirdPartySystemResponse.data.results,
        queryParameters,
      );
    }

    const formattedSmileCenters =
      this.dataFormatterHelper.formatCenters(smileCenters);

    return formattedSmileCenters;
  }
}
