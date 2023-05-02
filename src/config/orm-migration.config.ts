import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// todo: change
dotenv.config(); // for migrations

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
