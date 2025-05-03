let deferredPrompt;
const banner = document.getElementById('installBanner');
const installBtn = document.getElementById('installButton');
const closeBtn = document.getElementById('closeBanner');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (!isStandalone) {
        banner.style.display = 'block';
    }
});

installBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
        });
    }
});

closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    banner.style.display = 'none';
});
