/**
 * STAGE — Official Landing Page & Interactive Showcase Engine
 * Aligned with stage-combined-vision-1.md & stage-mvp-technical-spec.md
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Web Audio Synth FX Engine
  initAudio();

  // Initialize Hero Entry Fork & Mode Switcher
  initModeSwitcher();

  // Initialize Walkthrough Navigation
  initWalkthroughNav();

  // Initialize Interactive Phone Engines (Audience & Performer)
  initInteractivePhones();

  // Initialize FAQ Accordion
  initFaqAccordion();

  // Initialize Early Access Form & Confetti
  initEarlyAccessForm();

  // Initialize GSAP Entrance Animations
  initGSAPEntrance();
});

/* ==========================================================================
   1. Audio Synthesizer Engine (Zero external assets needed)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled 
      ? `<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
      : `<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
    
    if (soundEnabled) {
      playSound('pop');
    }
  });
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'curtain') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.4);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'success') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.06);
        g.gain.setValueAtTime(0.12, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + i * 0.06);
        o.stop(now + i * 0.06 + 0.35);
      });
    }
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
}

/* ==========================================================================
   2. Mode Switcher & Entry Fork (Audience vs Performer Journeys)
   ========================================================================== */
let currentMode = 'audience';

function initModeSwitcher() {
  const btnAudience = document.getElementById('modeBtnAudience');
  const btnPerformer = document.getElementById('modeBtnPerformer');
  const heroForkAudience = document.getElementById('heroForkAudience');
  const heroForkPerformer = document.getElementById('heroForkPerformer');
  const navForkBtn = document.getElementById('navForkBtn');

  function setMode(mode) {
    currentMode = mode;
    const isAudience = mode === 'audience';

    if (btnAudience && btnPerformer) {
      btnAudience.classList.toggle('active', isAudience);
      btnPerformer.classList.toggle('active', !isAudience);
    }

    const audNavGroup = document.querySelector('.nav-group-audience');
    const perfNavGroup = document.querySelector('.nav-group-performer');

    if (audNavGroup && perfNavGroup) {
      audNavGroup.style.display = isAudience ? 'block' : 'none';
      perfNavGroup.style.display = isAudience ? 'none' : 'block';
    }

    // Set default panel for the active mode
    const defaultPanelId = isAudience ? 'panel-feed' : 'panel-wizard';
    const activeGroup = isAudience ? audNavGroup : perfNavGroup;
    if (activeGroup) {
      const items = activeGroup.querySelectorAll('.walkthrough-nav-item');
      items.forEach((item, idx) => {
        item.classList.toggle('active', idx === 0);
      });
    }

    document.querySelectorAll('.walkthrough-panel').forEach(p => {
      p.classList.toggle('active', p.id === defaultPanelId);
    });

    playSound('pop');
  }

  if (btnAudience) btnAudience.addEventListener('click', () => setMode('audience'));
  if (btnPerformer) btnPerformer.addEventListener('click', () => setMode('performer'));

  if (heroForkAudience) {
    heroForkAudience.addEventListener('click', () => {
      setMode('audience');
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroForkPerformer) {
    heroForkPerformer.addEventListener('click', () => {
      setMode('performer');
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (navForkBtn) {
    navForkBtn.addEventListener('click', () => {
      setMode('performer');
    });
  }
}

/* ==========================================================================
   3. Walkthrough Sidebar Navigation Switcher
   ========================================================================== */
function initWalkthroughNav() {
  document.querySelectorAll('.walkthrough-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const panelId = item.dataset.panel;
      if (!panelId) return;

      const parentGroup = item.closest('.nav-group-audience, .nav-group-performer');
      if (parentGroup) {
        parentGroup.querySelectorAll('.walkthrough-nav-item').forEach(i => i.classList.toggle('active', i === item));
      }

      document.querySelectorAll('.walkthrough-panel').forEach(p => {
        p.classList.toggle('active', p.id === panelId);
      });

      playSound('pop');
    });
  });
}

/* ==========================================================================
   4. Interactive Phone Mockup Engines
   ========================================================================== */
function initInteractivePhones() {
  const SB = '<div class="sb"><span>9:41</span><i class="isl"></i><svg class="sbi" viewBox="0 0 60 12" aria-hidden="true"><use href="#i-status"/></svg></div>';
  const NAVS = [['home', 'Home'], ['search', 'Explore'], ['users', 'Following'], ['bag', 'Cart'], ['box', 'Orders']];
  const ico = (id, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const fmt = n => '₦' + n.toLocaleString('en-US');

  // Insert Status Bar into all phone mockups
  document.querySelectorAll('.phone').forEach(p => {
    if (!p.querySelector('.sb')) {
      p.insertAdjacentHTML('afterbegin', SB);
    }
  });

  /* ---------------- Experience 1: Masonry Feed (With Opening Night) ---------------- */
  const AV = {
    bc: ['BC', "Bella's Closet"],
    kj: ['KJ', 'Kicks by Jay'],
    gm: ['GM', 'Gifted by Mimi'],
    wp: ['WP', 'The Wardrobe Plug'],
    cl: ['CL', 'Chic Looks'],
    ac: ['AC', 'Amara Crafts']
  };

  const PINS = [
    // Spec §7: Opening Night Cold-Start Placement (Guaranteed slot for brand new seller)
    { k: 'opening-night', t: ['Gifts', 'Decor', 'For you'], biz: 'ac', title: 'Carved Cedar Scent Tray', price: '₦14,500', ar: 0.88, note: "Hand-carved in Benin City. My very first drop on Stage!" },
    { k: 'photo', t: ['Fashion', 'Following'], imgs: ['model'], ar: 0.78, title: 'Black two-piece', price: '₦25,000', biz: 'bc', custom: true },
    { k: 'photo', t: ['Fashion', 'Following'], imgs: ['whitetop'], ar: 0.92, title: 'White peplum top', price: '₦12,000', biz: 'bc' },
    { k: 'text', t: ['Gifts'] },
    { k: 'photo', t: ['Gifts', 'Following'], imgs: ['candle'], ar: 0.84, title: 'Amber glow candle', price: '₦8,500', biz: 'gm', custom: true },
    { k: 'shout', t: ['Fashion', 'Following'], biz: 'kj' },
    { k: 'photo', t: ['Gifts', 'Following'], imgs: ['gift'], ar: 0.96, title: 'Blush gift box', price: '₦18,000', biz: 'gm' },
    { k: 'photo', t: ['Fashion'], imgs: ['coord', 'outfit', 'dress'], ar: 0.86, title: 'The Noir edit', badge: '12 products', biz: 'cl' },
    { k: 'biz', t: ['Fashion'], biz: 'wp', thumbs: ['bagblack', 'tote', 'dress'] },
    { k: 'photo', t: ['Fashion'], imgs: ['bagblack'], ar: 0.95, title: 'Structured handbag', price: '₦42,000', biz: 'wp' },
    { k: 'blush', t: ['Gifts', 'Fashion'] }
  ];

  const H = { photo: p => 155 / p.ar + 62, 'opening-night': 250, text: 214, blush: 214, shout: 206, biz: 236 };

  function pinHTML(p) {
    if (p.k === 'opening-night') {
      return `<article class="pin pin-opening-night">
        <div class="pimg" style="aspect-ratio:${p.ar}; background: radial-gradient(circle at 50% 40%, #ffd27a, #996215); padding:16px; display:flex; flex-direction:column; justify-content:flex-end;">
          <button class="heart" aria-label="Save ${p.title}">${ico('heart')}</button>
          <span class="price">${p.price}</span>
        </div>
        <div class="pt" style="font-weight:700;">${p.title}</div>
        <p style="font-size:11px; color:#6D5B70; line-height:1.3; margin:3px 0 6px; font-style:italic;">"${p.note}"</p>
        <div class="pm"><span class="av lg ac" style="background:#2A1830; color:#EE9A22;">AC</span><span class="bn">Amara Crafts</span><span class="opening-night-pill">Opening Night</span></div>
      </article>`;
    }
    if (p.k === 'text') return `<article class="tp"><div><h3>Gifts that say “I thought of you.”</h3><p>Real independent gift studios on Stage.</p></div><button class="pill">Browse gifts</button></article>`;
    if (p.k === 'blush') return `<article class="tp blush"><div><h3>The Opening Note</h3><p>Customers meet the creator before the price.</p></div><button class="pill">See creators</button></article>`;
    if (p.k === 'shout') return `<article class="sh"><div class="mg">${ico('mega', 'md')}</div><h3>Back in stock!</h3><p>Kicks by Jay just restocked 18 sneakers.</p><div class="ft"><span class="av kj">KJ</span><button class="mini">View Stage</button></div></article>`;
    if (p.k === 'biz') {
      const [i, n] = AV[p.biz];
      return `<article class="bz"><div class="bz-g">${p.thumbs.map(t => `<i style="background-image:var(--img-${t})"></i>`).join('')}</div><div class="bz-r"><span class="av lg ${p.biz}">${i}</span><div><b>${n}</b><small>Verified Performer</small></div></div><button class="follow">Follow</button></article>`;
    }
    const [i, n] = AV[p.biz], car = p.imgs.length > 1;
    return `<article class="pin"><div class="pimg" style="aspect-ratio:${p.ar};background-image:var(--img-${p.imgs[0]})" ${car ? `data-car="${p.imgs.join(',')}" data-i="0"` : ''}>
      ${p.custom ? `<span class="cust">${ico('spark', 'sm fill')}Personalized</span>` : ''}
      <button class="heart" aria-label="Save ${p.title}">${ico('heart')}</button>
      <span class="price">${p.badge || p.price}</span></div>
      ${car ? `<div class="dots">${p.imgs.map((_, j) => `<i class="${j ? '' : 'on'}"></i>`).join('')}</div>` : ''}
      <div class="pt">${p.title}</div>
      <div class="pm"><span class="av ${p.biz}">${i}</span><span class="bn">${n}</span><button class="more" aria-label="More options">${ico('dots', 'fill')}</button></div></article>`;
  }

  const TABS = ['For you', 'Following', 'Fashion', 'Gifts'];
  
  document.querySelectorAll('.phone-feed-container').forEach(feedCont => {
    const tabsEl = feedCont.querySelector('.tabs');
    const colsEl = feedCont.querySelector('.cols');
    const homeScroll = feedCont.querySelector('.scroll');
    if (!tabsEl || !colsEl) return;

    tabsEl.innerHTML = TABS.map((t, i) => `<button class="tab ${i ? '' : 'on'}" role="tab" aria-selected="${!i}">${t}</button>`).join('');

    function renderFeed(tab) {
      const list = tab === 'For you' ? PINS : PINS.filter(p => p.t.includes(tab));
      const cols = [[], []], hs = [0, 0];
      list.forEach(p => {
        const c = hs[0] <= hs[1] ? 0 : 1;
        cols[c].push(pinHTML(p));
        hs[c] += (typeof H[p.k] === 'function' ? H[p.k](p) : H[p.k]);
      });
      colsEl.innerHTML = cols.map(c => `<div class="col">${c.join('')}</div>`).join('');
    }

    renderFeed('For you');

    tabsEl.addEventListener('click', e => {
      const b = e.target.closest('.tab');
      if (!b) return;
      tabsEl.querySelectorAll('.tab').forEach(x => {
        x.classList.toggle('on', x === b);
        x.setAttribute('aria-selected', x === b);
      });
      renderFeed(b.textContent);
      if (homeScroll) homeScroll.scrollTo({ top: 0, behavior: 'smooth' });
      playSound('pop');
    });

    colsEl.addEventListener('click', e => {
      const h = e.target.closest('.heart');
      if (h) {
        h.classList.toggle('on');
        playSound('chime');
        return;
      }
      const f = e.target.closest('.follow');
      if (f) {
        const on = f.classList.toggle('on');
        f.textContent = on ? 'Following' : 'Follow';
        playSound('pop');
        return;
      }
      const img = e.target.closest('.pimg[data-car]');
      if (img) {
        const arr = img.dataset.car.split(',');
        const n = (+img.dataset.i + 1) % arr.length;
        img.dataset.i = n;
        img.style.backgroundImage = `var(--img-${arr[n]})`;
        img.parentElement.querySelectorAll('.dots i').forEach((d, j) => d.classList.toggle('on', j === n));
        playSound('pop');
      }
    });
  });

  // Shortcut from Feed cart icon to Cart panel
  const feedCartBtn = document.getElementById('feedCartBtn');
  if (feedCartBtn) {
    feedCartBtn.addEventListener('click', () => {
      document.querySelector('.walkthrough-nav-item[data-panel="panel-cart"]')?.click();
    });
  }

  /* ---------------- Experience 2: Explore (Bubbles + Spec List View) ---------------- */
  const COL = { Fashion: '#40214B', Gifts: '#EE9A22', Decor: '#8FA07A', Beauty: '#E38F84', Food: '#C8693D', Tech: '#2F6F73' };
  const OY = 40;

  const B = [
    { n: "Bella's Closet", c: 'Fashion', city: 'Lagos', s: 118, x: 90, y: 92, img: 'model', pos: '50% 12%', say: '12 new pieces!', bl: 'Everyday pieces made for the modern woman. Chic, comfortable, timeless.', thumbs: ['model', 'whitetop'], verified: true },
    { n: 'Gifted by Mimi', c: 'Gifts', city: 'Port Harcourt', s: 96, x: 226, y: 84, img: 'gift', say: 'Gift sets 10% off', bl: 'Thoughtful gifts for every occasion, wrapped and ready to send.', thumbs: ['candle', 'gift'], verified: true },
    { n: 'Kicks by Jay', c: 'Fashion', city: 'Lagos', s: 84, x: 236, y: 190, img: 'sneak', say: 'Back in stock!', bl: 'Clean sneakers and everyday shoes. 18 pairs restocked this morning.', thumbs: ['sneak'], verified: false },
    { n: 'The Wardrobe Plug', c: 'Fashion', city: 'Port Harcourt', s: 104, x: 104, y: 222, img: 'bagblack', say: 'New bags just landed', bl: 'Bags, tops and dresses picked for how you actually dress.', thumbs: ['bagblack', 'tote'], verified: true },
    { n: 'Amber & Oak', c: 'Decor', city: 'Abuja', s: 88, x: 184, y: 310, img: 'candle', say: 'Candles restocked', bl: 'Hand-poured candles and warm home touches.', thumbs: ['candle'], verified: false },
    { n: 'Glow Theory', c: 'Beauty', city: 'Lagos', s: 78, x: 60, y: 330, logo: 'GT', bg: '#F4C9BE', fg: '#40214B', say: 'Free sample included', bl: 'Skincare basics that work with your routine, not against it.', thumbs: [], verified: true },
    { n: 'Chic Looks', c: 'Fashion', city: 'Ibadan', s: 60, x: 268, y: 322, logo: 'CL', bg: '#40214B', fg: '#EE9A22', say: 'Noir edit drops tonight', bl: 'Sharp co-ords and easy dresses for work and weekends.', thumbs: ['coord'], verified: false }
  ];

  const field = document.getElementById('field');
  const exploreListView = document.getElementById('exploreListView');
  const sheet = document.getElementById('sheet');
  const shFollow = document.getElementById('shFollow');
  const shViewStage = document.getElementById('shViewStage');
  let curBubble = null;

  if (field && exploreListView) {
    // 1. Build Bubble View
    B.forEach((b, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'bub';
      el.setAttribute('aria-label', `${b.n}, ${b.c}. ${b.say}`);
      el.style.cssText = `--s:${b.s}px;--ring:${COL[b.c]};--dur:${(6 + (i % 4) * 1.3).toFixed(1)}s;--dl:${-(i * 1.7).toFixed(1)}s;left:${b.x - b.s / 2}px;top:${b.y + OY - b.s / 2}px`;
      const face = b.img ? `style="background-image:var(--img-${b.img});background-position:${b.pos || 'center'}"` : `style="background:${b.bg};color:${b.fg}"`;
      el.innerHTML = `<span class="bub-in ${b.img ? 'ph' : ''}" ${face}>${b.img ? '' : `<span class="lg">${b.logo}</span>`}<span class="nm">${b.n}</span></span>`;
      b.el = el;
      b.inner = el.firstElementChild;
      field.appendChild(el);
      el.addEventListener('click', () => openBubbleSheet(b));
    });

    // 2. Build Spec §5 List View
    function renderListView(cat = 'All') {
      const filtered = cat === 'All' ? B : B.filter(b => b.c === cat);
      exploreListView.innerHTML = filtered.map(b => `
        <div class="ex-list-item" data-biz="${b.n}">
          <div class="ex-list-top">
            <span class="ex-list-av" style="${b.img ? `background-image:var(--img-${b.img});background-size:cover;` : `background:${b.bg};color:${b.fg};`}">${b.img ? '' : b.logo}</span>
            <div class="ex-list-info">
              <b>${b.n} ${b.verified ? `<span class="ex-verified-badge" title="Identity Verified"><svg class="ic sm fill" style="fill:#fff;width:9px;height:9px;"><use href="#i-check"/></svg></span>` : ''}</b>
              <small>${b.c} · ${b.city}</small>
            </div>
            <button class="btn-app line sm" style="height:28px; padding:0 10px; font-size:11px;" onclick="openStorefrontFromList('${b.n}')">View</button>
          </div>
          <div class="ex-shout-pill">
            <svg class="ic sm"><use href="#i-mega"/></svg>
            <span>"${b.say}"</span>
          </div>
          ${b.thumbs.length ? `
            <div class="ex-thumbs-strip">
              ${b.thumbs.map(t => `<span class="ex-thumb-mini" style="background-image:var(--img-${t});"></span>`).join('')}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    renderListView('All');

    // View Switcher (Bubbles vs List)
    const exploreViewToggle = document.getElementById('exploreViewToggle');
    if (exploreViewToggle) {
      exploreViewToggle.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const view = btn.dataset.view;
        exploreViewToggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        
        if (view === 'bubbles') {
          field.style.display = 'block';
          exploreListView.style.display = 'none';
        } else {
          field.style.display = 'none';
          exploreListView.style.display = 'flex';
          renderListView(document.querySelector('#chips .chip.on')?.dataset.cat || 'All');
        }
        playSound('pop');
      });
    }

    // Mini drifting ambient bubbles
    [[26, 52, 16, -1], [152, 56, 12, -3], [24, 236, 20, -2], [142, 482, 14, -4], [262, 500, 18, -5], [30, 500, 12, -2]].forEach(([x, y, s, d]) => {
      const m = document.createElement('i');
      m.className = 'mini-b';
      m.style.cssText = `--s:${s}px;left:${x}px;top:${y + OY - 40}px;--dl:${d}s;--dur:${5 + Math.abs(d)}s`;
      field.appendChild(m);
    });

    const shout = document.createElement('div');
    shout.className = 'shout';
    shout.setAttribute('aria-hidden', 'true');
    field.appendChild(shout);

    const TK = '<svg class="tk l" viewBox="0 0 18 18"><path d="M7 2 9 7M2 9l5 1.5M11 1l.6 5"/></svg><svg class="tk r" viewBox="0 0 18 18"><path d="M7 2 9 7M2 9l5 1.5M11 1l.6 5"/></svg>';
    let order = B.map((_, i) => i).sort(() => Math.random() - 0.5);
    let oi = 0, hideT, paused = false;

    function say(b, keep) {
      shout.innerHTML = `${TK}<b>${b.say}</b><span>${b.n}</span>`;
      shout.classList.remove('on');
      shout.style.left = '0px';
      shout.style.top = '0px';
      const w = shout.offsetWidth, h = shout.offsetHeight, fw = field.clientWidth;
      const left = Math.max(2, Math.min(b.x - w / 2, fw - w - 2));
      shout.style.left = left + 'px';
      shout.style.top = (b.y + OY - b.s / 2 - h - 12) + 'px';
      shout.style.setProperty('--tx', Math.max(16, Math.min(w - 16, b.x - left)) + 'px');
      requestAnimationFrame(() => shout.classList.add('on'));
      B.forEach(x => x.inner.classList.toggle('pop', x === b));
      clearTimeout(hideT);
      if (!keep) {
        hideT = setTimeout(() => {
          shout.classList.remove('on');
          b.inner.classList.remove('pop');
        }, 2400);
      }
    }

    function tick() {
      if (paused || field.style.display === 'none') return;
      const vis = order.map(i => B[i]).filter(b => !b.el.classList.contains('dim'));
      if (vis.length) say(vis[oi++ % vis.length]);
    }

    setTimeout(tick, 600);
    setInterval(tick, 3400);

    const chips = document.getElementById('chips');
    if (chips) {
      chips.addEventListener('click', e => {
        const ch = e.target.closest('.chip');
        if (!ch) return;
        chips.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === ch));
        const cat = ch.dataset.cat;
        B.forEach(b => b.el.classList.toggle('dim', cat !== 'All' && b.c !== cat));
        shout.classList.remove('on');
        B.forEach(x => x.inner.classList.remove('pop'));
        oi = 0;
        renderListView(cat);
        setTimeout(tick, 450);
        playSound('pop');
      });
    }

    function openBubbleSheet(b) {
      curBubble = b;
      paused = true;
      say(b, true);
      const av = document.getElementById('shAv');
      av.style.cssText = b.img ? `background-image:var(--img-${b.img});background-position:${b.pos || 'center'}` : `background:${b.bg};color:${b.fg}`;
      av.textContent = b.img ? '' : b.logo;
      document.getElementById('shName').textContent = b.n;
      document.getElementById('shMeta').textContent = `${b.c} · ${b.city}`;
      document.getElementById('shBlurb').textContent = b.bl;
      shFollow.textContent = b.f ? 'Following' : 'Follow';
      shFollow.className = 'btn-app ' + (b.f ? 'line' : 'solid');
      sheet.classList.add('open');
      sheet.setAttribute('aria-hidden', 'false');
      playSound('chime');
    }

    function closeBubbleSheet() {
      sheet.classList.remove('open');
      sheet.setAttribute('aria-hidden', 'true');
      paused = false;
      shout.classList.remove('on');
      B.forEach(x => x.inner.classList.remove('pop'));
    }

    const sheetX = document.getElementById('sheetX');
    if (sheetX) sheetX.addEventListener('click', closeBubbleSheet);

    if (shFollow) {
      shFollow.addEventListener('click', () => {
        if (!curBubble) return;
        curBubble.f = !curBubble.f;
        shFollow.textContent = curBubble.f ? 'Following' : 'Follow';
        shFollow.className = 'btn-app ' + (curBubble.f ? 'line' : 'solid');
        playSound('pop');
      });
    }

    if (shViewStage) {
      shViewStage.addEventListener('click', () => {
        closeBubbleSheet();
        document.querySelector('.walkthrough-nav-item[data-panel="panel-storefront"]')?.click();
      });
    }

    window.openStorefrontFromList = function(bizName) {
      document.querySelector('.walkthrough-nav-item[data-panel="panel-storefront"]')?.click();
      playSound('pop');
    };
  }

  /* ---------------- Experience 3: Storefront (The Person Before Product) ---------------- */
  const sfBackBtn = document.getElementById('sfBackBtn');
  if (sfBackBtn) {
    sfBackBtn.addEventListener('click', () => {
      document.querySelector('.walkthrough-nav-item[data-panel="panel-bubbles"]')?.click();
      playSound('pop');
    });
  }

  const voicePlayBtn = document.getElementById('voicePlayBtn');
  let voicePlaying = false;
  if (voicePlayBtn) {
    voicePlayBtn.addEventListener('click', () => {
      voicePlaying = !voicePlaying;
      voicePlayBtn.textContent = voicePlaying ? '❚❚' : '▶';
      const bars = document.querySelectorAll('.voice-bar');
      bars.forEach(b => {
        b.style.animationPlayState = voicePlaying ? 'running' : 'paused';
      });
      playSound(voicePlaying ? 'curtain' : 'pop');
    });
  }

  const sfFollowMainBtn = document.getElementById('sfFollowMainBtn');
  if (sfFollowMainBtn) {
    sfFollowMainBtn.addEventListener('click', () => {
      const isFollowing = sfFollowMainBtn.classList.toggle('btn-sf-outline');
      sfFollowMainBtn.classList.toggle('btn-sf-solid', !isFollowing);
      sfFollowMainBtn.textContent = isFollowing ? 'Following' : 'Follow';
      playSound('chime');
    });
  }

  const sellerCatsBar = document.getElementById('sellerCatsBar');
  if (sellerCatsBar) {
    sellerCatsBar.addEventListener('click', e => {
      const chip = e.target.closest('.seller-cat-chip');
      if (!chip) return;
      sellerCatsBar.querySelectorAll('.seller-cat-chip').forEach(c => c.classList.toggle('active', c === chip));
      playSound('pop');
    });
  }

  /* ---------------- Experience 4: Customization Tiers ---------------- */
  const tierSelector = document.getElementById('tierSelector');
  if (tierSelector) {
    tierSelector.addEventListener('click', e => {
      const btn = e.target.closest('.tier-tab-btn');
      if (!btn) return;
      const tier = btn.dataset.tier;
      tierSelector.querySelectorAll('.tier-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      
      const boxes = {
        personalized: document.getElementById('tierBoxPersonalized'),
        configurable: document.getElementById('tierBoxConfigurable'),
        fixed: document.getElementById('tierBoxFixed'),
        request: document.getElementById('tierBoxRequest')
      };

      Object.entries(boxes).forEach(([k, box]) => {
        if (box) box.classList.toggle('active', k === tier);
      });

      const custCta = document.getElementById('custCta');
      if (custCta) {
        if (tier === 'personalized') custCta.textContent = 'Add to Bag · ₦10,000';
        else if (tier === 'configurable') custCta.textContent = 'Add Configured Item · ₦8,500';
        else if (tier === 'fixed') custCta.textContent = 'Add to Bag · ₦12,000';
        else if (tier === 'request') custCta.textContent = 'Submit Custom Request to Performer';
      }

      playSound('pop');
    });
  }

  // Tier 3: Personalized Candle SVG Lettering Customizer
  const lbl = document.getElementById('lbl');
  const nm = document.getElementById('nm');
  const jar = document.getElementById('jar');
  const custCta = document.getElementById('custCta');

  const FONTS = {
    script: { fam: "'Pinyon Script', cursive", w: 400, k: 0.42, max: 42, up: false, dy: 6 },
    serif: { fam: "'Fraunces', Georgia, serif", w: 600, k: 0.56, max: 30, up: false, dy: 2 },
    block: { fam: "'Bricolage Grotesque', sans-serif", w: 800, k: 0.68, max: 24, up: true, dy: 0 }
  };

  let currentFont = 'script';

  function drawLabel() {
    if (!lbl || !nm) return;
    const raw = nm.value.trim();
    const f = FONTS[currentFont];
    const txt = raw || 'Your name';
    const shown = f.up ? txt.toUpperCase() : txt;
    const fs = Math.min(f.max, 84 / (Math.max(shown.length, 1) * f.k));
    lbl.textContent = shown;
    lbl.setAttribute('font-size', fs.toFixed(1));
    lbl.setAttribute('y', (158 + f.dy).toFixed(1));
    lbl.style.fontFamily = f.fam;
    lbl.style.fontWeight = f.w;
    lbl.setAttribute('fill-opacity', raw ? '1' : '0.35');
    if (custCta && document.getElementById('tierBoxPersonalized')?.classList.contains('active')) {
      custCta.textContent = `Add to Bag · ${fmt(8500 + (raw ? 1500 : 0))}`;
    }
  }

  if (nm) nm.addEventListener('input', drawLabel);

  const fontsContainer = document.getElementById('fonts');
  if (fontsContainer) {
    fontsContainer.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      currentFont = b.dataset.f;
      fontsContainer.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      drawLabel();
      playSound('pop');
    });
  }

  const swContainer = document.getElementById('sw');
  if (swContainer) {
    swContainer.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      swContainer.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      if (jar) jar.setAttribute('fill', getComputedStyle(b).getPropertyValue('--c').trim());
      const swName = document.getElementById('swName');
      if (swName) swName.textContent = b.dataset.n;
      playSound('pop');
    });
  }

  drawLabel();

  const btnSendReq = document.getElementById('btnSendReq');
  if (btnSendReq) {
    btnSendReq.addEventListener('click', () => {
      btnSendReq.textContent = '✓ Request Sent to Performer Chat';
      playSound('success');
      setTimeout(() => {
        btnSendReq.textContent = 'Send Request to Performer';
      }, 3000);
    });
  }

  /* ---------------- Experience 5: Seller-Grouped Cart & WhatsApp/Telegram Checkout ---------------- */
  const orderRouteModal = document.getElementById('orderRouteModal');
  const closeOrderModal = document.getElementById('closeOrderModal');
  const modalReceiptCode = document.getElementById('modalReceiptCode');
  const modalOrderTitle = document.getElementById('modalOrderTitle');
  const modalOrderMsg = document.getElementById('modalOrderMsg');
  const modalOpenChatBtn = document.getElementById('modalOpenChatBtn');

  const ORDER_PREVIEWS = {
    bc: {
      channel: 'WhatsApp',
      receipt: '#STG-8492',
      title: 'Order Ready for WhatsApp · Bella’s Closet',
      text: `Hello Bella’s Closet! I would like to place an order from your Stage:\n\n• Black Two-Piece (M) x1 — ₦25,000\n• White Peplum Top (S) x1 — ₦12,000\n\nSubtotal: ₦37,000\nReceipt Verification Code: #STG-8492\n\nLooking forward to confirming order and payment details with you!`
    },
    gm: {
      channel: 'Telegram',
      receipt: '#STG-7412',
      title: 'Order Ready for Telegram · Gifted by Mimi',
      text: `Hello Mimi! I would like to place an order from your Stage:\n\n• Amber Glow Candle (Personalized: "Amara") x1 — ₦10,000\n\nSubtotal: ₦10,000\nReceipt Verification Code: #STG-7412\n\nLooking forward to confirming order details with you!`
    }
  };

  document.querySelectorAll('.btn-checkout-channel').forEach(btn => {
    btn.addEventListener('click', () => {
      const biz = btn.dataset.biz;
      const order = ORDER_PREVIEWS[biz];
      if (!order || !orderRouteModal) return;

      modalReceiptCode.textContent = order.receipt;
      modalOrderTitle.textContent = order.title;
      modalOrderMsg.textContent = order.text;
      modalOpenChatBtn.textContent = `Open ${order.channel} (${order.receipt})`;
      modalOpenChatBtn.style.background = order.channel === 'WhatsApp' ? '#25D366' : '#0088CC';

      orderRouteModal.classList.add('open');
      playSound('curtain');
    });
  });

  if (closeOrderModal) {
    closeOrderModal.addEventListener('click', () => {
      orderRouteModal.classList.remove('open');
      playSound('pop');
    });
  }

  if (modalOpenChatBtn) {
    modalOpenChatBtn.addEventListener('click', () => {
      modalOpenChatBtn.textContent = '✓ Order Routed to Performer!';
      playSound('success');
      setTimeout(() => {
        orderRouteModal.classList.remove('open');
      }, 1500);
    });
  }

  /* ---------------- Experience 6: Drops Curtain Theatre ---------------- */
  const theatre = document.getElementById('theatre');
  const peek = document.getElementById('peek');
  if (theatre && peek) {
    peek.addEventListener('click', () => {
      const o = theatre.classList.toggle('open');
      peek.textContent = o ? 'Close the curtain' : 'Peek behind the curtain';
      playSound('curtain');
    });
  }

  let dropSeconds = 2 * 3600 + 14 * 60 + 37;
  const p2 = n => String(n).padStart(2, '0');
  setInterval(() => {
    dropSeconds = dropSeconds > 0 ? dropSeconds - 1 : 0;
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    if (hh) hh.textContent = p2(Math.floor(dropSeconds / 3600));
    if (mm) mm.textContent = p2(Math.floor((dropSeconds % 3600) / 60));
    if (ss) ss.textContent = p2(dropSeconds % 60);
  }, 1000);

  const remind = document.getElementById('remind');
  if (remind) {
    remind.addEventListener('click', () => {
      const on = remind.classList.toggle('line');
      remind.classList.toggle('solid', !on);
      remind.innerHTML = (on ? ico('check', 'md') : ico('bell', 'md')) + `<span>${on ? 'Reminder set' : 'Remind me'}</span>`;
      playSound('chime');
    });
  }

  document.querySelectorAll('.bell').forEach(b => {
    b.addEventListener('click', () => {
      const on = b.classList.toggle('on');
      b.innerHTML = ico(on ? 'check' : 'bell', 'md');
      playSound('chime');
    });
  });

  /* ---------------- Performer Experience: Wizard, Backstage & Buzz ---------------- */
  // 1. Wizard Channel Choice
  const wizChanWa = document.getElementById('wizChanWa');
  const wizChanTg = document.getElementById('wizChanTg');
  const wizHandleInput = document.getElementById('wizHandleInput');

  if (wizChanWa && wizChanTg && wizHandleInput) {
    wizChanWa.addEventListener('click', () => {
      wizChanWa.classList.add('active');
      wizChanTg.classList.remove('active');
      wizHandleInput.placeholder = 'Enter WhatsApp phone number (e.g. +234...)';
      wizHandleInput.value = '+234 812 345 6789';
      playSound('pop');
    });

    wizChanTg.addEventListener('click', () => {
      wizChanTg.classList.add('active');
      wizChanWa.classList.remove('active');
      wizHandleInput.placeholder = 'Enter Telegram @username (e.g. @yourstudio)';
      wizHandleInput.value = '@bellascloset';
      playSound('pop');
    });
  }

  const wizPreviewBtn = document.getElementById('wizPreviewBtn');
  if (wizPreviewBtn) {
    wizPreviewBtn.addEventListener('click', () => {
      wizPreviewBtn.textContent = '✓ Opening Night Activated!';
      playSound('success');
      setTimeout(() => {
        document.querySelector('.walkthrough-nav-item[data-panel="panel-opening-night"]')?.click();
      }, 1000);
    });
  }

  // 2. Backstage Status Advance
  const bsAdvance1 = document.getElementById('bsAdvance1');
  const bsStatus1 = document.getElementById('bsStatus1');
  if (bsAdvance1 && bsStatus1) {
    let stateIdx = 0;
    const states = [
      { text: 'Confirmed', cls: 'confirmed', next: 'Advance to Processing' },
      { text: 'Processing', cls: 'pending', next: 'Advance to Ready' },
      { text: 'Ready', cls: 'ready', next: 'Complete Order' },
      { text: 'Completed', cls: 'ready', next: 'Completed ✓' }
    ];

    bsAdvance1.addEventListener('click', () => {
      if (stateIdx < states.length) {
        const s = states[stateIdx++];
        bsStatus1.textContent = s.text;
        bsStatus1.className = `bs-status ${s.cls}`;
        bsAdvance1.textContent = s.next;
        playSound('success');
      }
    });
  }

  // 3. Stage Buzz Toggle ("Absence Isn't Negative" rule)
  const btnBuzzStage = document.getElementById('btnBuzzStage');
  const btnBuzzOld = document.getElementById('btnBuzzOld');
  const buzzStagePanel = document.getElementById('buzzStagePanel');
  const buzzOldPanel = document.getElementById('buzzOldPanel');

  if (btnBuzzStage && btnBuzzOld && buzzStagePanel && buzzOldPanel) {
    btnBuzzStage.addEventListener('click', () => {
      btnBuzzStage.classList.add('active');
      btnBuzzOld.classList.remove('active');
      buzzStagePanel.classList.add('active');
      buzzOldPanel.classList.remove('active');
      playSound('pop');
    });

    btnBuzzOld.addEventListener('click', () => {
      btnBuzzOld.classList.add('active');
      btnBuzzStage.classList.remove('active');
      buzzOldPanel.classList.add('active');
      buzzStagePanel.classList.remove('active');
      playSound('pop');
    });
  }
}

