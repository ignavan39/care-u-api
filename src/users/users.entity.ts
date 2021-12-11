import { Base } from 'src/common/entities/base';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as crypto from 'crypto';

@Entity('users')
export class User extends Base {
  @BeforeInsert()
  updateEmail() {
    this.email = this.email.toLowerCase();
  }

  @Column({ type: 'text' })
  email: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }

  @Column({ type: 'text', select: false })
  password: string;
}
