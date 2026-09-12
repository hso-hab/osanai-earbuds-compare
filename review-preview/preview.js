// Native details/summary handles all input; illustrate only when a card is opened.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.voice-card').forEach(card => {
    card.addEventListener('toggle', () => {
      if (card.open) card.classList.add('is-visible');
      else card.classList.remove('is-visible');
    });
  });
}
