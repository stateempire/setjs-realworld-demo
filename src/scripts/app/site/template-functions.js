import {setRoute} from 'setjs/kernel/setjs.js';
import {addAction, addFuncs} from 'core/acts-funcs.js';
import marked from 'marked';
import {api} from 'core/api-helper.js';

addFuncs({
  marked: function(content, {$el}) {
    $el.html(marked(content));
  },
  canFollow: function(author) {
    var user = api.getUser();
    return user && user.username != author.username;
  },
});

addAction('deleteArticle', function(opts){
  if (window.confirm('Do you really want to delete this article?')) {
    api.deleteArticle({
      slug: opts.data.article.slug,
      error: function() {
        alert('Unable to delete article. Please try again');
      },
      success: function() {
        setRoute('profile/@' + opts.data.article.author.username);
      }
    });
  }
});

addAction('toggleFavorite', function(opts) {
  var data = opts.data;
  var article = data.article;
  api.toggleFavorite({
    article,
    error: function() {
      alert('Unable to toggle favorited. Please try again');
      article.favorited = !article.favorited;
      opts.comp.update();
    },
    success: function(res) {
      $.extend(article, res.article);
      opts.comp.update();
    },
  });
  opts.comp.update();
});
