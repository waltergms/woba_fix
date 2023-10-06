import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableReview1696351655384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'time_gmt',
            type: 'datetime',
          },
          {
            name: 'phone',
            type: 'bigint',
          },
          {
            name: 'organization',
            type: 'varchar',
          },
          {
            name: 'olf',
            type: 'varchar',
          },
          {
            name: 'rating',
            type: 'int',
          },
          {
            name: 'numberreview',
            type: 'int',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'countrycode',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'building',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_TIME_GMT',
        columnNames: ['time_gmt'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_RATING',
        columnNames: ['rating'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_ORGANIZATION',
        columnNames: ['organization'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_CATEGORY',
        columnNames: ['category'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_STATE',
        columnNames: ['state'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_CITY',
        columnNames: ['city'],
      }),
    );
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_STREET',
        columnNames: ['street'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review');
  }
}
