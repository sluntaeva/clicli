var UPGRADES=[
{id:"cursor",name:"Курсор",icon:"🖱️",desc:"Автоматически кликает",baseCost:15,baseCps:0.1},
{id:"grandma",name:"Бабушка",icon:"👵",desc:"Печёт по старому рецепту",baseCost:100,baseCps:0.5},
{id:"farm",name:"Ферма",icon:"🌾",desc:"Выращивает печенье",baseCost:500,baseCps:3},
{id:"mine",name:"Шахта",icon:"⛏️",desc:"Добывает шоколадную руду",baseCost:2000,baseCps:10},
{id:"factory",name:"Фабрика",icon:"🏭",desc:"Промышленное производство",baseCost:8000,baseCps:40},
{id:"bank",name:"Банк",icon:"🏦",desc:"Печенье — новая валюта",baseCost:30000,baseCps:150},
{id:"temple",name:"Храм",icon:"🛕",desc:"Боги жаждут печенья",baseCost:120000,baseCps:500},
{id:"wizard",name:"Волшебная башня",icon:"🧙",desc:"Магия ускоряет выпечку",baseCost:500000,baseCps:1800},
{id:"portal",name:"Портал",icon:"🌀",desc:"Из параллельных миров",baseCost:2000000,baseCps:6000},
{id:"timemachine",name:"Машина времени",icon:"⏰",desc:"Из будущего с печеньем",baseCost:8000000,baseCps:20000}
];

var CLICK_UPGRADES=[
{id:"reinforce",name:"Железный палец",icon:"💪",desc:"+1 за клик",cost:50,bonus:1},
{id:"double",name:"Двойной клик",icon:"⚡",desc:"+3 за клик",cost:300,bonus:3},
{id:"golden",name:"Золотой коготь",icon:"🦅",desc:"+10 за клик",cost:2500,bonus:10},
{id:"laser",name:"Лазерный указатель",icon:"🔴",desc:"+50 за клик",cost:15000,bonus:50},
{id:"cyber",name:"Кибер-перчатка",icon:"🤖",desc:"+200 за клик",cost:80000,bonus:200},
{id:"godhand",name:"Рука бога",icon:"✋",desc:"+1000 за клик",cost:500000,bonus:1000}
];

var ACHIEVEMENTS=[
{id:"first",name:"Первый клик!",icon:"🌟",req:function(g){return g.totalClicks>=1}},
{id:"clicks100",name:"100 кликов",icon:"💯",req:function(g){return g.totalClicks>=100}},
{id:"clicks1k",name:"1000 кликов",icon:"🖱️",req:function(g){return g.totalClicks>=1000}},
{id:"cookies100",name:"100 печений",icon:"🍪",req:function(g){return g.allTimeCookies>=100}},
{id:"cookies1k",name:"1К печений",icon:"🥐",req:function(g){return g.allTimeCookies>=1000}},
{id:"cookies10k",name:"10К печений",icon:"🎂",req:function(g){return g.allTimeCookies>=10000}},
{id:"cookies1m",name:"1 миллион!",icon:"👑",req:function(g){return g.allTimeCookies>=1000000}},
{id:"cookies1b",name:"1 МИЛЛИАРД!!",icon:"💎",req:function(g){return g.allTimeCookies>=1000000000}},
{id:"shop1",name:"Первая покупка",icon:"🛒",req:function(g){return g.totalPurchases>=1}},
{id:"shop10",name:"10 покупок",icon:"🏪",req:function(g){return g.totalPurchases>=10}},
{id:"cps10",name:"10/сек",icon:"⚙️",req:function(g){return g.cps>=10}},
{id:"cps100",name:"100/сек",icon:"🚀",req:function(g){return g.cps>=100}},
{id:"cps1000",name:"1000/сек",icon:"🌠",req:function(g){return g.cps>=1000}}
];

var NEWS=["Учёные обнаружили, что печенье решает все проблемы!","Курс Cookie к доллару достиг максимума!","Бабушки требуют повышения зарплаты.","Портал в мир печенья открыт!","Машина времени доставила печенье из 3025 года.","Волшебная башня выпустила NFT.","Шахтёры нашли жилу белого шоколада.","Фабрика перешла на сахарное топливо.","Банк Cookie предлагает 420% годовых!"];

