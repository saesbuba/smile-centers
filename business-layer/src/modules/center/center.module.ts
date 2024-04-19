import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CenterController } from './center.controller';
import { CenterService } from './center.service';
import { DataFormatterHelper } from './providers/data-formatter.helper';
import { SmileCenterFilter } from './providers/smile-center-filter.helper';

@Module({
  imports: [HttpModule],
  controllers: [CenterController],
  providers: [CenterService, DataFormatterHelper, SmileCenterFilter],
})
export class CenterModule {}
