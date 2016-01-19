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