var game={cookies:0,allTimeCookies:0,totalClicks:0,totalPurchases:0,clickPower:1,cps:0,upgrades:{},clickUpgrades:[],achievements:[]};
var lastTick=Date.now();
var saveId="clicker_save_v1";

// Mobile tab switching
function showTab(tab){
  var main=document.querySelector("main");
  var shop=document.getElementById("shop-panel");
  var tabCookie=document.getElementById("tab-cookie");
  var tabShop=document.getElementById("tab-shop");
  if(!main||!shop)return;
  if(tab==="cookie"){
    main.classList.remove("hide");
    shop.classList.remove("show");
    if(tabCookie)tabCookie.classList.add("tab-active");
    if(tabShop)tabShop.classList.remove("tab-active");
  }else{
    main.classList.add("hide");
    shop.classList.add("show");
    if(tabCookie)tabCookie.classList.remove("tab-active");
    if(tabShop)tabShop.classList.add("tab-active");
  }
}

function fmt(n){if(n>=1e12)return(n/1e12).toFixed(2)+" T";if(n>=1e9)return(n/1e9).toFixed(2)+" B";if(n>=1e6)return(n/1e6).toFixed(2)+" M";if(n>=1e3)return(n/1e3).toFixed(1)+" K";return Math.floor(n).toString()}
function getCost(u,c){return Math.ceil(u.baseCost*Math.pow(1.15,c))}
function calcCps(){var t=0;for(var i=0;i<UPGRADES.length;i++){t+=UPGRADES[i].baseCps*(game.upgrades[UPGRADES[i].id]||0)}return t}
function calcClickPower(){var b=1;for(var i=0;i<CLICK_UPGRADES.length;i++){if(game.clickUpgrades.indexOf(CLICK_UPGRADES[i].id)!==-1)b+=CLICK_UPGRADES[i].bonus}return b}

function handleClick(e){
  var earned=game.clickPower;
  game.cookies+=earned;
  game.allTimeCookies+=earned;
  game.totalClicks++;
  var btn=document.getElementById("cookie-btn");
  btn.classList.remove("clicked");
  void btn.offsetWidth;
  btn.classList.add("clicked");
  setTimeout(function(){btn.classList.remove("clicked")},250);
  var cx=e.clientX||e.touches&&e.touches[0]&&e.touches[0].clientX||window.innerWidth/2;
  var cy=e.clientY||e.touches&&e.touches[0]&&e.touches[0].clientY||window.innerHeight/2;
  spawnFloatText(cx,cy,"+"+fmt(earned));
  updateUI();
  checkAchievements();
}

function spawnFloatText(x,y,text){var el=document.createElement("div");el.className="float-text";el.textContent=text;el.style.left=(x-20+Math.random()*40-20)+"px";el.style.top=(y-20)+"px";document.body.appendChild(el);setTimeout(function(){el.remove()},1000)}

// Long press for x10 on mobile
var longPressTimer=null;
function setupLongPress(){
  document.addEventListener("touchstart",function(e){
    var card=e.target.closest("[data-upgrade-id]");
    if(!card)return;
    longPressTimer=setTimeout(function(){
      buyUpgrade(card.dataset.upgradeId,10);
      longPressTimer=null;
    },500);
  });
  document.addEventListener("touchend",function(){
    if(longPressTimer){clearTimeout(longPressTimer);longPressTimer=null}
  });
  document.addEventListener("touchmove",function(){
    if(longPressTimer){clearTimeout(longPressTimer);longPressTimer=null}
  });
}

function buyUpgrade(id,amount){
  amount=amount||1;
  var upg=UPGRADES.find(function(u){return u.id===id});
  if(!upg)return;
  var count=game.upgrades[id]||0;
  var totalCost=0;
  for(var i=0;i<amount;i++)totalCost+=getCost(upg,count+i);
  if(game.cookies<totalCost)return;
  game.cookies-=totalCost;
  game.upgrades[id]=count+amount;
  game.totalPurchases+=amount;
  game.cps=calcCps();
  renderShop();updateUI();checkAchievements();autoSave();
}

