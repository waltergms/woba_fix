import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as fs from 'fs';
import * as StreamArray from 'stream-json/streamers/StreamArray';
import { Review } from 'src/review/entities/review.entity';

export class ReviewCreateSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<any> {
    const jsonStream = StreamArray.withParser();
    //internal Node readable stream option, pipe to stream-json to convert it for us
    fs.createReadStream('../csv/yelp_database.json').pipe(jsonStream.input);

    //You'll get json objects here
    //Key is the array-index here
    jsonStream.on('data', async ({ key, value }) => {
      console.log(key, value);
      //   await connection
      //     .createQueryBuilder()
      //     .insert()
      //     .into('review')
      //     .values([value])
      //     .execute();
      await factory(Review)().create(value);
    });

    jsonStream.on('end', ({ key, value }) => {
      console.log('All Done');
      return Promise.resolve();
    });

    console.log('Passou por aqui pa pa pa');
  }
}
