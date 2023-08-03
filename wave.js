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
const speed = document.getElementById('speed');

let selectedFunction = Math.sin;
let amp = 1;
let freq = 2;
let piMult = 3;
let sinNum = 1;
let cosNum = 0;
let tanNum = 0;
let cycleNumber = 200;
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
speed.addEventListener('change', () => {
  cycleNumber = speed.value;
  console.log(cycleNumber)
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


const sinYIntercept = 1.25;
let graphHeight = 34; //in characters

let width;
let maxCharWidth;
let piWindow;
let xCoordSpacing;
let cycleInterval;
width = graphDiv.offsetWidth;
  maxCharWidth = Math.floor(width / 14.56);
  if(width < 800){
    graphHeight = 28
    piWindow = (piMult / 2) * Math.PI;
  }
  else{
    graphHeight = 34;
    piWindow = piMult * Math.PI;
  }
const updateValuesOnResize = () => {
  width = graphDiv.offsetWidth;
  maxCharWidth = Math.floor(width / 14.56);
  if(width < 800){
    graphHeight = 28
    piWindow = (piMult / 2) * Math.PI;
  }
  else{
    graphHeight = 34;
    piWindow = piMult * Math.PI;
  }
}
const updateValuesOnRender = () => {
  xCoordSpacing = piWindow / maxCharWidth;
  cycleInterval = piWindow / cycleNumber;
}

updateValuesOnResize();
updateValuesOnRender();


const populateDiv = (waveValues) => {
  const yCoordSpacing = (sinYIntercept + 1) / graphHeight;
  let text = "";
  let currentY = sinYIntercept + 1;

  for(let x = 0; x < graphHeight; x++){
    for(let i = 0; i < maxCharWidth; i++){
      if(currentY < waveValues[i]){
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
const getwaveValuesForEachChar = (xOffset) => {
  let waveValues = [];
  let currentX = xCoordSpacing;

  for(let i = 0; i < maxCharWidth; i++){
    waveValues.push((amp * (selectedFunction(freq * (currentX + xOffset))
                        * (sinNum != 0 ? Math.sin(currentX) * sinNum: 1)
                        * (cosNum != 0 ? Math.cos(currentX) * cosNum: 1)
                        * (tanNum != 0 ? Math.tan(currentX) * tanNum: 1)
                        + sinYIntercept)));
    currentX += xCoordSpacing;
  };
  //console.log(width, maxCharWidth, piWindow, xCoordSpacing);
  return waveValues;
}

const draw = () => {
  updateValuesOnRender();
  populateDiv(getwaveValuesForEachChar(x));
}

const resizeObserver = new ResizeObserver(entries => {
  updateValuesOnRender();
  draw();
});

resizeObserver.observe(graphDiv);


let x = 0;
setInterval(() => {
  draw();
  x += cycleInterval;
  if(x >= 200){
    x = 0;
  }
}, 50);