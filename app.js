const soundID = 'Bop';
let mole;
let stage;
let lastTime = 0;
let score = 0;
let interval = 1000;

function init() {
  stage = new createjs.Stage('game-canvas');

  // mole = createMole('hard');
  startGame();
}

function bopMole() {
  score++;
  createjs.Sound.play(soundID);
  updateScore(score);
  randomizeMole();
  lastTime = createjs.Ticker.getTime();
  stage.update();
}

function updateScore(score) {
  document.getElementById('score').innerText = score;
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
      interval = 500;
      break;
    default:
      interval = 1000;
  }
  score = 0;
  updateScore(score);
  mole.x = stage.canvas.width / 2;
  mole.y = stage.canvas.height / 2;
  mole.scale = .5;

  mole.addEventListener('click', bopMole);

  stage.addChild(mole);

  createjs.Ticker.addEventListener("tick", handleTick);
}

function setDifficulty(event) {
  console.log(event);
  const { target: { value } } = event;
  stage.removeChild(mole);
  startGame(value);
}

function loadSound() {
  createjs.Sound.registerSound("./bop.mp3", soundID);
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