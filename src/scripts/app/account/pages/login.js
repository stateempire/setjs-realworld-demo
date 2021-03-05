import getComp from 'setjs/template/component.js';
import {setRoute} from 'setjs/kernel/setjs.js';
import {api} from 'core/api-helper.js';
import {getQs} from 'setjs/utility/browser.js';

export default {
  templates: ['account'],
  comp: function() {
    return getComp('account/login', null, {
      form: function({$el, error}) {
        api.login({
          data: {user: $el.formJSON()},
          error,
          success: function() {
            setRoute(getQs('url'));
          }
        });
      }
    });
  }
};
