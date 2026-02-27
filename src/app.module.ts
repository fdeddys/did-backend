import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RedisModule } from './redis/redis.module';
import { RoleModule } from './roles/roles.module';
import { CategoryModule } from './category/category.module';
import { StockModule } from './stock/stock.module';
import { UomModule } from './uom/uom.module';
import { OrdersModule } from './order/order.module';
import { SalesModule } from './sales/sales.module';
import { BannerModule } from './banner/banner.module';
import { MerchantModule } from './merchant/merchant.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    RedisModule,
    RoleModule,
    CategoryModule,
    StockModule,
    UomModule,
    OrdersModule,
    SalesModule,
    BannerModule,
    MerchantModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
