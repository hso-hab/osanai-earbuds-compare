const choices={
  fit:{name:'Powerbeats Pro 2',id:'beats',reason:'耳に掛けるフックで支える方式。運動中の固定方法を重視するなら、まず試着したい候補です。'},
  iphone:{name:'AirPods Pro 3',id:'apple',reason:'iPhoneとの連携に加えて、ケースもIP57の耐汗・耐水仕様。BeatsもH2搭載なので、フックの有無や耳への収まりで比べましょう。'},
  price:{name:'Sony WF-1000XM6',id:'sony',reason:'確認時点の公式表示価格は39,600円。この3機種では低価格ですが、AirPods Pro 3との差は200円です。市場全体の最安値ではありません。'}
};
document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
  const choice=choices[button.dataset.choice];
  document.querySelectorAll('[data-choice]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.getElementById('pick-name').textContent=choice.name;
  document.getElementById('pick-reason').textContent=choice.reason;
  document.getElementById('pick-link').href='#'+choice.id;
}));
