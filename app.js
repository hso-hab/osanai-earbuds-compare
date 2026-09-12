const choices = {
  gym: { reason: 'ジム中心なら耳掛け型も候補。Powerbeats Pro 2やSport X20を、予算と装着感で比較。', id: 'beats', label: 'Beatsを見る ↗' },
  outdoor: { reason: '屋外では周囲の音を優先。9機種とも外音取り込み対応。つけ方で比べましょう。', id: 'compare', label: 'つけ方を比べる ↓' },
  daily: { reason: '毎日の持ち歩きには、ケースもIP57のAirPodsが候補。軽さ重視ならLinkBuds Fitも候補です。', id: 'apple', label: 'AirPodsを見る ↗' }
};
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
  const choice = choices[button.dataset.choice];
  document.querySelectorAll('[data-choice]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('pick-reason').textContent = choice.reason;
  const link = document.getElementById('pick-link');
  link.href = '#' + choice.id;
  link.textContent = choice.label;
}));

// Keep a readable column width and filter the same nine products in place.
const compareFilters = {"all": ["beats", "apple", "sony", "sport-x20", "race2", "linkbuds-fit", "powerbeats-fit", "peak4", "liberty4pro"], "budget": ["sport-x20", "race2", "peak4", "liberty4pro"], "hook": ["beats", "sport-x20", "peak4"]};
const compareScroll = document.getElementById('compare-scroll');
const compareTable = compareScroll.querySelector('table');
const prevButton = document.getElementById('compare-prev');
const nextButton = document.getElementById('compare-next');
const specToggle = document.getElementById('spec-toggle');
let activeFilter = 'all';
document.querySelector('.compare-tools').hidden = false;
prevButton.hidden = nextButton.hidden = specToggle.hidden = false;
function updateNavigation() {
  prevButton.disabled = compareScroll.scrollLeft < 2;
  nextButton.disabled = compareScroll.scrollLeft + compareScroll.clientWidth >= compareScroll.scrollWidth - 2;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  const ids = compareFilters[activeFilter];
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  compareTable.querySelectorAll('[data-product]').forEach(cell => { cell.hidden = !ids.includes(cell.dataset.product); });
  compareTable.style.setProperty('--product-count', ids.length);
  document.getElementById('compare-status').textContent = ids.length + '機種を比較';
  compareScroll.scrollLeft = 0;
  requestAnimationFrame(updateNavigation);
}));
function moveComparison(direction) {
  const cell = compareTable.querySelector('thead [data-product]:not([hidden])');
  const amount = cell.getBoundingClientRect().width;
  compareScroll.scrollBy({left: direction * amount, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
prevButton.addEventListener('click', () => moveComparison(-1));
nextButton.addEventListener('click', () => moveComparison(1));
compareScroll.addEventListener('scroll', updateNavigation, {passive:true});
window.addEventListener('resize', updateNavigation);
function setExtraSpecs(open) {
  compareTable.querySelectorAll('.extra-spec').forEach(row => { row.hidden = !open; });
  specToggle.setAttribute('aria-expanded', String(open));
  specToggle.textContent = open ? '細かな仕様を閉じる −' : 'ケースの耐水・iPhone連携を見る ＋';
}
specToggle.addEventListener('click', () => setExtraSpecs(specToggle.getAttribute('aria-expanded') !== 'true'));
setExtraSpecs(false);
updateNavigation();
