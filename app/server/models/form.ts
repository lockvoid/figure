import { Model } from 'objection';
import { randomBytes } from 'crypto';
import { BaseModel } from './base_model';

export class FormRecord extends BaseModel {
  static tableName = 'forms';

  static jsonSchema = {
    type: 'object',

    required: [
      'name'
    ],

    properties: {
      id: {
        type: 'integer',
      },

      key: {
        type: 'string',
      },

      created_at: {
        type: 'string',
      },

      updated_at: {
        type: 'string',
      },

      user_id: {
        type: 'number',
      },

      name: {
        type: 'string',
      },

      redirect_to: {
        type: ['string', 'null'],
      },

      webhook_url: {
        type: ['string', 'null'],
      },

      notify_me: {
        type: 'boolean',
      },
    }
  };

  static get relationMappings() {
    return {
      user: {
        relation: Model.OneToOneRelation, modelClass: require('./user').UserRecord,

        join: {
          from: 'forms.user_id', to: 'users.id',
        },
      },

      submissions: {
        relation: Model.OneToManyRelation, modelClass: require('./submission').SubmissionRecord,

        join: {
          from: 'forms.id', to: 'submissions.form_id'
        },
      },
    }
  }

  static generateKey(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      randomBytes(3, (err, buf) => err ? reject(err) : resolve(buf.toString('hex')));
    });
  }

  async $beforeInsert(context) {
    super.$beforeInsert(context);

    this['key'] = await FormRecord.generateKey();
  }
}
