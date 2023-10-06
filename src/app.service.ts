import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

@Injectable()
export class AppService {
  async onModuleInit() {
    console.log('Hello World!');
    const options: DataSourceOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'woba',
      password: 'wobapwd',
      database: 'woba',
    };

    // Create the database with specification of the DataSource options
    await createDatabase({
      options,
    });

    const dataSource = new DataSource(options);
    await dataSource.initialize();
    // do something with the DataSource
  }

  getHello(): string {
    return 'Hello World!';
  }
}
