const graphDiv = document.getElementById('graphDiv');

const populateDiv = (element) => {
  const width = element.offsetWidth;
  const maxCharWidth = Math.floor(width / 14.56);

  let text = "";

  for(let i = 0; i < maxCharWidth; i++){
    text += 'a'
  };
  element.textContent = text;
}

const resizeObserver = new ResizeObserver(entries => {
  populateDiv(graphDiv);
});

resizeObserver.observe(graphDiv);

populateDiv(graphDiv);

