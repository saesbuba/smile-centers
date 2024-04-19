import { Module } from '@nestjs/common';
import { CenterModule } from './modules/center/center.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CenterModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
