const SERVER_IP = "mc.srab.me";

        async function fetchServerStatus() {
            try {
                const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
                const data = await response.json();
                
                const isOnline = data.online || false;
                const statusDot = document.getElementById('statusDot');
                const statusText = document.getElementById('statusText');
                const playerCount = document.getElementById('playerCount');
                const serverVersion = document.getElementById('serverVersion');
                const errorMessage = document.getElementById('errorMessage');
                const motdBox = document.getElementById('motdBox');
                const motdText = document.getElementById('motdText');

                // Update status
                if (isOnline) {
                    statusDot.className = 'mc-status-dot online';
                    statusText.className = 'mc-status-text online';
                    statusText.textContent = 'Online';
                } else {
                    statusDot.className = 'mc-status-dot offline';
                    statusText.className = 'mc-status-text offline';
                    statusText.textContent = 'Offline';
                }

                // Update player count
                const players = data.players || { online: 0, max: 0 };
                playerCount.textContent = `${players.online} / ${players.max}`;

                // Update version
                if (data.version) {
                    serverVersion.textContent = data.version;
                }

                // Update MOTD
                if (data.motd && data.motd.clean) {
                    motdBox.style.display = 'block';
                    motdText.textContent = data.motd.clean.join('\n');
                }

                // Hide error
                errorMessage.style.display = 'none';
            } catch (error) {
                document.getElementById('errorMessage').style.display = 'flex';
                document.getElementById('errorText').textContent = 'Failed to fetch server status';
            }
        }

        function copyIP(ipAddress, button) {
            navigator.clipboard.writeText(ipAddress);
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }

        // Event listeners for copy buttons
        document.addEventListener('DOMContentLoaded', function() {
            const copyButtons = document.querySelectorAll('.mc-copy-btn');
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const ipAddress = this.dataset.ip;
                    copyIP(ipAddress, this);
                });
            });
        });

        // Fetch status on load and every 30 seconds
        fetchServerStatus();
        setInterval(fetchServerStatus, 30000);