export function getIndexHtml(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <title>Cookie Clicker</title>
  <script src="https://telegram.org/js/telegram-web-app.js?62"><\/script>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="stylesheet" href="/static/style.css"/>
</head>
<body class="text-white">

<header class="stat-bar px-4 py-2 flex items-center justify-between sticky top-0 z-50">
  <div class="flex items-center gap-2">
    <span class="text-xl">🍪</span>
    <h1 class="text-base md:text-xl font-black tracking-wide text-amber-400">COOKIE CLICKER</h1>
  </div>
  <div class="flex items-center gap-3 md:gap-6 text-sm">
    <div class="text-center">
      <div class="text-amber-400 font-bold text-sm md:text-lg" id="header-total">0</div>
      <div class="text-gray-400 text-[10px] md:text-xs">всего</div>
    </div>
    <div class="text-center">
      <div class="text-green-400 font-bold text-sm md:text-lg" id="header-cps">0</div>
      <div class="text-gray-400 text-[10px] md:text-xs">в сек</div>
    </div>
    <button onclick="resetGame()" class="text-xs text-gray-500 hover:text-red-400 transition-colors">сброс</button>
  </div>
</header>

<div class="flex flex-col lg:flex-row" style="height: calc(100vh - 44px)">

  <aside class="w-56 flex-shrink-0 p-4 overflow-y-auto hidden lg:block">
    <div class="stat-bar rounded-2xl p-4 mb-4">
      <h3 class="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">Статистика</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-gray-400">Кликов</span><span class="font-bold text-white" id="stat-clicks">0</span></div>
        <div class="flex justify-between"><span class="text-gray-400">За клик</span><span class="font-bold text-amber-400" id="stat-per-click">1</span></div>
        <div class="flex justify-between"><span class="text-gray-400">В секунду</span><span class="font-bold text-green-400" id="stat-cps">0</span></div>
        <div class="flex justify-between"><span class="text-gray-400">Всего</span><span class="font-bold text-purple-400" id="stat-total">0</span></div>
      </div>
    </div>
    <div class="stat-bar rounded-2xl p-4">
      <h3 class="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">Достижения</h3>
      <div id="achievements" class="space-y-2 text-xs"></div>
    </div>
  </aside>

  <main class="flex-1 flex flex-col items-center justify-center gap-3 md:gap-6 p-2 md:p-4 min-h-0">
    <div class="text-xs text-gray-400 italic" id="news-ticker">Нажимай на печенье!</div>
    <div class="text-center">
      <div class="text-3xl md:text-5xl font-black text-amber-400 tabular-nums" id="cookie-count">0</div>
      <div class="text-gray-400 text-xs md:text-sm mt-1" id="player-name">печенья</div>
    </div>
    <button class="cookie-btn w-36 h-36 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center text-6xl md:text-8xl select-none" id="cookie-btn" onclick="handleClick(event)">🍪</button>
    <div class="text-center text-xs md:text-sm text-gray-400">
      <span class="text-amber-300 font-bold">+<span id="click-power">1</span></span> за клик
      <span class="mx-1 md:mx-2 text-gray-600">|</span>
      <span class="text-green-300 font-bold"><span id="cps-display">0</span></span> в сек
    </div>
    <div class="flex gap-3 text-[10px] text-gray-400 lg:hidden">
      <span>Кликов: <b class="text-white" id="m-clicks">0</b></span>
      <span>За клик: <b class="text-amber-400" id="m-perclick">1</b></span>
      <span>Всего: <b class="text-purple-400" id="m-total">0</b></span>
    </div>
  </main>

  <aside id="shop-panel" class="w-full lg:w-80 flex-shrink-0 p-3 md:p-4 overflow-y-auto mobile-shop">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xs md:text-sm font-black text-gray-300 uppercase tracking-widest">Магазин</h2>
      <span class="text-[10px] md:text-xs text-gray-500">долгое нажатие = x10</span>
    </div>
    <div id="shop" class="space-y-2"></div>
  </aside>
</div>

<div class="fixed bottom-0 left-0 right-0 lg:hidden z-40 flex">
  <button onclick="showTab('cookie')" id="tab-cookie" class="flex-1 py-3 text-center text-sm font-bold tab-btn tab-active">🍪 Кликер</button>
  <button onclick="showTab('shop')" id="tab-shop" class="flex-1 py-3 text-center text-sm font-bold tab-btn">🏪 Магазин</button>
</div>

<script src="/static/game.js"><\/script>
</body>
</html>`;
}
