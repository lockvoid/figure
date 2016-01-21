import { Link } from 'react-router';
import { List } from 'immutable';
import * as React from 'react';
import { AppSpinner } from '../../../../lib/components/app_spinner';
import { absoluteTime } from '../../utils/absolute_time';

interface ExcerptsProps {
  submissions: { value: List<any>, ready: boolean }
  formId: string;
}

class Excerpts extends React.Component<ExcerptsProps, {}> {
  render() {
    let { submissions, formId } = this.props;

    if (!submissions.ready) {
      return <AppSpinner />
    }

    if (submissions.value.size === 0) {
      return <div className="prestine">Waiting for a submission</div>
    }

    return (
      <ul className="excerpts">
        {
          submissions.value.map(submission =>
            <li key={submission.$key}>
              <Link to={`/forms/${formId}/submissions/${submission.$key}`} activeClassName="active" className={submission.read ? '' : 'unread'}>
                <datetime>{absoluteTime(submission.createdAt, 'shortDate')}</datetime>

                <ol className="fields">
                  { submission.fields.slice(0, 2).map(field => <li key={field.$key}>{field.$value}</li>) }
                </ol>
              </Link>
            </li>
          )
        }
      </ul>
    )
  }
}

interface SubmissionsAsideProps {
  submissions: { value: List<any>, ready: boolean }
}

export class SubmissionsAside extends React.Component<any, {}> {
  render() {
    let { submissions, formId } = this.props;

    return (
      <aside className="submissions">
        <header className="search">
          <input type="search" placeholder="Search" />
        </header>

        <Excerpts submissions={submissions} formId={formId} />
      </aside>
    );
  }
}
