export const authRequired = (store) => {
  return (nextState, replaceState, performState) => {
    function check() {
      let auth = store.getState().auth;

      if (auth.loggedIn === false) {
        replaceState({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
      }

      if (auth.loggedIn !== null) {
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

