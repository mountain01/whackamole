function init() {
  const stage = new createjs.Stage('game-canvas');

  const mole = createMole('hard');
  mole.x = stage.canvas.width/2;;
  mole.y = stage.canvas.height/2;
  mole.scale = 3;

  stage.addChild(mole);

  stage.update();
}

function createMole(level){
  const mole = new createjs.Container();

  let headColor, eyeColor, noseColor, mouthColor, pupilColor;

  switch(level){
    case 'hard':
      headColor = 'black';
      eyeColor = 'yellow';
      noseColor = 'green';
      mouthColor = 'red';
      pupilColor = 'blue';
      break;
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
  mouth.scale=.5;
  mouth.y=22;
  mouth.x = -12.5;

  mole.addChild(head, eyes, nose, mouth);


  return mole;
}

function createMouth(color){
  const mouth = new createjs.Shape();
  mouth.graphics.beginFill(color).drawEllipse(0,0,50,35);
  return mouth;
}

function createNose(color) {
  const nose = new createjs.Shape();
  nose.graphics.beginFill(color).drawCircle(0,0,50);
  return nose;
}

function createHead(color){
  const head = new createjs.Shape();
  head.graphics.beginFill(color).drawCircle(0,0,50);
  return head;
}
function createEyes(color,pupil){
  const eyes = new createjs.Container();
  const eye1 = createEye(color, pupil);
  const eye2 = createEye(color, pupil);
  eye2.x = 150;

  eyes.addChild(eye1,eye2);

  return eyes;
}

function createEye(color,pupil){
  const eye = new createjs.Container();
  const part1 = new createjs.Shape();
  part1.graphics.beginFill(color).drawCircle(0,0,50);
  const part2 = new createjs.Shape();
  part2.graphics.beginFill(pupil).drawCircle(0,0,50);
  part2.scale = .5;
  eye.addChild(part1);
  eye.addChild(part2);
  return eye;
}