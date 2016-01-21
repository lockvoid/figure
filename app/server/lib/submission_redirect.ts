import * as url from 'url';
import * as qs from 'qs';

export class SubmissionRedirect {
  constructor(private formId: string, private formAttrs: any, private submissionId: string, private submissionAttrs: any) {
  }

  url(): string {
    let { redirectTo } = this.formAttrs;

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

  private redirectSearchString(joinParams: any): string {
    let { formId, submissionId, submissionAttrs: { createdAt, fields } } = this;

    return qs.stringify(Object.assign(joinParams, { formId, submissionId, createdAt, fields }));
  }
}
