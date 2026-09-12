const choices = {
  gym: { reason: 'ジム中心なら、耳掛けのあるBeatsを候補に。フックも含めて試着を。', id: 'beats', label: 'Beatsを見る ↗' },
  outdoor: { reason: '屋外では周囲の音を優先。3機種とも外音取り込み対応。つけ方で比べましょう。', id: 'compare', label: 'つけ方を比べる ↓' },
  daily: { reason: '毎日の持ち歩きには、ケースもIP57のAirPodsが候補。BeatsもH2搭載です。', id: 'apple', label: 'AirPodsを見る ↗' }
};
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
  const choice = choices[button.dataset.choice];
  document.querySelectorAll('[data-choice]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('pick-reason').textContent = choice.reason;
  const link = document.getElementById('pick-link');
  link.href = '#' + choice.id;
  link.textContent = choice.label;
}));
