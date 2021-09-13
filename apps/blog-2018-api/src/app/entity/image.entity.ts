import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Image extends BaseEntity {

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    nullable: false
  })
  id: number;

  @Column('text')
  link: string;

  @Column('longtext')
  image: any;

  @Column('text')
  text: string;

  @Column({
    type: 'bigint',
    unsigned: true,
    nullable: true
  })
  date: number;

}
