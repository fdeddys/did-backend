import { Module } from '@nestjs/common';
import { UomService } from './uom.service';

@Module({
  providers: [UomService],
})
export class UomModule {}
