import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Statistic extends BaseEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true
  })
  id: number;

  @Column({
    type: 'char',
    length: 128,
    nullable: false
  })
  who: string;

  @Column({
    type: 'bigint',
    unsigned: true,
    nullable: false
  })
  when: number;

  @Column({
    type: 'char',
    length: 255,
    nullable: false
  })
  where: string;

  @Column({
    type: 'char',
    length: 32,
    nullable: false
  })
  what: string;

}

export default Statistic;