function buyClickUpgrade(id){
  var cu=CLICK_UPGRADES.find(function(u){return u.id===id});
  if(!cu||game.clickUpgrades.indexOf(id)!==-1)return;
  if(game.cookies<cu.cost)return;
  game.cookies-=cu.cost;
  game.clickUpgrades.push(id);
  game.totalPurchases++;
  game.clickPower=calcClickPower();
  renderShop();updateUI();checkAchievements();autoSave();
}

function checkAchievements(){for(var i=0;i<ACHIEVEMENTS.length;i++){var ach=ACHIEVEMENTS[i];if(game.achievements.indexOf(ach.id)===-1&&ach.req(game)){game.achievements.push(ach.id);showAchievementToast(ach);renderAchievements()}}}

function showAchievementToast(ach){var el=document.createElement("div");el.className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black px-4 py-2 rounded-2xl font-black text-xs md:text-sm shadow-2xl flex items-center gap-2";el.innerHTML='<span class="text-lg">'+ach.icon+"</span> "+ach.name+"!";document.body.appendChild(el);setTimeout(function(){el.style.opacity="0";setTimeout(function(){el.remove()},500)},3000)}

function renderAchievements(){var el=document.getElementById("achievements");if(!el)return;var html="";for(var i=0;i<game.achievements.length;i++){var ach=ACHIEVEMENTS.find(function(a){return a.id===game.achievements[i]});if(ach)html+='<div class="flex items-center gap-2 text-yellow-400"><span>'+ach.icon+"</span><span>"+ach.name+"</span></div>"}el.innerHTML=html||'<span class="text-gray-600">Пока нет...</span>'}

function renderShop(){
  var shop=document.getElementById("shop");
  var html='<div class="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Бонусы клика</div>';
  for(var i=0;i<CLICK_UPGRADES.length;i++){
    var cu=CLICK_UPGRADES[i];
    var owned=game.clickUpgrades.indexOf(cu.id)!==-1;
    var canAfford=game.cookies>=cu.cost;
    var cls=owned?"opacity-30 cursor-not-allowed":canAfford?"can-afford cursor-pointer":"disabled cursor-not-allowed";
    html+='<div class="upgrade-card stat-bar rounded-xl p-2 md:p-3 flex items-center gap-2 md:gap-3 border border-transparent '+cls+'" onclick="'+(!owned?"buyClickUpgrade('"+cu.id+"')"  :"")+'">';
    html+='<div class="text-xl md:text-2xl w-8 md:w-10 text-center">'+cu.icon+"</div>";
    html+='<div class="flex-1 min-w-0"><div class="font-bold text-xs md:text-sm truncate">'+cu.name+"</div>";
    html+='<div class="text-[10px] md:text-xs text-gray-400">'+cu.desc+"</div></div>";
    html+='<div class="text-right flex-shrink-0">';
    if(owned){html+='<span class="text-green-400 text-[10px] md:text-xs font-bold">куплено</span>'}
    else{html+='<div class="font-black text-amber-400 text-xs md:text-sm">🍪 '+fmt(cu.cost)+"</div>"}
    html+="</div></div>";
  }
  html+='<div class="text-xs text-gray-500 uppercase tracking-widest mt-3 mb-2 font-bold">Производство</div>';
  for(var j=0;j<UPGRADES.length;j++){
    var upg=UPGRADES[j];
    var count=game.upgrades[upg.id]||0;
    var cost=getCost(upg,count);
    var ca=game.cookies>=cost;
    var c2=ca?"can-afford cursor-pointer":"disabled cursor-not-allowed";
    html+='<div class="upgrade-card stat-bar rounded-xl p-2 md:p-3 flex items-center gap-2 md:gap-3 border border-transparent '+c2+'" data-upgrade-id="'+upg.id+'" onclick="buyUpgrade(\''+upg.id+'\')" oncontextmenu="event.preventDefault();buyUpgrade(\''+upg.id+'\',10)">';
    html+='<div class="text-xl md:text-2xl w-8 md:w-10 text-center">'+upg.icon+"</div>";
    html+='<div class="flex-1 min-w-0"><div class="font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2">'+upg.name;
    if(count>0)html+=' <span class="bg-amber-500 text-black text-[10px] md:text-xs px-1.5 py-0.5 rounded-full font-black">'+count+"</span>";
    html+="</div>";
    html+='<div class="text-[10px] md:text-xs text-gray-400">'+upg.desc+"</div>";
    if(count>0)html+='<div class="text-[10px] md:text-xs text-green-400">+'+(upg.baseCps*count).toFixed(1)+"/сек</div>";
    html+="</div>";
    html+='<div class="text-right flex-shrink-0"><div class="font-black text-amber-400 text-xs md:text-sm">🍪 '+fmt(cost)+"</div>";
    html+='<div class="text-[10px] md:text-xs text-gray-500">+'+upg.baseCps+"/сек</div></div></div>";
  }
  shop.innerHTML=html;
}

function updateUI(){
  var fmtc=fmt(game.cookies);var fmtcps=game.cps.toFixed(1);var fmtcp=fmt(game.clickPower);
  document.getElementById("cookie-count").textContent=fmtc;
  document.getElementById("header-total").textContent=fmt(game.allTimeCookies);
  document.getElementById("header-cps").textContent=fmtcps;
  var sc=document.getElementById("stat-clicks");if(sc)sc.textContent=fmt(game.totalClicks);
  var sp=document.getElementById("stat-per-click");if(sp)sp.textContent=fmtcp;
  var ss=document.getElementById("stat-cps");if(ss)ss.textContent=fmtcps;
  var st=document.getElementById("stat-total");if(st)st.textContent=fmt(game.allTimeCookies);
  document.getElementById("click-power").textContent=fmtcp;
  document.getElementById("cps-display").textContent=fmtcps;
  var mc=document.getElementById("m-clicks");if(mc)mc.textContent=fmt(game.totalClicks);
  var mp=document.getElementById("m-perclick");if(mp)mp.textContent=fmtcp;
  var mt=document.getElementById("m-total");if(mt)mt.textContent=fmt(game.allTimeCookies);
}

var newsIndex=0;
function updateNewsTicker(){var el=document.getElementById("news-ticker");if(!el)return;el.textContent=NEWS[newsIndex%NEWS.length];newsIndex++}
setInterval(updateNewsTicker,4000);

function gameTick(){var now=Date.now();var dt=(now-lastTick)/1000;lastTick=now;if(game.cps>0){var earned=game.cps*dt;game.cookies+=earned;game.allTimeCookies+=earned;updateUI();checkAchievements()}}
setInterval(gameTick,50);
setInterval(renderShop,1000);

function getState(){return{cookies:game.cookies,allTimeCookies:game.allTimeCookies,totalClicks:game.totalClicks,totalPurchases:game.totalPurchases,clickPower:game.clickPower,cps:game.cps,upgrades:game.upgrades,clickUpgrades:game.clickUpgrades,achievements:game.achievements}}

function autoSave(){fetch("/api/save/"+saveId,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(getState())}).catch(function(){localStorage.setItem(saveId,JSON.stringify(getState()))})}

function loadSave(){return fetch("/api/save/"+saveId).then(function(r){return r.json()}).then(function(j){if(j.exists&&j.data){Object.assign(game,j.data);game.cps=calcCps();game.clickPower=calcClickPower()}}).catch(function(){try{var ls=localStorage.getItem(saveId);if(ls){Object.assign(game,JSON.parse(ls));game.cps=calcCps();game.clickPower=calcClickPower()}}catch(e){}})}

function resetGame(){if(!confirm("Сбросить весь прогресс?"))return;game={cookies:0,allTimeCookies:0,totalClicks:0,totalPurchases:0,clickPower:1,cps:0,upgrades:{},clickUpgrades:[],achievements:[]};localStorage.removeItem(saveId);autoSave();renderShop();renderAchievements();updateUI()}

setInterval(function(){autoSave();localStorage.setItem(saveId,JSON.stringify(getState()))},10000);

loadSave().then(function(){renderShop();renderAchievements();updateUI();updateNewsTicker();setupLongPress()});