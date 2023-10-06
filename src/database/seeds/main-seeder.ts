import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ReviewSeeder } from './review-seeder';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Iniciando processamento das seeds.');
    await runSeeder(dataSource, ReviewSeeder);
    console.log('Carga das seeds realizado com sucesso!');
  }
}
