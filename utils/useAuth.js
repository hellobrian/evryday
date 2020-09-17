import { useEffect, useReducer } from 'react';
import { netlifyAuth } from './netlifyAuth';

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
    netlifyAuth.initialize(async (user) => {
      dispatch({ type: 'init', payload: await user });
      window.location.reload();
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
