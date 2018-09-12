import Reveal from 'reveal.js/js/reveal';
import 'reveal.js/lib/js/head.min';

window.Reveal = Reveal;

export default (ctx, inject) => {
  ctx.$reveal = Reveal;
  inject('reveal', Reveal);
};
