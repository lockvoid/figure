export const authRequired = (store) => {
  return (nextState, replaceState, performState) => {
    function check() {
      let authReducer = store.getState().authReducer;

      if (authReducer.loggedIn === false) {
        replaceState({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
      }

      if (authReducer.loggedIn !== null) {
        performState();
        return true;
      }

      return false;
    }

    if (check() === false) {
      let unsubscribe = store.subscribe(() => {
        if (check() === true) {
          unsubscribe();
        }
      });
    }
  }
}

