import { Link } from 'react-router';
import { List } from 'immutable';
import * as React from 'react';
import { AppSpinner } from '../shared/app_spinner';
import { timeAgo } from '../../utils/time_ago';

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

    return (
      <ul className="excerpts">
        {
          submissions.value.reverse().map(submission =>
            <li key={submission.$key}>
              <Link to={`/forms/${formId}/submissions/${submission.$key}`} activeClassName="active">
                <datetime>{timeAgo(submission.createdAt)}</datetime>

                <ol className="fields">
                  { submission.fields.slice(0, 2).map(field => <li key={field.$key}>{field.$value}}</li>) }
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