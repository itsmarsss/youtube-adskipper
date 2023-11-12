const toggle_button = document.getElementById('toggle-button');
const toggle_button_icon = document.getElementById('toggle-button-icon');
const toggle_text = document.getElementById('toggle-text');

toggle_button.addEventListener('click', () => {
    toggle_button_icon.classList.add('fade-out');
    setTimeout(() => {
        console.log(toggle_button_icon.innerHTML);
        if (toggle_button_icon.innerHTML === 'pause_circle') {
            toggle_button_icon.innerHTML = 'play_circle';
            toggle_text.innerHTML = 'disabled';
        } else {
            toggle_button_icon.innerHTML = 'pause_circle';
            toggle_text.innerHTML = 'enabled';
        }
        toggle_button_icon.classList.remove('fade-out');
        toggle_text.classList.toggle('toggled-on');
    }, 200);
});