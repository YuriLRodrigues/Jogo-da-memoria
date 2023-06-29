const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
]

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const allCardsDisabled = document.querySelectorAll('.disabled-card')
  if (allCardsDisabled.length === (characters.length * 2)){
    alert('Parabéns, você venceu o game em ' + timer.textContent + ' segundos')
    clearInterval(this.loop);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');
  if (firstCharacter === secondCharacter){
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')
      firstCard = ''
      secondCard = ''
    }, 500)
  }
  
}

const revealCard = (ev) => {
  if (ev.target.parentNode.className.includes('reveal-card')){
    return
  }

  if (firstCard === ''){
    ev.target.parentNode.classList.add('reveal-card')
    firstCard = ev.target.parentNode
    
  } else if (secondCard === '') {
    ev.target.parentNode.classList.add('reveal-card')
    secondCard = ev.target.parentNode
    checkCards();
  }
}

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');
  
  front.style.backgroundImage = `url(../img/${character}.png)`
  card.setAttribute('data-character', character)

  card.append(front, back);
  
  card.addEventListener('click', revealCard)
  
  return card
}

const loadGame = () => {
  
  const duplicatedCharacters = [...characters, ...characters]
  const shuffledCharacters = duplicatedCharacters.sort(()=>Math.random() - 0.5)

  shuffledCharacters.forEach((character)=>{
    const card = createCard(character)
    grid.appendChild(card);
  })
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  let playerName = document.querySelector('.playerName');
  playerName.textContent = localStorage.getItem('playerName')
  
  loadGame();
  startTimer();
}
