const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and it can't be used again, throw it away
        deferredPrompt = null;
        // Hide the install button
        butInstall.style.display = 'none';
    }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed', event);
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
});