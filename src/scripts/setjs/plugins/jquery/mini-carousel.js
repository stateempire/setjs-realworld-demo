import eventManager, {eventTypes} from 'setjs/kernel/event-manager.js';

eventManager.addListener(eventTypes.resize, 'slider', function() {
  $('.carousel').each(function() {
    let slider = $(this).data('slider');
    slider && slider.reset && slider.reset();
  });
});

$.fn.miniCarousel = function() {
  var $el = this;
  var $carousel = $el.find('.carousel');
  var slider = $carousel.data('slider');
  var opts = $el.data('carousel');
  if (!opts.duration) {
    throw {msg: 'data-carousel object required', opts};
  }
  if (!slider) {
    slider = $carousel.slider(opts).data('slider');
    $el.find('.left, .right').on('click', function() {
      slider.move($(this).hasClass('left') ? -1 : 1);
    });
  }
};
