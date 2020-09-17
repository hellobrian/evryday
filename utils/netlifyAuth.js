import netlifyIdentity from 'netlify-identity-widget';

export const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback) {
    this.isAuthenticated = true;
    window.netlifyIdentity = netlifyIdentity;
    netlifyIdentity.on('init', (user) => {
      console.log('init');
      this.user = user;
      callback(user);
    });
    netlifyIdentity.init();
  },
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      console.log('login');
      this.user = user;
      callback(user);
      netlifyIdentity.close();
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      console.log('logout');
      this.user = null;
      callback();
    });
  },
};
