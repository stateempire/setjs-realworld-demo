import getComp from 'setjs/template/component.js';
import {api} from 'core/api-helper.js';
import {batchCall} from 'setjs/utility/calls.js';
import {makeQs} from 'setjs/utility/browser.js';
import {createPages} from 'helpers/site-helpers.js';

export default {
  templates: ['site/profile'],
  preload: function(opts) {
    var username = opts.route.slug.replace(/^@/, '');
    var query = makeQs(opts.route.id == 'favorited' ? {favorited: username} : {author: username});
    batchCall(opts)
    .add(api.getProfile, {username}, 'profileRes')
    .add(api.getArticles, {query}, 'articlesRes')
    .go();
  },
  comp: function(opts, {profileRes, articlesRes}) {
    var profile = profileRes.profile;
    var pageData = {
      profile,
      articles: articlesRes.articles,
      pages: createPages(articlesRes.articlesCount),
    };
    var pageComp = getComp('site/profile', pageData, {
      toggleFollow: function() {
        api.toggleFollow({
          user: profile,
          error: function() {
            profile.following = !profile.following;
            pageComp.update();
            alert('Unable to change following. Please try again');
          },
        });
        pageComp.update();
      }
    });
    return pageComp;
  }
};
