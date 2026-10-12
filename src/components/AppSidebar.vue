<template>
  <aside class="sidebar">
    <RouterLink class="brand" to="/notes" aria-label="На головну сторінку нотаток">
      <span class="brand-mark">n</span>
      <span><strong>noted</strong><small>ваші думки в порядку</small></span>
    </RouterLink>

    <div class="nav-label">РОБОЧИЙ ПРОСТІР</div>
    <nav class="side-nav" aria-label="Основна навігація">
      <RouterLink to="/notes" class="nav-link"><span class="nav-icon">▤</span>Усі нотатки</RouterLink>
      <RouterLink to="/categories" class="nav-link"><span class="nav-icon">◈</span>Категорії й теги</RouterLink>
      <RouterLink to="/about" class="nav-link"><span class="nav-icon">ⓘ</span>Про застосунок</RouterLink>
    </nav>

    <div class="sidebar-bottom">
      <div class="sidebar-tip"><span class="tip-icon">✦</span><strong>Маленька порада</strong><p>Додавайте теги, щоб швидше знаходити важливе.</p></div>
      <div class="profile"><span class="avatar">В</span><span><strong>Мій простір</strong><small>локальний режим</small></span><span class="profile-dots">•••</span></div>
    </div>
  </aside>
</template>
