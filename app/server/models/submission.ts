import { Model } from 'objection';
import { randomBytes } from 'crypto';
import { BaseModel } from './base_model';

export class SubmissionRecord extends BaseModel {
  static tableName = 'submissions';

  static jsonSchema = {
    type: 'object',

    required: [
      'data'
    ],

    properties: {
      id: {
        type: 'integer',
      },

      data: {
        type: 'object',
      },

      created_at: {
        type: 'string',
      },

      updated_at: {
        type: 'string',
      },

      form_id: {
        type: 'number',
      },
    }
  };

  static get relationMappings() {
    return {
      form: {
        relation: Model.OneToOneRelation, modelClass: require('./form').FormRecord,

        join: {
          from: 'submissions.form_id', to: 'forms.id',
        },
      },
    }
  }

  $parseJson(json, options) {
    const parsed = super.$parseJson(json, options);

    delete parsed['data']['utf8'];

    return parsed;
  }
}
