import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: `${process.env.PG_PASSWORD}`,
  database: process.env.PG_DATABASE,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  autoLoadEntities: true,
  synchronize: true,
};
