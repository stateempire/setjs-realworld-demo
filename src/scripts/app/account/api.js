import {addApis, ajaxCall} from 'core/api-helper.js';
import {roleFlag, setAccessFlag} from 'setjs/kernel/roles.js';
import eventManager, {eventTypes} from 'setjs/kernel/event-manager.js';
import storage, {storageTypes} from 'setjs/kernel/storage.js';
import {roleFlags} from 'config/user-roles.js';

var loginData;

addApis({
  clearAuth,
  login,
  logout,
  signup,
  getUser,
  isUserLoggedin,
  getUserRole,
  updateUser,
});

export default function(success) {
  if (storage.get(storageTypes.token)) {
    ajaxCall({
      type: 'GET',
      relativeUrl: 'user',
      success: function(res) {
        setUser(res, success);
      },
      error: function() {
        clearAuth();
        success();
      },
    });
  } else {
    success();
  }
}

export function clearAuth() {
  storage.remove(storageTypes.token);
  loginData = null;
  setAccessFlag(roleFlags.unknown);
  raiseLoginEvent();
}

function raiseLoginEvent() {
  eventManager.raiseEvent(eventTypes.user, loginData && loginData.user);
}

function setUser(res, success) {
  var user = res.user;
  loginData = res;
  storage.set(storageTypes.token, user.token);
  user.roles = user.roles || [];
  setAccessFlag(roleFlags.public | roleFlag(user.roles));
  raiseLoginEvent();
  success(res);
}

function login(opts) {
  ajaxCall($.extend({isJSON: 1}, opts, {
    relativeUrl: 'users/login',
    noToken: 1,
    success: function(res) {
      setUser(res, opts.success);
    },
  }));
}

function logout() {
  clearAuth();
}

function signup(opts) {
  ajaxCall($.extend({isJSON: 1}, opts, {
    relativeUrl: 'users',
    success: function(res) {
      setUser(res, opts.success);
    },
  }));
}

function getUser() {
  return loginData && loginData.user;
}

function isUserLoggedin() {
  return !!loginData;
}

function getUserRole() {
  return roleFlag((loginData && loginData.user.roles) || []);
}

function updateUser(opts) {
  ajaxCall($.extend({}, opts, {relativeUrl: 'user', type: 'PUT', success: function(res) {
    setUser(res, opts.success);
  }}));
}
