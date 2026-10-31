'use strict';
const cards = [...document.querySelectorAll('.pf-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  const count = cards.filter(card => !card.hidden).length;
  document.getElementById('work-count').textContent = `Showing ${count} ${category === 'all' ? '' : category + ' '}projects`;
}));
const pins = [...document.querySelectorAll('.atlas-pin')];
function describePin(pin) {
  document.getElementById('atlas-label').textContent = pin.dataset.label;
  document.getElementById('atlas-title').textContent = pin.dataset.title;
  document.getElementById('atlas-description').textContent = pin.dataset.description;
  document.querySelector('.atlas-heading span:last-child').textContent = `${pin.textContent.trim()} / 03`;
  pins.forEach(other => other.classList.toggle('is-active', other === pin));
}
pins.forEach(pin => {
  pin.addEventListener('pointerenter', () => describePin(pin));
  pin.addEventListener('focus', () => describePin(pin));
  pin.addEventListener('click', () => {
    describePin(pin);
    const dialog = document.getElementById(pin.dataset.dialog);
    if (dialog && !dialog.open) dialog.showModal();
  });
});
if (pins[0]) pins[0].classList.add('is-active');
document.querySelectorAll('dialog.pf-dialog').forEach(dialog => {
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
});
