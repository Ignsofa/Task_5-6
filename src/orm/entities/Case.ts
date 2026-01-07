import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Apply } from './Apply';
import { User } from './users/User';

@Entity('cases')
export class Case extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @OneToOne(() => Apply)
  @JoinColumn({ name: 'applyId' })
  apply: Apply;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
