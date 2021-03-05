import getComp from 'setjs/template/component.js';
import {setRoute} from 'setjs/kernel/setjs.js';
import {api} from 'core/api-helper.js';
import {cascadeRoleFlag} from 'setjs/kernel/roles.js';

export default {
  templates: ['account'],
  role: cascadeRoleFlag('public'),
  comp: function() {
    return getComp('account/settings', {user: api.getUser()}, {
      form: function({$el, error}) {
        api.updateUser({
          data: {user: $el.formJSON()},
          error,
          success: function() {
            setRoute();
          }
        });
      }
    });
  }
};
