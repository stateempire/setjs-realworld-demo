import getComp from 'setjs/template/component.js';
import {setRoute} from 'setjs/kernel/setjs.js';
import {api} from 'core/api-helper.js';
import {cascadeRoleFlag} from 'setjs/kernel/roles.js';

export default {
  templates: ['site/editor'],
  role: cascadeRoleFlag('public'),
  preload: function(opts) {
    if (opts.route.slug) {
      opts.slug = opts.route.slug;
      api.getArticle(opts);
    } else {
      opts.success({article: {}});
    }
  },
  comp: function(opts, {article}) {
    article.tagList  = article.tagList || [];
    var pageComp = getComp('site/editor', {article}, {
      addTag: function({e, $el}) {
        if (e.which == 13) {
          var val = $el.val().trim();
          e.preventDefault();
          e.stopPropagation();
          $el.val('');
          if (val && article.tagList.indexOf(val) < 0) {
            article.tagList.push(val);
            pageComp.renderList('tagList');
          }
        }
      },
      removeTag: function({data}) {
        article.tagList.splice(data.key, 1);
        pageComp.renderList('tagList');
      },
      form: function({$el, error}) {
        api.saveArticle({
          data: {article: $el.formJSON({tagList: article.tagList})},
          error,
          success: function(res) {
            setRoute('articles/' + res.article.slug);
          }
        });
      }
    });
    return pageComp;
  }
};
