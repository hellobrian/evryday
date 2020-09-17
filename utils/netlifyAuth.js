import netlifyIdentity from 'netlify-identity-widget';

export const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  initialize(callback) {
    window.netlifyIdentity = netlifyIdentity;
    const _this = this;

    netlifyIdentity.on('init', (user) => {
      console.log('init');
      _this.isAuthenticated = true;
      _this.user = user;
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
