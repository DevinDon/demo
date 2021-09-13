import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Song extends BaseEntity {

  @PrimaryColumn({
    type: 'bigint',
    unsigned: true,
    nullable: false
  })
  id: number;

  @Column({
    type: 'char',
    length: 64,
    nullable: false
  })
  title: string;

  @Column({
    type: 'char',
    length: 64,
    nullable: false
  })
  artist: string;

  @Column({
    type: 'char',
    length: 64,
    nullable: false
  })
  album: string;

  @Column({
    type: 'bigint',
    unsigned: true,
    nullable: true
  })
  time: number;

}

export default Song;