/* ==========================================================================
   5. Minimalist FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-ref-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-ref-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(x => x.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
        playSound('pop');
      }
    });
  });
}

/* ==========================================================================
   6. Early Access Form & Confetti
   ========================================================================== */
function initEarlyAccessForm() {
  const form = document.getElementById('earlyAccessForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    launchConfetti();
    playSound('success');

    form.innerHTML = `
      <div style="padding: 12px 20px; font-weight: 700; color: #110A14; font-size: 14.5px;">
        🎉 You’re on the list! Welcome to Stage.
      </div>
    `;
  });
}

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#EE9A22', '#40214B', '#F4C9BE', '#B9C6A6', '#E2532F', '#FAF4E8'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12
    });
  }

  let frame = 0;
  function animate() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.alpha -= 0.012;
      p.rot += p.vrot;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive && frame < 180) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   7. GSAP Entrance Animations
   ========================================================================== */
function initGSAPEntrance() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

  tl.from('.hero-ref-title', { y: 30, opacity: 0, delay: 0.1 })
    .from('.hero-ref-sub', { y: 20, opacity: 0 }, '-=0.6')
    .from('.hero-fork-grid', { y: 20, opacity: 0 }, '-=0.6')
    .from('.hero-app-window', { y: 40, opacity: 0, scale: 0.97 }, '-=0.7');

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.gallery-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    gsap.from('.manifesto-pillars-grid', {
      scrollTrigger: {
        trigger: '.manifesto-pillars-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
}
