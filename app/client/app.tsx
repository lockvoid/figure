import { Dispatch, combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

let thunk = require('redux-thunk');

import { firebase } from './reducers/firebase';
import { forms } from './reducers/forms';
import { setFirebase } from './actions/firebase';
import { bindForms, addForm } from './actions/forms';

import * as Firebase from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function mapStateToProps(state: any): any {
  return state;
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onInit: (ref: Firebase) => {
      dispatch(setFirebase(ref));
    },

    mountForms: () => {
      dispatch(bindForms());
    },

    onCreateForm: (form: { name: string }) => {
      dispatch(addForm(form));
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component<any, any> {
  input: HTMLInputElement;

  componentWillMount() {
    let { onInit, mountForms } = this.props;

    onInit(new Firebase('https://figure-dev.firebaseio.com'));
    mountForms();
  }

  render() {
    let { forms, onCreateForm } = this.props;

    let formsList = forms.map((form: any) =>
      <div key={form.$key}>{form.name}</div>
    );

    return (
      <div>
        <h1>Application</h1>

        {formsList}

        <div className="new">
          <input ref={node => this.input = node } />
          <button onClick={() => onCreateForm({ name: this.input.value }) }>Create</button>
        </div>
      </div>
    );
  }
}

const createCustomStore = applyMiddleware(thunk)(createStore);

const reducers = combineReducers({ firebase, forms });

const boot = (
  <Provider store={createCustomStore(reducers)}>
    <App />
  </Provider>
);

ReactDOM.render(boot, document.getElementById('app'));
