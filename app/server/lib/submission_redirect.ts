import * as url from 'url';
import * as qs from 'qs';

export class SubmissionRedirect {
  constructor(private form: FirebaseDataSnapshot, private submission: FirebaseDataSnapshot) {
  }

  url(): string {
    let { redirectTo } = this.form.val();

    if (redirectTo) {
      let parsed = url.parse(redirectTo, true);

      if (Object.keys(parsed.query).indexOf('submission') !== -1) {
        delete parsed.query.submission;
        parsed.search = this.redirectSearchString(parsed.query);

        return url.format(parsed);
      } else {
        return redirectTo;
      }
    } else {
      return this.defaultUrl();
    }
  }

  private defaultUrl() {
    return '/thankyou';
  }

  private redirectSearchString(userParams: any): string {
    let { createdAt, fields } = this.submission.val();

    let params = {
      form_id: this.form.key(), submission_id: this.submission.key(), created_at: createdAt, fields
    }

    return qs.stringify(Object.assign(userParams, params));
  }
}
