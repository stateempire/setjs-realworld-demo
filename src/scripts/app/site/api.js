import {addApis, ajaxCall, getById, dataFunc, saveById, deleteById, jsonFunc} from 'core/api-helper.js';

addApis({
  getProfile: getById('profiles', 'username'),
  getTags: dataFunc('tags'),
  getArticle: getById('articles', 'slug'),
  saveArticle: saveById(({data}) => 'articles' + (data.article.slug ? '/' + data.article.slug : ''), 'data.article.slug'),
  deleteArticle: deleteById('articles', 'slug'),
  getArticles: dataFunc(opts =>  'articles' + (opts.feed ? '/feed' : '') + `?${opts.query}`),
  getComments: dataFunc(opts =>  'articles/' + opts.slug + '/comments'),
  saveComment: jsonFunc(opts =>  'articles/' + opts.slug + '/comments'),
  deleteComment: jsonFunc(opts =>  'articles/' + opts.slug + '/comments/' + opts.commentId, 'DELETE'),
  toggleFollow,
  toggleFavorite,
});

function toggleFollow(opts) {
  var user = opts.user;
  var type = user.following ? 'DELETE' : '';
  user.following = !user.following;
  ajaxCall($.extend({}, opts, {type, relativeUrl: `profiles/${user.username}/follow`}));
}

function toggleFavorite(opts) {
  var article = opts.article;
  var type = article.favorited ? 'DELETE' : '';
  article.favorited = !article.favorited;
  ajaxCall($.extend({}, opts, {type, relativeUrl: `articles/${article.slug}/favorite`}));
}
