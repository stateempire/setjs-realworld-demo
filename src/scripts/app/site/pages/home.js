import getComp from 'setjs/template/component.js';
import {api} from 'core/api-helper.js';
import {createPages} from 'helpers/site-helpers.js';
import {articleLimit} from 'config/app-config.js';
import {getQs, makeQs} from 'setjs/utility/browser.js';

export default {
  templates: ['site/home'],
  preload: function(opts) {
    opts.feed = opts.route.pageId == 'my-feed';
    opts.query = makeQs({
      tag: getQs('tag'),
      offset: articleLimit * ((getQs('page') || 1) - 1),
      limit: articleLimit,
    });
    api.getArticles(opts);
  },
  comp: function({route}, pageData) {
    pageData.pages = createPages(pageData.articlesCount);
    pageData.tag = getQs('tag');
    pageData.tab = pageData.tag ? 'tag' : route.pageId || 'home';
    return getComp('site/home', pageData);
  }
};
