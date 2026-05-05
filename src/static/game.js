// ========================
// ИГРОВЫЕ ДАННЫЕ (зеркало серверных)
// ========================

const UPGRADES = [
  { id: 'cursor',      name: 'Курсор',           icon: '🖱️', desc: 'Автоматически кликает',     baseCost: 15,      baseCps: 0.1 },
  { id: 'grandma',     name: 'Бабушка',          icon: '👵',  desc: 'Печёт по старому рецепту',  baseCost: 100,     baseCps: 0.5 },
  { id: 'farm',        name: 'Ферма',            icon: '🌾',  desc: 'Выращивает печенье',        baseCost: 500,     baseCps: 3 },
  { id: 'mine',        name: 'Шахта',            icon: '⛏️',  desc: 'Добывает шоколадную руду',  baseCost: 2000,    baseCps: 10 },
  { id: 'factory',     name: 'Фабрика',          icon: '🏭',  desc: 'Промышленное производство', baseCost: 8000,    baseCps: 40 },
  { id: 'bank',        name: 'Банк',             icon: '🏦',  desc: 'Печенье — новая валюта',    baseCost: 30000,   baseCps: 150 },
  { id: 'temple',      name: 'Храм',             icon: '🛕',  desc: 'Боги жаждут печенья',       baseCost: 120000,  baseCps: 500 },
  { id: 'wizard',      name: 'Волшебная башня',  icon: '🧙',  desc: 'Магия ускоряет выпечку',    baseCost: 500000,  baseCps: 1800 },
  { id: 'portal',      name: 'Портал',           icon: '🌀',  desc: 'Из параллельных миров',     baseCost: 2000000, baseCps: 6000 },
  { id: 'timemachine', name: 'Машина времени',   icon: '⏰',  desc: 'Из будущего с печеньем',    baseCost: 8000000, baseCps: 20000 },
];

const CLICK_UPGRADES = [
  { id: 'reinforce', name: 'Железный палец',    icon: '💪', desc: '+1 за клик',    cost: 50,      bonus: 1 },
  { id: 'double',    name: 'Двойной клик',      icon: '⚡', desc: '+3 за клик',    cost: 300,     bonus: 3 },
  { id: 'golden',    name: 'Золотой коготь',    icon: '🦅', desc: '+10 за клик',   cost: 2500,    bonus: 10 },
  { id: 'laser',     name: 'Лазерный указатель',icon: '🔴', desc: '+50 за клик',   cost: 15000,   bonus: 50 },
  { id: 'cyber',     name: 'Кибер-перчатка',    icon: '🤖', desc: '+200 за клик',  cost: 80000,   bonus: 200 },
  { id: 'godhand',   name: 'Рука бога',         icon: '✋', desc: '+1000 за клик', cost: 500000,  bonus: 1000 },
];

const ACHIEVEMENTS = [
  { id: 'first',      name: 'Первый клик!',   icon: '🌟', req: (g) => g.totalClicks >= 1 },
  { id: 'clicks100',  name: '100 кликов',     icon: '💯', req: (g) => g.totalClicks >= 100 },
  { id: 'clicks1k',   name: '1000 кликов',    icon: '🖱️', req: (g) => g.totalClicks >= 1000 },
  { id: 'cookies100', name: '100 печений',    icon: '🍪', req: (g) => g.allTimeCookies >= 100 },
  { id: 'cookies1k',  name: '1К печений',     icon: '🥐', req: (g) => g.allTimeCookies >= 1000 },
  { id: 'cookies10k', name: '10К печений',    icon: '🎂', req: (g) => g.allTimeCookies >= 10000 },
  { id: 'cookies1m',  name: '1 миллион!',     icon: '👑', req: (g) => g.allTimeCookies >= 1000000 },
  { id: 'cookies1b',  name: '1 МИЛЛИАРД!!',   icon: '💎', req: (g) => g.allTimeCookies >= 1000000000 },
  { id: 'shop1',      name: 'Первая покупка', icon: '🛒', req: (g) => g.totalPurchases >= 1 },
  { id: 'shop10',     name: '10 покупок',     icon: '🏪', req: (g) => g.totalPurchases >= 10 },
  { id: 'cps10',      name: '10/сек',         icon: '⚙️', req: (g) => g.cps >= 10 },
  { id: 'cps100',     name: '100/сек',        icon: '🚀', req: (g) => g.cps >= 100 },
  { id: 'cps1000',    name: '1000/сек',       icon: '🌠', req: (g) => g.cps >= 1000 },
];

