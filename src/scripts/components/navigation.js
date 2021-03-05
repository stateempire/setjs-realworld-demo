import getComp from 'setjs/template/component.js';
import {getRoute} from 'setjs/kernel/setjs.js';
import eventManager, {eventTypes} from 'setjs/kernel/event-manager.js';

export default function() {
  var comp = getComp('common/navigation');
  var $pageLinks = comp.$root.find('a');
  $('#nav-placeholder').replaceWith(comp.$root);
  updateNav();
  eventManager.addListener(eventTypes.user, 'nav', comp.update, null);
  eventManager.addListener(eventTypes.route, 'nav', updateNav);

  function updateNav() {
    var path = getRoute().path || '/';
    $pageLinks.removeClass('active');
    $pageLinks.filter('[data-href="' + path + '"]').addClass('active');
  }
}
