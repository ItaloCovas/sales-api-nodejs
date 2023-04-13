import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import mailConfig from '@config/mail/mail';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    if (mailConfig.driver === 'ses') {
      return `${this.avatar}`;
    } else {
      return `${process.env.API_URL}/files/${this.avatar}`;
    }
  }
}

export default User;
