
        const modal = document.getElementById('installation-modal');
        const btn = document.getElementById('install-btn');
        const span = document.getElementsByClassName('close')[0];
        const output = document.getElementById('installation-output');

        btn.onclick = function() {
            modal.style.display = 'block';
            simulateInstallation();
        }

        span.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        function simulateInstallation() {
            const commands = [
                'sudo apt install nodejs',
                'git clone https://github.com/amatak-org/kpanel_fresh.git',
                'cd kpanel_fresh',
                'node install.js'
            ];

            let i = 0;
            function runCommand() {
                if (i < commands.length) {
                    output.innerHTML += `$ ${commands[i]}\n`;
                    output.innerHTML += `Running command...\n\n`;
                    output.scrollTop = output.scrollHeight;
                    i++;
                    setTimeout(runCommand, 2000);
                } else {
                    output.innerHTML += 'Installation complete!\n';
                }
            }

            runCommand();
        }
    
