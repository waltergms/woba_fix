import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './database/seeds/main-seeder';
import { join } from 'path';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'woba',
  password: 'wobapwd',
  database: 'woba',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './database/migration/*.{ts,js}')],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
