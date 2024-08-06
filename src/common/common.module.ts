import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [Reflector, ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule {}
