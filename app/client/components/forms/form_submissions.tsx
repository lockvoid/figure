import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bindSubmissions, unbindSubmissions } from '../../actions/submissions';
import { SubmissionsAside } from '../submissions/submissions_aside';
import * as React from 'react';

const stateToProps = (state, props) => {
  return { submissions: state.submissions, currentFormId: props.params.formId };
}

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    mountSubmissions: (formId: string) => {
      dispatch(bindSubmissions(formId));
    },

    unmountSubmissions: () => {
      dispatch(unbindSubmissions());
    },
  }
}
@connect(stateToProps, dispatchToProps)
export class FormSubmissions extends React.Component<any, any> {
  componentWillMount() {
    let { mountSubmissions, currentFormId } = this.props;
    mountSubmissions(currentFormId);
  }

  componentWillUnmount() {
    let { unmountSubmissions } = this.props;
    unmountSubmissions();
  }

  render() {
    let { submissions, children, params } = this.props;

    return (
      <div className="form submissions">
        <SubmissionsAside submissions={submissions} formId={params.formId}/>
        { children || <wrap>hello</wrap> }
      </div>
    );
  }
}
