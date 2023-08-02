const graphDiv = document.getElementById('graphDiv');

const sin = document.getElementById('sin');
const cos = document.getElementById('cos');
const tan = document.getElementById('tan');

const amplitude = document.getElementById('amplitude');
const frequency = document.getElementById('frequency');
const windowSize = document.getElementById('window');

const sinMult = document.getElementById('sin-mult');
const cosMult = document.getElementById('cos-mult');
const tanMult = document.getElementById('tan-mult');

const character = document.getElementById('character');

let selectedFunction = Math.sin;
let amp = 1;
let freq = 2;
let piMult = 3;
let sinNum = 1;
let cosNum = 0;
let tanNum = 0;
let char = '@';

sin.addEventListener('change', handleRadioChange);
cos.addEventListener('change', handleRadioChange);
tan.addEventListener('change', handleRadioChange);

amplitude.addEventListener('change', () => {
  amp = amplitude.value;
});

frequency.addEventListener('change', () => {
  freq = frequency.value;
});

windowSize.addEventListener('change', () => {
  piMult = windowSize.value;
});

sinMult.addEventListener('change', () => {
  sinNum = sinMult.value;
});
cosMult.addEventListener('change', () => {
  cosNum = cosMult.value;
});
tanMult.addEventListener('change', () => {
  tanNum = tanMult.value;
});

character.addEventListener('change', () => {
  let text = character.value;
  console.log(text);
  char = text.charAt(0);
});

function handleRadioChange(event) {
  if (event.target.checked) {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'sin':
        selectedFunction = Math.sin;
        break;
      case 'cos':
        selectedFunction = Math.cos;
        break;
      case 'tan':
        selectedFunction = Math.tan;
        break;
      default:
        break;
    }
  }
}

let width;
let maxCharWidth;
let piWindow;
let xCoordSpacing;

const updateValues = () => {
  width = graphDiv.offsetWidth;
  maxCharWidth = Math.floor(width / 14.56) - 1;
  if(width < 1000){
    piWindow = (piMult / 2) * Math.PI;
  }
  else{
    piWindow = piMult * Math.PI;
  }
  xCoordSpacing = piWindow / maxCharWidth;
}

updateValues();


const sinYIntercept = 1.5;
const graphHeight = 33; //in characters

function generateRandomCharacter() {
  const characters = 'ab';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

const populateDiv = (sinValues) => {
  const yCoordSpacing = (sinYIntercept + 1) / graphHeight;
  let text = "";
  let currentY = sinYIntercept + 1;

  for(let x = 0; x < graphHeight; x++){
    for(let i = 0; i < maxCharWidth; i++){
      if(currentY < sinValues[i]){
        text += char;
      }
      else{
        text += ' ';
      }
    };
    text += '\n';
    currentY -= yCoordSpacing;
  }

  graphDiv.innerHTML = `<pre>${text}</pre>`;

}
const getSinValuesForEachChar = (xOffset) => {
  let sinValues = [];
  let currentX = xCoordSpacing;

  for(let i = 0; i < maxCharWidth; i++){
    sinValues.push((amp * (selectedFunction(freq * (currentX + xOffset))
                        * (sinNum != 0 ? Math.sin(currentX) * sinNum: 1)
                        * (cosNum != 0 ? Math.cos(currentX) * cosNum: 1)
                        * (tanNum != 0 ? Math.tan(currentX) * tanNum: 1)
                        + sinYIntercept)));
    currentX += xCoordSpacing;
  };
  //console.log(width, maxCharWidth, piWindow, xCoordSpacing);
  return sinValues;
}

let x = 0;

const draw = () => {
  updateValues();
  populateDiv(getSinValuesForEachChar(x));
}

const resizeObserver = new ResizeObserver(entries => {
  draw();
});

resizeObserver.observe(graphDiv);

setInterval(() => {
  draw();
  x += 0.05;
}, 50);