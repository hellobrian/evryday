import { useEffect, useReducer } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback) {
    window.netlifyIdentity = netlifyIdentity;

    netlifyIdentity.on('init', (user) => {
      callback(user);
    });

    netlifyIdentity.init();
  },
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      this.user = user;
      callback(user);
      netlifyIdentity.close();
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  },
};

function authReducer(_, action) {
  switch (action.type) {
    case 'init':
    case 'login': {
      return {
        loggedIn: !!action.payload,
        user: action.payload,
      };
    }
    case 'logout': {
      return { loggedIn: false, user: null };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function useAuth() {
  const [state, dispatch] = useReducer(authReducer, {
    loggedIn: netlifyAuth.isAuthenticated,
    user: null,
  });

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      dispatch({ type: 'init', payload: user });
    });
  }, [state.user]);

  const login = () => {
    netlifyAuth.authenticate((user) => {
      dispatch({ type: 'login', payload: user });
    });
  };

  const logout = () => {
    netlifyAuth.signout(() => {
      dispatch({ type: 'logout', user: null });
    });
  };

  return {
    login,
    logout,
    user: state.user,
    loggedIn: state.loggedIn,
  };
}
