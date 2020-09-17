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

    /**
     * Delete this if OAuth gets fixed to update user state after login. This kinda makes normal email login jank.
     */
    netlifyIdentity.on('close', () => {
      window.location.reload();
    });
    netlifyIdentity.on('login', () => netlifyIdentity.close());
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
