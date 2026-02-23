import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  onModuleDestroy() {
    this.redisClient.quit();
  }

  onModuleInit() {
    const port = process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT)
      : 6379;
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: port,
    });
  }

  async setKey(key: string, value: any, ttlInSeconds = 3600) {
    this.redisClient.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async getKey(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    this.redisClient.del(key);
  }
}
