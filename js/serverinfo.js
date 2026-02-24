'use strict';

/* ─────────────────────────────────────────────
   SRAB Minecraft Server – Status Module
   API: https://mcapi.us/
   ───────────────────────────────────────────── */

const SERVER_IP        = 'mc.srab.me';
const API_STATUS_URL   = `https://mcapi.us/server/status?ip=${SERVER_IP}`;
const REFRESH_INTERVAL = 30_000;

let countdownTimer  = null;
let refreshInterval = null;
let _lastServerData = null;  // stored for re-render on lang change

// ── Helpers ────────────────────────────────────

function $(id) { return document.getElementById(id); }

function timeAgo(unixStr) {
  if (window.timeAgoTranslated) return window.timeAgoTranslated(unixStr);
  const diff = Math.floor(Date.now() / 1000) - parseInt(unixStr, 10);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Countdown ─────────────────────────────────

function startCountdown() {
  clearInterval(countdownTimer);
  let secs = REFRESH_INTERVAL / 1000;
  const el = $('countdownText');
  const fmt = (s) => window.t ? window.t('refreshingIn', s) : (s > 0 ? `Refreshing in ${s}s` : 'Refreshing...');
  if (el) el.textContent = fmt(secs);

  countdownTimer = setInterval(() => {
    secs--;
    if (el) el.textContent = fmt(secs);
    if (secs <= 0) clearInterval(countdownTimer);
  }, 1000);
}

// ── Refresh button state ───────────────────────

function setRefreshing(loading) {
  const btn  = $('refreshBtn');
  const icon = $('refreshIcon');
  if (!btn) return;
  btn.disabled = loading;
  icon.classList.toggle('mc-spin', loading);
}

// ── DOM Updaters ───────────────────────────────

function setOnlineStatus(online) {
  const dot  = $('statusDot');
  const text = $('statusText');
  const cls  = online ? 'online' : 'offline';
  dot.className    = `mc-status-dot ${cls}`;
  text.className   = `mc-status-text ${cls}`;
  text.textContent = window.t ? window.t(online ? 'online' : 'offline') : (online ? 'Online' : 'Offline');
}

function updatePlayerCount(players) {
  const now = players?.now ?? 0;
  const max = players?.max ?? 0;

  $('playerCount').textContent = `${now} / ${max}`;

  const fill = $('playerFill');
  if (fill) fill.style.width = max > 0 ? `${Math.min((now / max) * 100, 100)}%` : '0%';

  const container = $('playerListContainer');
  const list      = $('playerList');

  if (players?.sample?.length > 0) {
    list.innerHTML = players.sample
      .map(({ name }) =>
        `<a class="mc-player-item" href="https://namemc.com/profile/${encodeURIComponent(name)}" target="_blank" rel="noopener noreferrer" title="View ${name} on NameMC">
           <img class="mc-player-avatar" src="https://mc-heads.net/avatar/${encodeURIComponent(name)}/24" alt="${name}" loading="lazy" onerror="this.src='https://mc-heads.net/avatar/Steve/24'" />
           <span>${name}</span>
         </a>`
      )
      .join('');
    container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }
}

function updateFavicon(favicon) {
  const img = $('serverFavicon');
  if (img && favicon) {
    img.src           = favicon;
    img.style.display = 'inline-block';
  }
}

function updateVersion(server) {
  if (server?.name) $('serverVersion').textContent = server.name;
}

function updateMOTD(motd) {
  const box  = $('motdBox');
  const text = $('motdText');
  if (motd?.trim()) {
    text.textContent  = motd.trim();
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

function updateLastUpdated(last_updated) {
  const el = $('lastUpdated');
  if (el && last_updated) el.textContent = timeAgo(last_updated);
}

// ── Error banner ───────────────────────────────

function showError(msg) {
  $('errorText').textContent      = msg;
  $('errorMessage').style.display = 'flex';
}

function hideError() {
  $('errorMessage').style.display = 'none';
}

// ── Fetch & render ─────────────────────────────

async function fetchServerStatus() {
  setRefreshing(true);
  try {
    const res = await fetch(API_STATUS_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status !== 'success') throw new Error(data.error || 'API returned an error');

    hideError();
    setOnlineStatus(data.online);
    updatePlayerCount(data.players);
    updateFavicon(data.favicon);
    updateVersion(data.server);
    updateMOTD(data.motd);
    updateLastUpdated(data.last_updated);
    _lastServerData = data;  // cache for lang re-render

  } catch (err) {
    setOnlineStatus(false);
    const prefix = window.t ? window.t('errorPrefix') : 'Could not reach the server —';
    showError(`${prefix} ${err.message}`);
  } finally {
    setRefreshing(false);
    startCountdown();
  }
}

// ── Copy-IP cards ──────────────────────────────

function setupCopyCards() {
  document.querySelectorAll('.mc-info-box--copyable').forEach(card => {
    const trigger = async () => {
      const ip      = card.dataset.ip;
      const tooltip = card.querySelector('.mc-copy-tooltip');

      try {
        await navigator.clipboard.writeText(ip);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: ip });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }

      if (tooltip) {
        tooltip.classList.add('visible');
        setTimeout(() => tooltip.classList.remove('visible'), 1800);
      }
    };

    card.addEventListener('click', trigger);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });
  });
}

// ── Copy step IPs ───────────────────────────────

function setupCopyStepIPs() {
  document.querySelectorAll('.mc-step-ip--copyable').forEach(chip => {
    const trigger = async () => {
      const ip   = chip.dataset.ip;
      const orig = chip.textContent;

      try {
        await navigator.clipboard.writeText(ip);
      } catch {
        const ta = Object.assign(document.createElement('textarea'), { value: ip });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }

      chip.textContent = window.t ? window.t('copied') : 'Copied!';
      chip.classList.add('copied');
      setTimeout(() => {
        chip.textContent = ip;   // IPs are always the raw IP string
        chip.classList.remove('copied');
      }, 1800);
    };

    chip.addEventListener('click', trigger);
    chip.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });
  });
}

// ── Boot ───────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupCopyCards();
  setupCopyStepIPs();

  const refreshBtn = $('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      clearInterval(refreshInterval);
      clearInterval(countdownTimer);
      fetchServerStatus();
      refreshInterval = setInterval(fetchServerStatus, REFRESH_INTERVAL);
    });
  }

  fetchServerStatus();
  refreshInterval = setInterval(fetchServerStatus, REFRESH_INTERVAL);

  // Re-render dynamic server text on language change
  document.addEventListener('langchange', () => {
    if (_lastServerData) {
      setOnlineStatus(_lastServerData.online);
      updateLastUpdated(_lastServerData.last_updated);
    }
  });
});