const NEWS = [
  'Учёные обнаружили, что печенье решает все проблемы!',
  'Курс Cookie к доллару достиг исторического максимума!',
  'Бабушки по всему миру требуют повышения зарплаты.',
  'Портал в мир печенья открыт на 42-й параллели.',
  'Машина времени доставила партию печенья из 3025 года.',
  'Волшебная башня выпустила NFT в виде имбирного человечка.',
  'Шахтёры нашли жилу белого шоколада.',
  'Фабрика перешла на 100% возобновляемое сахарное топливо.',
  'Банк Cookie предлагает 420% годовых!',
];

// ========================
// СОСТОЯНИЕ ИГРЫ
// ========================

let game = {
  cookies: 0,
  allTimeCookies: 0,
  totalClicks: 0,
  totalPurchases: 0,
  clickPower: 1,
  cps: 0,
  upgrades: {},
  clickUpgrades: [],
  achievements: [],
};

let lastTick = Date.now();
const saveId = 'clicker_save_v1';

// ========================
// УТИЛИТЫ
// ========================

function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + ' T';
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + ' B';
  if (n >= 1e6)  return (n / 1e6).toFixed(2) + ' M';
  if (n >= 1e3)  return (n / 1e3).toFixed(1) + ' K';
  return Math.floor(n).toString();
}

function getCost(upgrade, count) {
  return Math.ceil(upgrade.baseCost * Math.pow(1.15, count));
}

function calcCps() {
  let total = 0;
  for (const upg of UPGRADES) {
    const cnt = game.upgrades[upg.id] || 0;
    total += upg.baseCps * cnt;
  }
  return total;
}

function calcClickPower() {
  let base = 1;
  for (const cu of CLICK_UPGRADES) {
    if (game.clickUpgrades.includes(cu.id)) base += cu.bonus;
  }
  return base;
}

// ========================
// КЛИК
// ========================

function handleClick(e) {
  const earned = game.clickPower;
  game.cookies += earned;
  game.allTimeCookies += earned;
  game.totalClicks++;

  const btn = document.getElementById('cookie-btn');
  btn.classList.remove('clicked');
  void btn.offsetWidth;
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 250);

  spawnFloatText(e.clientX, e.clientY, '+' + fmt(earned));

  updateUI();
  checkAchievements();
}

function spawnFloatText(x, y, text) {
  const el = document.createElement('div');
  el.className = 'float-text';
  el.textContent = text;
  el.style.left = (x - 20 + Math.random() * 40 - 20) + 'px';
  el.style.top  = (y - 20) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ========================
// ПОКУПКИ
// ========================

function buyUpgrade(id, amount = 1) {
  const upg = UPGRADES.find(u => u.id === id);
  if (!upg) return;

  let count = game.upgrades[id] || 0;
  let totalCost = 0;
  for (let i = 0; i < amount; i++) {
    totalCost += getCost(upg, count + i);
  }

  if (game.cookies < totalCost) return;
  game.cookies -= totalCost;
  game.upgrades[id] = count + amount;
  game.totalPurchases += amount;
  game.cps = calcCps();

  renderShop();
  updateUI();
  checkAchievements();
  autoSave();
}

function buyClickUpgrade(id) {
  const cu = CLICK_UPGRADES.find(u => u.id === id);
  if (!cu || game.clickUpgrades.includes(id)) return;
  if (game.cookies < cu.cost) return;

  game.cookies -= cu.cost;
  game.clickUpgrades.push(id);
  game.totalPurchases++;
  game.clickPower = calcClickPower();

  renderShop();
  updateUI();
  checkAchievements();
  autoSave();
}

// ========================
// ДОСТИЖЕНИЯ
// ========================

function checkAchievements() {
  for (const ach of ACHIEVEMENTS) {
    if (!game.achievements.includes(ach.id) && ach.req(game)) {
      game.achievements.push(ach.id);
      showAchievementToast(ach);
      renderAchievements();
    }
  }
}

function showAchievementToast(ach) {
  const el = document.createElement('div');
  el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black px-6 py-3 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 transition-all';
  el.innerHTML = `<span class="text-xl">${ach.icon}</span> Достижение: <span class="text-yellow-900">${ach.name}</span>!`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  }, 3000);
}

