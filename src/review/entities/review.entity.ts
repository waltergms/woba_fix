import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index('IDX_TIME_GMT', { synchronize: false })
export class Review {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'time_gmt', type: 'datetime', comment: 'Review date' })
  time_gmt: Date;

  @Column({
    type: 'bigint',
    comment: 'Review phone',
  })
  phone: number;

  @Column({
    type: 'varchar',
    comment: 'Review phone',
  })
  organization: string;

  @Column({
    type: 'varchar',
    comment: 'Review olf',
  })
  olf: string;

  @Column({
    type: 'int',
    comment: 'Review rating',
  })
  rating: number;

  @Column({
    type: 'int',
    comment: 'Review quantity',
  })
  numberreview: number;

  @Column({
    type: 'varchar',
    comment: 'Review category',
  })
  category: string;

  @Column({
    type: 'varchar',
    comment: 'Review country',
  })
  country: string;

  @Column({
    type: 'varchar',
    comment: 'Review country code',
  })
  countrycode: string;

  @Column({
    type: 'varchar',
    comment: 'Review state',
  })
  state: string;

  @Column({
    type: 'varchar',
    comment: 'Review city',
  })
  city: string;

  @Column({
    type: 'varchar',
    comment: 'Review street',
  })
  street: string;

  @Column({
    type: 'varchar',
    comment: 'Review building',
  })
  building: string;
}
