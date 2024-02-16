const panel = document.getElementById('panel');
const toggle_button = document.getElementById('toggle-button');
const toggle_button_icon = document.getElementById('toggle-button-icon');
const toggle_text = document.getElementById('toggle-text');
const skip_count = document.getElementById('skip-count');

var skipper_enabled = false;

toggle_button.addEventListener('click', () => {
    toggle_button_icon.classList.add('fade-out');
    setTimeout(() => {
        if (skipper_enabled) {
            toggle_button_icon.innerHTML = 'play_circle';
            toggle_text.innerHTML = 'disabled';
        } else {
            toggle_button_icon.innerHTML = 'pause_circle';
            toggle_text.innerHTML = 'enabled';
        }
        toggle_button_icon.classList.remove('fade-out');
        panel.classList.toggle('toggled-on');
        toggle_text.classList.toggle('toggled-on');

        skipper_enabled = !skipper_enabled;

        setEnabled(skipper_enabled);
    }, 200);

    skip_count.classList.toggle("count-ready");
});

getEnabled();

chrome.storage.local.get(['skipped'], function (result) {
    var skipped = result.skipped || 0;
    animateNumber(skipped, 1000);
});

function animateNumber(targetNumber, duration) {
    const startNumber = 0;
    const increment = 1;
    const delay = Math.max(Math.floor(duration / (targetNumber / increment)), 1);

    function updateNumber(currentNumber) {
        skip_count.textContent = currentNumber;
    }

    function animate() {
        for (let i = startNumber; i <= targetNumber; i += increment) {
            setTimeout(() => {
                updateNumber(i);
            }, i * delay);
        }
    }

    animate();
}

function getEnabled() {
    chrome.storage.local.get(['enabled'], function (result) {
        var enabled = result.enabled || false;
        if (enabled) {
            toggle_button.click();
        }
    });
}

function setEnabled(value) {
    chrome.storage.local.set({ enabled: value }, function () { });
}