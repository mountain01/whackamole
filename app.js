const LEVEL_INCEMENT = 10;
const SOUND_IDS = {
  bop: 'Bop',
  levelup: 'LevelUp'
};

let mole;
let stage;
let lastTime = 0;
let score = 0;
let level = 0
let interval = 1000;
let diff = 'medium';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'anS4FIA1F3Q',
  });
}


function init() {
  stage = new createjs.Stage('game-canvas');

  // mole = createMole('hard');
  startGame();
}

function bopMole() {
  score++;
  createjs.Sound.play(SOUND_IDS.bop);
  // If new level
  if ((score % LEVEL_INCEMENT) === 0) {
    level++;
    updateLevel(level);
    createjs.Sound.play(SOUND_IDS.levelup);
  }
  updateScore(score);
  randomizeMole();
  lastTime = createjs.Ticker.getTime();
  stage.update();
}

function updateScore(score) {
  document.getElementById('score').innerText = score;
}

function updateLevel(level) {
  document.getElementById('level').innerText = level;
  switch(diff){
    case 'hard':
      if(level == 2) {
        showSecret();
      }
      break;
    case 'medium':
      if(level == 4) {
        showSecret();
      }
      break;
    case 'easy':
      if(level == 6) {
        showSecret();
      }
      break;
  }
}

function showSecret(){
  document.querySelector('.secret-ending').style.display = 'flex';
  document.querySelector('.game-play').style.visibility = 'hidden';
  stage.removeChild(mole);
  player.playVideo();
}

function resetGame() {
  player.stopVideo();
  document.querySelector('.secret-ending').style.display = 'none';
  document.querySelector('.game-play').style.visibility = 'visible';
  startGame(diff);
}

function randomizeMole() {
  mole.x = Math.floor(Math.random() * (stage.canvas.width - 50)) + 25;
  mole.y = Math.floor(Math.random() * (stage.canvas.height - 50)) + 25;
}

function handleTick() {
  const time = createjs.Ticker.getTime();
  if (time - lastTime > interval) {
    lastTime = time;
    randomizeMole();
    stage.update();
  }
}

function startGame(difficulty) {
  mole = createMole(difficulty);
  switch (difficulty) {
    case 'easy':
      interval = 1500;
      break;
    case 'medium':
      interval = 1000;
      break;
    case 'hard':
      interval = 750;
      break;
    default:
      interval = 1000;
  }
  score = 0;
  level = 0;
  updateScore(score);
  updateLevel(level);
  mole.x = stage.canvas.width / 2;
  mole.y = stage.canvas.height / 2;
  mole.scale = .5;

  mole.addEventListener('click', bopMole);

  stage.addChild(mole);

  stage.update();

  createjs.Ticker.addEventListener("tick", handleTick);
}

function setDifficulty(event) {
  console.log(event);
  const { target: { value } } = event;
  stage.removeChild(mole);
  startGame(value);
  diff = value;
}

function loadSound() {
  createjs.Sound.registerSound("./bop.mp3", SOUND_IDS.bop);
  createjs.Sound.registerSound("./levelup.mp3", SOUND_IDS.levelup);
}


function createMole(level) {
  const mole = new createjs.Container();

  let headColor, eyeColor, noseColor, mouthColor, pupilColor;

  switch (level) {
    case 'easy':
      headColor = 'yellow';
      eyeColor = 'blue';
      noseColor = 'red';
      mouthColor = 'black';
      pupilColor = 'green';
      break;
    case 'hard':
      headColor = 'black';
      eyeColor = 'yellow';
      noseColor = 'green';
      mouthColor = 'red';
      pupilColor = 'blue';
      break;
    case 'medium':
    default:
      headColor = 'brown';
      eyeColor = 'white';
      noseColor = 'red';
      mouthColor = 'black';
      pupilColor = 'black';
  }

  const head = createHead(headColor);
  const eyes = createEyes(eyeColor, pupilColor);
  eyes.scale = .3;
  eyes.x = -22;
  eyes.y = -15;
  const nose = createNose(noseColor);
  nose.scale = .15;
  nose.y = 10;

  const mouth = createMouth(mouthColor);
  mouth.scale = .5;
  mouth.y = 22;
  mouth.x = -12.5;

  mole.addChild(head, eyes, nose, mouth);


  return mole;
}

function createMouth(color) {
  const mouth = new createjs.Shape();
  mouth.graphics.beginFill(color).drawEllipse(0, 0, 50, 35);
  return mouth;
}

function createNose(color) {
  const nose = new createjs.Shape();
  nose.graphics.beginFill(color).drawCircle(0, 0, 50);
  return nose;
}

function createHead(color) {
  const head = new createjs.Shape();
  head.graphics.beginFill(color).drawCircle(0, 0, 50);
  return head;
}

function createEyes(color, pupil) {
  const eyes = new createjs.Container();
  const eye1 = createEye(color, pupil);
  const eye2 = createEye(color, pupil);
  eye2.x = 150;

  eyes.addChild(eye1, eye2);

  return eyes;
}

function createEye(color, pupil) {
  const eye = new createjs.Container();
  const part1 = new createjs.Shape();
  part1.graphics.beginFill(color).drawCircle(0, 0, 50);
  const part2 = new createjs.Shape();
  part2.graphics.beginFill(pupil).drawCircle(0, 0, 50);
  part2.scale = .5;
  eye.addChild(part1);
  eye.addChild(part2);
  return eye;
}
