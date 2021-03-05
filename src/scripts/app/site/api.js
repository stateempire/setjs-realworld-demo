import {addApis, ajaxCall} from 'core/api-helper.js';

addApis({
  getProfile,
  getTags,
  getArticle,
  saveArticle,
  deleteArticle,
  getArticles,
  toggleFollow,
  toggleFavorite,
  getComments,
  saveComment,
  deleteComment,
});

function getProfile(opts) {
  ajaxCall($.extend({}, opts, {type: 'GET', relativeUrl: 'profiles/' + opts.username}));
}

function getTags(opts) {
  ajaxCall($.extend({type: 'GET'}, opts, {relativeUrl: 'tags'}));
}

function getArticle(opts) {
  ajaxCall($.extend({type: 'GET'}, opts, {relativeUrl: 'articles/' + opts.slug}));
}

function saveArticle(opts) {
  if (opts.data.article.slug) {
    ajaxCall($.extend({isJSON: 1}, opts, {relativeUrl: 'articles/' + opts.data.article.slug, type: 'PUT'}));
  } else {
    ajaxCall($.extend({isJSON: 1}, opts, {relativeUrl: 'articles'}));
  }
}

function deleteArticle(opts) {
  ajaxCall($.extend({}, opts, {relativeUrl: 'articles/' + opts.slug, type: 'DELETE'}));
}

function getArticles(opts) {
  var url = 'articles';
  if (opts.feed) {
    url += '/feed';
  }
  ajaxCall($.extend({}, opts, {type: 'GET', relativeUrl: url + `?${opts.query}`}));
}

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

function getComments(opts) {
  ajaxCall($.extend({type: 'GET'}, opts, {relativeUrl: 'articles/' + opts.slug + '/comments'}));
}

function saveComment(opts) {
  ajaxCall($.extend({isJSON: 1}, opts, {relativeUrl: 'articles/' + opts.slug + '/comments'}));
}

function deleteComment(opts) {
  ajaxCall($.extend({}, opts, {relativeUrl: 'articles/' + opts.slug + '/comments/' + opts.commentId, type: 'DELETE'}));
}