function renderAchievements() {
  const el = document.getElementById('achievements');
  if (!el) return;
  el.innerHTML = game.achievements.map(id => {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    return ach
      ? `<div class="flex items-center gap-2 text-yellow-400"><span>${ach.icon}</span><span>${ach.name}</span></div>`
      : '';
  }).join('') || '<span class="text-gray-600">Пока нет...</span>';
}

// ========================
// МАГАЗИН
// ========================

function renderShop() {
  const shop = document.getElementById('shop');

  // Улучшения клика
  let html = `<div class="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">⚡ Бонусы клика</div>`;

  for (const cu of CLICK_UPGRADES) {
    const owned = game.clickUpgrades.includes(cu.id);
    const canAfford = game.cookies >= cu.cost;
    const cls = owned
      ? 'opacity-30 cursor-not-allowed'
      : canAfford
        ? 'can-afford cursor-pointer'
        : 'disabled cursor-not-allowed';

    html += `
      <div class="upgrade-card stat-bar rounded-xl p-3 flex items-center gap-3 border border-transparent ${cls}"
           onclick="${owned ? '' : "buyClickUpgrade('" + cu.id + "')"}">
        <div class="text-2xl w-10 text-center">${cu.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm truncate">${cu.name}</div>
          <div class="text-xs text-gray-400">${cu.desc}</div>
        </div>
        <div class="text-right flex-shrink-0">
          ${owned
            ? '<span class="text-green-400 text-xs font-bold">✓ куплено</span>'
            : `<div class="font-black text-amber-400 text-sm">🍪 ${fmt(cu.cost)}</div>`
          }
        </div>
      </div>`;
  }

  // Здания
  html += `<div class="text-xs text-gray-500 uppercase tracking-widest mt-4 mb-2 font-bold">🏗️ Производство</div>`;

  for (const upg of UPGRADES) {
    const count = game.upgrades[upg.id] || 0;
    const cost  = getCost(upg, count);
    const canAfford = game.cookies >= cost;
    const cls = canAfford ? 'can-afford cursor-pointer' : 'disabled cursor-not-allowed';

    html += `
      <div class="upgrade-card stat-bar rounded-xl p-3 flex items-center gap-3 border border-transparent ${cls}"
           onclick="buyUpgrade('${upg.id}')"
           oncontextmenu="event.preventDefault(); buyUpgrade('${upg.id}', 10)">
        <div class="text-2xl w-10 text-center">${upg.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-sm flex items-center gap-2">
            ${upg.name}
            ${count > 0 ? `<span class="bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full font-black">${count}</span>` : ''}
          </div>
          <div class="text-xs text-gray-400">${upg.desc}</div>
          ${count > 0 ? `<div class="text-xs text-green-400">+${(upg.baseCps * count).toFixed(1)}/сек</div>` : ''}
        </div>
        <div class="text-right flex-shrink-0">
          <div class="font-black text-amber-400 text-sm">🍪 ${fmt(cost)}</div>
          <div class="text-xs text-gray-500">+${upg.baseCps}/сек</div>
        </div>
      </div>`;
  }

  shop.innerHTML = html;
}

