import {getRoute, setRoute} from 'setjs/kernel/setjs.js';
import pageLoader from 'setjs/kernel/page-loader.js';
import {addPage} from 'setjs/kernel/page-manager.js';

import './template-functions.js';
import initApi, {clearAuth} from './api.js';
import login from './pages/login.js';
import signup from './pages/signup.js';
import settings from './pages/settings.js';

var loginUrl = 'login';

function loginPage() {
  var path = getRoute().path;
  if (loginUrl != path) {
    setRoute(loginUrl + '?url=' + path);
  }
}

export default function(success) {
  pageLoader.setLoginManager({
    login: loginPage,
    handleAuthError: function() {
      clearAuth();
      setRoute(loginUrl);
    },
  });
  addPage('login', login);
  addPage('signup', signup);
  addPage('settings', settings);
  initApi(success);
}
