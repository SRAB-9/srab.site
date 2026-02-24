# SRAB Minecraft Server Website

A lightweight, static website for the **SRAB Minecraft** community server. It displays live server status, player counts, getting-started instructions, and the server owner's Discord presence — all without any backend or build step.

## Features

- **Live server status** — polls the Minecraft server API every 30 seconds and shows online/offline state, player count, version, MOTD, and per-player avatars
- **Discord owner presence** — shows the server owner's Discord status (online, idle, DND, offline), current activity, and Spotify listening data via a Lanyard-powered modal
- **Getting-started guide** — step-by-step instructions for installing Fabric Loader, downloading the modpack, and connecting
- **Copyable server IPs** — `mc.srab.me` and `m.srab.me` with one-click clipboard support
- **Particle background** — animated canvas particles using particles.js
- **Internationalisation (i18n)** — multi-language support managed by `js/i18n.js`
- **Fully static** — plain HTML, CSS, and vanilla JavaScript; no framework or build tool required

## Project Structure

```
srab-minecraft-website/
├── index.html          # Main page
├── css/
│   ├── base.css        # Reset and global base styles
│   ├── animations.css  # Keyframe animations
│   ├── layout.css      # Page layout and card styles
│   ├── status.css      # Server status card styles
│   ├── steps.css       # Getting-started step styles
│   ├── discord.css     # Discord owner modal styles
│   └── i18n.css        # Language-switcher styles
├── js/
│   ├── serverinfo.js   # Minecraft server status polling
│   ├── discord.js      # Discord presence via Lanyard
│   ├── particles.js    # Canvas particle animation
│   └── i18n.js         # Internationalisation logic
└── media/
    └── icons/          # Favicon and touch icons
```

## Getting Started (Development)

No build step is required. Simply open the project with any static file server.

**Using VS Code Live Server / Five Server:**
1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Five Server** (or Live Server).

**Using Python:**
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080`.

## Server Details

| Address | Purpose |
|---|---|
| `mc.srab.me` | Primary server address |
| `m.srab.me` | Alternative server address |

- **Game version:** Minecraft Java Edition 1.21
- **Mod loader:** Fabric
- **Modpack:** [Google Drive](https://drive.google.com/drive/folders/1u9NXJYVAUF-w15xADOoAKbZRyAuqYbL0?usp=sharing)

## Author

**SRAB** — [GitHub](https://github.com/SRAB-9) · [guns.lol/srab](https://guns.lol/srab)

## License

This project is licensed under the [MIT License](LICENSE).

