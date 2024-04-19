import {
  Controller,
  Get,
  Query,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { CenterService } from './center.service';
import { HttpResponse } from '../http-response/http-response.schema';
import { CenterResponse } from './models/center-response';
import { TransformPipe } from './pipes/transform.pipe';

@Controller('centers')
export class CenterController {
  private httpResponse: HttpResponse<undefined> = {
    statusCode: HttpStatus.OK,
    success: true,
    records: [],
  };

  constructor(private readonly centerService: CenterService) {}

  @Get()
  async findAll(
    @Query(new TransformPipe()) queryParameters,
  ): Promise<HttpResponse<CenterResponse>> {
    const smileCenters = await this.centerService
      .findAll(queryParameters)
      .catch((error) => {
        throw new InternalServerErrorException({
          ...this.httpResponse,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.message,
        });
      });

    const finalHttpResponse = { ...this.httpResponse, records: smileCenters };
    if (smileCenters.length === 0)
      finalHttpResponse['message'] =
        'No smile centers found matching the search criteria';

    return finalHttpResponse;
  }
}
