import { HttpStatus } from '@nestjs/common';

export interface HttpResponse<T> {
  success: boolean;
  statusCode: HttpStatus;
  records: Array<T> | T;
  message?: any;
  details?: any;
}
