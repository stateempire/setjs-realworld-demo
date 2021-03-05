import './seo.js';

import accountInit from './account/init.js';
import siteInit from './site/init.js';

export default function({success}) {
  siteInit();
  accountInit(success);
}
