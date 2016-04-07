import { Model } from 'objection';
import { BaseModel } from './base_model';
import { EMAIL_REGEX } from '../../../lib/regex';

import * as bcrypt from 'bcrypt';

export class UserRecord extends BaseModel {
  static tableName = 'users';

  static jsonSchema = {
    type: 'object',

    required: [
      'email', 'password', 'name'
    ],

    properties: {
      id: {
        type: 'integer',
      },

      created_at: {
        type: 'string',
      },

      updated_at: {
        type: 'string',
      },

      email: {
        type: 'string', pattern: EMAIL_REGEX,
      },

      password: {
        type: 'string', minLength: 7,
      },

      name: {
        type: 'string',
      },
    }
  }

  static async auth(email: string = '', password: string = ''): Promise<any> {
    let user = await UserRecord.query().where('email', email).first();

    return new Promise((resolve, reject) => {
      if (!user) {
        return resolve(null);
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          reject(err);
        }

        res ? resolve(user) : resolve(null);
      });
    });
  }

  async $beforeInsert(context) {
    super.$beforeInsert(context);

    this['password'] = await this._encryptPassword(this['password']);
  }

  async $beforeUpdate(options, context) {
    super.$beforeUpdate(options, context);

    if ('password' in this) {
      this['password'] = await this._encryptPassword(this['password']);
    }
  }

  protected _encryptPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw err;
        }

        resolve(hash);
      });
    });
  }
}
