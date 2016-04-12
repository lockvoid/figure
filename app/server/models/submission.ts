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
        type: 'array',
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

    return Object.assign(parsed, {
      data: this._reduceFormData(parsed['data']),
    });
  }

  protected _reduceFormData(data: Object): Object {
    return Object.keys(data).slice(0, 50).reduce((reduced, key, index) => {
      if (key === 'utf8') {
        return reduced;
      }

      return reduced.concat({ key, value: data[key] });
    }, []);
  }
}
