const graphDiv = document.getElementById('graphDiv');

let width = graphDiv.offsetWidth;
let maxCharWidth = Math.floor(width / 14.56);
let piWindow = (width / 300) * Math.PI;
let xCoordSpacing = piWindow / maxCharWidth;

const char = '@';
const sinYIntercept = 1.5;
const graphHeight = 30; //in characters

function generateRandomCharacter() {
  const characters = 'ab';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

const updateValues = () => {
  width = graphDiv.offsetWidth;
  maxCharWidth = Math.floor(width / 14.56);
  piWindow = (width / 600) * Math.PI;
  xCoordSpacing = piWindow / maxCharWidth;
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

const getSinValuesForEachChar = (xOffset, freq = 1, amp = 1) => {
  let sinValues = [];
  let currentX = xCoordSpacing;
  for(let i = 0; i < maxCharWidth; i++){
    sinValues.push((amp * (Math.sin(freq * (currentX + xOffset)) + sinYIntercept)));
    currentX += xCoordSpacing;
  };
  //console.log(width, maxCharWidth, piWindow, xCoordSpacing);
  return sinValues;
}

let x = 0;

const resizeObserver = new ResizeObserver(entries => {
  updateValues();
  populateDiv(getSinValuesForEachChar(x));
});

resizeObserver.observe(graphDiv);


  setInterval(() => {
    console.log('hi')
    updateValues();
    populateDiv(getSinValuesForEachChar(x));
    x += 0.1;
  }, 100);