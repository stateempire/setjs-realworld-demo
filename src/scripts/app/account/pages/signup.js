import getComp from 'setjs/template/component.js';
import {setRoute} from 'setjs/kernel/setjs.js';
import {api} from 'core/api-helper.js';

export default {
  templates: ['account'],
  comp: function() {
    return getComp('account/signup', null, {
      form: function({$el, error}) {
        api.signup({
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
