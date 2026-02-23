import { Module } from '@nestjs/common';
import { UtilityController } from './utility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilHdr } from './entities/util-hdr.entity';
import { UtilDtl } from './entities/util-dtl.entity';
import { UtilityService } from './util.service';

@Module({
  imports: [TypeOrmModule.forFeature([UtilHdr, UtilDtl])],
  controllers: [UtilityController],
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
