const nameInput = document.querySelector('.player-name-input');
const form = document.querySelector('.login-form');
const playButton = document.querySelector('.play-btn');

const validateName = (ev) => {
  if (ev.target.value.length >= 2){
    playButton.removeAttribute('disabled')
    return
  }
  playButton.setAttribute('disabled', '')
}

const handleSubmit = (ev) => {
  ev.preventDefault()
  localStorage.setItem('playerName', nameInput.value);
  window.location = './assets/pages/game.html';
}

nameInput.addEventListener('input', validateName)
form.addEventListener('submit', handleSubmit)