// ========================
// UI ОБНОВЛЕНИЕ
// ========================

function updateUI() {
  const c   = game.cookies;
  const cps = game.cps;
  const cp  = game.clickPower;

  const fmtc   = fmt(c);
  const fmtcps = cps.toFixed(1);

  document.getElementById('cookie-count').textContent    = fmtc;
  document.getElementById('header-total').textContent    = fmt(game.allTimeCookies);
  document.getElementById('header-cps').textContent      = fmtcps;
  document.getElementById('stat-clicks').textContent     = fmt(game.totalClicks);
  document.getElementById('stat-per-click').textContent  = fmt(cp);
  document.getElementById('stat-cps').textContent        = fmtcps;
  document.getElementById('stat-total').textContent      = fmt(game.allTimeCookies);
  document.getElementById('click-power').textContent     = fmt(cp);
  document.getElementById('cps-display').textContent     = fmtcps;
  document.getElementById('m-clicks').textContent        = fmt(game.totalClicks);
  document.getElementById('m-total').textContent         = fmt(game.allTimeCookies);
}

// ========================
// НОВОСТНОЙ ТИКЕР
// ========================

let newsIndex = 0;

function updateNewsTicker() {
  const el = document.getElementById('news-ticker');
  if (!el) return;
  el.textContent = NEWS[newsIndex % NEWS.length];
  newsIndex++;
}

setInterval(updateNewsTicker, 4000);

// ========================
// АВТО-КПС ТИКЕР
// ========================

function gameTick() {
  const now = Date.now();
  const dt  = (now - lastTick) / 1000;
  lastTick  = now;

  if (game.cps > 0) {
    const earned = game.cps * dt;
    game.cookies        += earned;
    game.allTimeCookies += earned;
    updateUI();
    checkAchievements();
  }
}

setInterval(gameTick, 50);
setInterval(renderShop, 1000);

// ========================
// СОХРАНЕНИЕ
// ========================

function getState() {
  return {
    cookies: game.cookies,
    allTimeCookies: game.allTimeCookies,
    totalClicks: game.totalClicks,
    totalPurchases: game.totalPurchases,
    clickPower: game.clickPower,
    cps: game.cps,
    upgrades: game.upgrades,
    clickUpgrades: game.clickUpgrades,
    achievements: game.achievements,
  };
}

async function autoSave() {
  try {
    await fetch('/api/save/' + saveId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getState()),
    });
  } catch (e) {
    localStorage.setItem(saveId, JSON.stringify(getState()));
  }
}

async function loadSave() {
  try {
    const res  = await fetch('/api/save/' + saveId);
    const json = await res.json();
    if (json.exists && json.data) {
      Object.assign(game, json.data);
      game.cps = calcCps();
      game.clickPower = calcClickPower();
      return;
    }
  } catch (e) {}

  // Fallback: localStorage
  try {
    const ls = localStorage.getItem(saveId);
    if (ls) {
      Object.assign(game, JSON.parse(ls));
      game.cps = calcCps();
      game.clickPower = calcClickPower();
    }
  } catch (e) {}
}

function resetGame() {
  if (!confirm('Сбросить весь прогресс? Это необратимо!')) return;
  game = {
    cookies: 0,
    allTimeCookies: 0,
    totalClicks: 0,
    totalPurchases: 0,
    clickPower: 1,
    cps: 0,
    upgrades: {},
    clickUpgrades: [],
    achievements: [],
  };
  localStorage.removeItem(saveId);
  autoSave();
  renderShop();
  renderAchievements();
  updateUI();
}

// Автосохранение каждые 10 сек
setInterval(() => {
  autoSave();
  localStorage.setItem(saveId, JSON.stringify(getState()));
}, 10000);

// ========================
// СТАРТ
// ========================

(async () => {
  await loadSave();
  renderShop();
  renderAchievements();
  updateUI();
  updateNewsTicker();
})();
