import { Reducer, combineReducers } from 'redux';
import { List, Map } from 'immutable';

import { firebaseArray } from './firebase';
import { SubmissionRecord } from '../../../lib/models/submission';
import { RESET_SUBMISSIONS, SUBMISSIONS_READY, SUBMISSION_ADDED, SUBMISSION_CHANGED, SUBMISSION_MOVED, SUBMISSION_REMOVED } from '../actions/submissions';

export const submissions = firebaseArray([RESET_SUBMISSIONS, SUBMISSIONS_READY, SUBMISSION_ADDED, SUBMISSION_CHANGED, SUBMISSION_MOVED, SUBMISSION_REMOVED], serializeSubmission);

function serializeSubmission(snapshot: FirebaseDataSnapshot): SubmissionRecord {
  return new SubmissionRecord(snapshot);
}

export const findSubmission = (state, submissionId: string) => {
  return state.value.find(submission => submission.$key === submissionId);
}

export const redirectToFirstSubmission = (store) => {
  return (nextState, replaceState, performState) => {
    let { firebase } = store.getState();
    let { formId, submissionId } = nextState.params;

    const redirectToFirst = () => {
      let ref = firebase.child('submissions').child(nextState.params.formId).limitToLast(1).once('value', snapshot => {
        if (snapshot.hasChildren()) {
          let firstSubmissionId = Object.keys(snapshot.val())[0];

          replaceState({
            pathname: `/forms/${formId}/submissions/${firstSubmissionId}`,
            state: { nextPathname: nextState.location.pathname }
          })

        } else {
          if (submissionId) {
            replaceState({
              pathname: `/forms/${formId}/submissions`,
              state: { nextPathname: nextState.location.pathname }
            })
          }
        }

        performState();
      });
    }

    const redirectUnlessExists = () => {
      let ref = firebase.child('submissions').child(nextState.params.formId).child(submissionId).once('value', snapshot => {
        if (!snapshot.exists()) {
          redirectToFirst();
        } else {
          performState();
        }
      });
    }

    if (submissionId) {
      redirectUnlessExists();
    } else {
      redirectToFirst();
    }
  }
}

