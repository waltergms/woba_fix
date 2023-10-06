import { Review } from './../../review/entities/review.entity';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as StreamValues from 'stream-json/streamers/StreamValues';
import reviewFactory from '../factories/review.factory';
import { Seeder } from 'typeorm-extension';

export class ReviewSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Iniciando processo de seed da entidade Review.');
        const jsonStream = StreamValues.withParser();

        fs.createReadStream('./src/database/csv-json/yelp_database.json', {
          highWaterMark: 1024 * 1024 * 10,
          encoding: 'utf-8',
        }).pipe(jsonStream.input);
        console.log('Iniciando stream dos dados para processamento de carga.');

        let arrData = [];
        let i = 1;

        jsonStream.on('data', async (data) => {
          for await (const value of data.value) {
            const reviewData = await reviewFactory(value);
            arrData.push(reviewData);
            if (arrData.length === 100 || arrData.length >= data.value.length) {
              await dataSource
                .createQueryBuilder()
                .insert()
                .into(Review)
                .values(arrData)
                .execute();
              console.log(
                `Inseridos ${i * arrData.length} registros de Review.`,
              );
              i++;
              arrData = [];
            }
          }
          resolve();
        });

        jsonStream.on('end', () => {
          console.log(
            'Leitura dos dados finalizada, iniciando carga no banco...',
          );
        });
      } catch (error) {
        reject();
      }
    });
  }
}
