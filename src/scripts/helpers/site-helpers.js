import {articleLimit} from 'config/app-config.js';
import {getQs, makeQs} from 'setjs/utility/browser.js';

export function createPages(articlesCount) {
  var pages = [];
  var currentPage = getQs('page') || 1;
  var lastPage = Math.ceil(articlesCount / articleLimit);
  for (var i = 1; i <= lastPage; i++) {
    pages.push({index: i, link: makeQs({page: i}, 1), cls: currentPage == i ? 'active' : ''});
  }
  return pages;
}

