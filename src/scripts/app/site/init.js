import {addPage} from 'setjs/kernel/page-manager.js';

import './api.js';
import './template-functions.js';

import home from './pages/home.js';
import profile from './pages/profile.js';
import editor from './pages/editor.js';
import view from './pages/view.js';

export default function() {
  addPage('(my-feed)?', home);
  addPage('profile/[^/]+(/favorited)?', profile);
  addPage('editor(/[^/]+)?', editor);
  addPage('articles/[^/]+', view);
}
