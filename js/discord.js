'use strict';

/* ─────────────────────────────────────────────
   SRAB Minecraft Server – Discord Presence
   API: Lanyard (https://api.lanyard.rest)
   ───────────────────────────────────────────── */

const DISCORD_USER_ID  = '737340777709043802';
const LANYARD_URL      = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;
const DC_POLL_INTERVAL = 30_000;

const STATUS_META = {
  online:  { key: 'statusOnline',  color: '#10b981' },
  idle:    { key: 'statusIdle',    color: '#f59e0b' },
  dnd:     { key: 'statusDnd',     color: '#ef4444' },
  offline: { key: 'statusOffline', color: '#6b7280' },
};

let _lastDiscordData = null;  // cached for lang re-render

function $dc(id) { return document.getElementById(id); }

// ── Update Discord card ────────────────────────

function updateDiscordCard(data) {
  const { discord_user, discord_status, activities, spotify } = data;

  // Inline avatar button
  const avatarEl      = $dc('dcAvatar');
  const placeholderEl = $dc('dcAvatarPlaceholder');
  const statusRingEl  = $dc('dcStatusRing');

  if (avatarEl && discord_user.avatar) {
    const ext = discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
    avatarEl.src           = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${ext}?size=128`;
    avatarEl.style.display = 'block';
    if (placeholderEl) placeholderEl.style.display = 'none';
  }
  if (statusRingEl) statusRingEl.className = `dc-owner-dot dc-status--${discord_status ?? 'offline'}`;

  // Modal avatar
  const modalAvatarEl = $dc('dcModalAvatar');
  const modalAvPh     = $dc('dcModalAvatarPh');
  if (modalAvatarEl && discord_user.avatar) {
    const ext = discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
    modalAvatarEl.src           = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${ext}?size=256`;
    modalAvatarEl.style.display = 'block';
    if (modalAvPh) modalAvPh.style.display = 'none';
  }

  // Username
  const usernameEl = $dc('dcModalUsername');
  if (usernameEl) usernameEl.textContent = discord_user.global_name || discord_user.username;

  // Status ring & label
  const meta             = STATUS_META[discord_status] ?? STATUS_META.offline;
  const statusLabel      = window.t ? window.t(meta.key) : meta.key;
  const modalStatusRing  = $dc('dcModalStatusRing');
  const modalStatusDot   = $dc('dcModalStatusDot');
  const modalStatusLabel = $dc('dcModalStatusLabel');
  if (modalStatusRing)  modalStatusRing.className = `dc-modal-status-ring dc-status--${discord_status ?? 'offline'}`;
  if (modalStatusDot)   modalStatusDot.style.background = meta.color;
  if (modalStatusLabel) { modalStatusLabel.textContent = statusLabel; modalStatusLabel.style.color = meta.color; }

  // Custom status
  const customEl  = $dc('dcModalCustomStatus');
  const customAct = activities?.find(a => a.type === 4);
  if (customEl) {
    if (customAct?.state) {
      const emoji = customAct.emoji?.name ? `${customAct.emoji.name} ` : '';
      customEl.textContent   = emoji + customAct.state;
      customEl.style.display = 'block';
    } else {
      customEl.style.display = 'none';
    }
  }

  // Game activity
  const activityEl     = $dc('dcModalActivity');
  const activityTextEl = $dc('dcModalActivityText');
  const gameActivity   = activities?.find(a => a.type === 0);
  if (activityEl && activityTextEl) {
    if (gameActivity) {
      let text = gameActivity.name;
      if (gameActivity.details) text += ` — ${gameActivity.details}`;
      activityTextEl.textContent = text;
      activityEl.style.display   = 'block';
    } else {
      activityEl.style.display = 'none';
    }
  }

  // Spotify
  const spotifyEl  = $dc('dcModalSpotify');
  const spotArt    = $dc('dcModalSpotifyArt');
  const spotSong   = $dc('dcModalSpotifySong');
  const spotArtist = $dc('dcModalSpotifyArtist');
  if (spotifyEl) {
    if (data.listening_to_spotify && spotify) {
      if (spotArt)    spotArt.src            = spotify.album_art_url ?? '';
      if (spotSong)   spotSong.textContent   = spotify.song ?? '';
      if (spotArtist) spotArtist.textContent = spotify.artist ?? '';
      spotifyEl.style.display = 'block';
    } else {
      spotifyEl.style.display = 'none';
    }
  }
}

async function fetchDiscordPresence() {
  try {
    const res = await fetch(LANYARD_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { success, data } = await res.json();
    if (!success) throw new Error('Lanyard error');
    _lastDiscordData = data;  // cache for lang re-render
    updateDiscordCard(data);
  } catch (err) {
    console.warn('[Discord] Presence unavailable:', err.message);
  }
}

// ── Boot ───────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  fetchDiscordPresence();
  setInterval(fetchDiscordPresence, DC_POLL_INTERVAL);

  // Re-render Discord labels on language change
  document.addEventListener('langchange', () => {
    if (_lastDiscordData) updateDiscordCard(_lastDiscordData);
  });

  // Modal open / close
  const ownerBtn   = $dc('dcOwnerBtn');
  const modal      = $dc('dcModal');
  const modalClose = $dc('dcModalClose');

  if (ownerBtn && modal) {
    ownerBtn.addEventListener('click', () => modal.classList.add('open'));
    modalClose?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }
});
