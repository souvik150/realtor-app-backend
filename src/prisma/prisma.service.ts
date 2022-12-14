import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/prisma-client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleDestroy(): any {
    this.$connect();
  }

  onModuleInit(): any {
    this.$disconnect();
  }
}
