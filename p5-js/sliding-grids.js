// don't run animation when off screen
let options = {
  rootMargin: "0px",
  threshold: 0.2,
};

let observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) {
      try {
        noLoop();
      } catch {
        // not much to do yet
      }
      // console.log('exited');
    } else {
      loop();
      // console.log('entered');
    }
}, options);

let target = document.getElementById("sliding-grids-canvas");
observer.observe(target);




const PIXELS = 16;
var RESOLUTION = 128;

var points = [];

function createPoint(x, y, start, end) {
  points.push(
    {
      'x': x,
      'y': y,
      'start' : start,
      'end' : end,
    }
  );
}

function addChar(char, begin, end) {
  switch (char) {
    case '1':
      createPoint(8, 6, begin+1, end+1);
      createPoint(8, 7, begin+1, end+1);
      createPoint(8, 8, begin, end);
      createPoint(8, 9, begin, end);
      createPoint(8, 10, begin, end);
      createPoint(8, 11, begin+1, end+1);
      createPoint(8, 12, begin+1, end+1);
      break;

    case '2':
      createPoint(7, 6, begin+1, end+1);
      createPoint(8, 6, begin+1, end+1);
  
      createPoint(4, 7, begin+1, end+1);
      createPoint(12, 7, begin+1, end+1);
  
      createPoint(13, 8, begin, end);
      createPoint(12, 9, begin, end);
      createPoint(9, 10, begin, end);
      createPoint(7, 11, begin, end);
  
      createPoint(6, 12, begin+1, end+1);
      createPoint(8, 12, begin+1, end+1);
      createPoint(10, 12, begin+1, end+1);
      break;

    case '3':

      createPoint(7, 6, begin+1, end+1);
      createPoint(8, 6, begin+1, end+1);
  
      createPoint(4, 7, begin, end);
      createPoint(12, 7, begin, end);

      createPoint(14, 8, begin, end);
      createPoint(14, 9, begin, end);

      createPoint(4, 10, begin, end);
      createPoint(12, 10, begin, end);

      createPoint(7, 11, begin+1, end+1);
      createPoint(8, 11, begin+1, end+1);
      break;

    case '4':
      
      createPoint(12, 6, begin+1, end+1);
      createPoint(5, 6, begin+1, end+1);
      createPoint(12, 7, begin, end);
      createPoint(5, 7, begin, end);
      createPoint(6, 8, begin, end);
      createPoint(12, 8, begin, end);
      createPoint(12, 9, begin, end);
      createPoint(12, 10, begin+1, end+1);
      createPoint(12, 11, begin+1, end+1);
      break;

    case '5':
      
      createPoint(6, 6, begin+1, end+1);
      createPoint(8, 6, begin+1, end+1);
      createPoint(10, 6, begin+1, end+1);

      createPoint(6, 7, begin, end);
      createPoint(6, 8, begin, end);
      createPoint(10, 9, begin, end);
      createPoint(13, 10, begin, end);

      createPoint(6, 11, begin+1, end+1);
      createPoint(12, 11, begin+1, end+1);

      createPoint(7, 12, begin+1, end+1);
      createPoint(8, 12, begin+1, end+1);
      break;

    case '6':
      createPoint(7, 5, begin+1, end+1);
      createPoint(9, 5, begin+1, end+1);
  
      createPoint(4, 6, begin, end);
      createPoint(4, 7, begin, end);
  
      createPoint(5, 8, begin, end);
      createPoint(7, 8, begin, end);
  
      createPoint(4, 9, begin, end);
      createPoint(12, 9, begin, end);
  
      createPoint(7, 10, begin+1, end+1);
      createPoint(9, 10, begin+1, end+1);
      break;

    case '7':

      createPoint(6, 6, begin+1, end+1);
      createPoint(8, 6, begin+1, end+1);
      createPoint(10, 6, begin+1, end+1);
      
      createPoint(3, 7, begin+1, end+1);
      createPoint(14, 7, begin+1, end+1);
    
      createPoint(16, 8, begin, end);
      createPoint(13, 9, begin, end);
      createPoint(9, 10, begin, end);
      createPoint(8, 11, begin, end);
      createPoint(6, 12, begin+1, end+1);
      createPoint(5, 13, begin+1, end+1);

      break;

    case '8':
      createPoint(7, 6, begin+1, end+1);
      createPoint(9, 6, begin+1, end+1);
  
      createPoint(4, 7, begin, end);
      createPoint(12, 7, begin, end);
  
      createPoint(7, 8, begin, end);
      createPoint(9, 8, begin, end);
  
      createPoint(4, 9, begin, end);
      createPoint(12, 9, begin, end);
  
      createPoint(7, 10, begin+1, end+1);
      createPoint(9, 10, begin+1, end+1);
      break;

    case '9':
  
  
      createPoint(7, 6, begin+1, end+1);
      createPoint(9, 6, begin+1, end+1);

      createPoint(4, 7, begin, end);
      createPoint(12, 7, begin, end);
  
      createPoint(10, 8, begin, end);
      createPoint(8, 8, begin, end);
  

      createPoint(12, 9, begin, end);
      createPoint(12, 10, begin, end);

      createPoint(7, 11, begin+1, end+1);
      createPoint(9, 11, begin+1, end+1);
      break;

    case '0':

      createPoint(7, 6, begin+1, end+1);
      createPoint(9, 6, begin+1, end+1);

      createPoint(4, 7, begin, end);
      createPoint(12, 7, begin, end);

      createPoint(4, 8, begin, end);
      createPoint(12, 8, begin, end);
  
      createPoint(4, 9, begin, end);
      createPoint(12, 9, begin, end);
  
      createPoint(7, 10, begin+1, end+1);
      createPoint(9, 10, begin+1, end+1);

      break;

  }
}


function addMessage(message) {
  cursor = 20;
  
  for (let i=0; i < message.length; i++) {

    addChar(message.charAt(i), cursor, cursor+32);

    cursor += 32;
  }

  FRAMES = (message.length + 1) * 32;
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


var FADE = 7;
var FRAMES = 256;
const SPEED = 1.7;

const POINT_WIDTH = 0.29;
const POINT_HEIGHT = 45;

const small_scale = 1 / 3;
const large_scale = 1 / 10;

var frameOffset = 0;

function pointWeight(center, pos) {
  // gaussian function, with scaling for resolution
  return POINT_HEIGHT * Math.exp(-((center - pos) ** 2) / (2 * POINT_WIDTH)) * (RESOLUTION / 128);
}

function normalizeGaps(list) {
  
  const minVal = list[0];

  let zeroedList = list.map((gap) => (gap - minVal));

  const maxVal = zeroedList[list.length - 1];
  
  let normalizedList = zeroedList.map((gap) => ((gap / maxVal) * RESOLUTION));
  
  return normalizedList;
  
}


function resizeGraphics() {
    // also resize gif
    const gif = document.getElementById('sliding-grids-gif');

    const orientation = document.getOrientation();

    if (orientation == 'portrait') {
        resizeCanvas(window.innerWidth * small_scale, window.innerWidth * small_scale);

        gif.style.width = window.innerWidth * small_scale;
        gif.style.height = window.innerWidth * small_scale;

        RESOLUTION = window.innerWidth * small_scale;
    } else {
        resizeCanvas(window.innerWidth * large_scale, window.innerWidth * large_scale);

        gif.style.width = window.innerWidth * large_scale;
        gif.style.height = window.innerWidth * large_scale;

        RESOLUTION = window.innerWidth * large_scale;
    }
}

// function windowResized() {
//   resizeCanvas();
// }

window.addEventListener('resize', () => {
  resizeGraphics();
});

function updatePattern() {
  points = [];

  update_frame_offset = true;

  let pattern = inputBox.value;

  if (pattern == '') {
    use_random_pattern = true;
  
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 50, 60);
    }
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 120, 130);
    }
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 190, 200);
    }
  
    // FADE = 30;
  
  } else {
  
    use_random_pattern = false;

    addMessage(pattern);
  
  }
}


  
var main_colour = getComputedStyle(document.body).getPropertyValue('--main-colour');
  
var secondary_colour = getComputedStyle(document.body).getPropertyValue('--secondary-colour');

var colour_chosen = false;

const main_colour_choice_wrapper = document.getElementById('colour-picker-wrapper-sliding-grids-main');
const main_colour_choice = document.getElementById('colour-picker-sliding-grids-main');
main_colour_choice.oninput = function () {
  main_colour = main_colour_choice.value;
  colour_chosen = true;
}

const background_colour_choice_wrapper = document.getElementById('colour-picker-wrapper-sliding-grids-background');
const background_colour_choice = document.getElementById('colour-picker-sliding-grids-background');
background_colour_choice.oninput = function () {
  secondary_colour = background_colour_choice.value;
  colour_chosen = true;
}

const inputBox = document.getElementById('sliding-grids-pattern-input');
const playButton = document.getElementById('sliding-grids-play');

inputBox.addEventListener('keypress', (e) => {
  if (e.code == 'Enter') {
    updatePattern();
  }
})

playButton.addEventListener('click', () => {updatePattern()});

var use_random_pattern = false;

var update_frame_offset = false;

updatePattern();

function setup() {

  const canvas = document.getElementById('sliding-grids-canvas');

  const orientation = document.getOrientation();

  if (orientation == 'portrait') {
    createCanvas(window.innerWidth * small_scale, window.innerWidth * small_scale, canvas);
    RESOLUTION = window.innerWidth * small_scale;
  } else {
    createCanvas(window.innerWidth * large_scale, window.innerWidth * large_scale, canvas);
    RESOLUTION = window.innerWidth * large_scale;
  }
  
  resizeGraphics();
  
  frameRate(30);

  noLoop();
  
  // saveGif('sliding-grids', 128, {units: 'frames'});
}

function draw() {
  
  noSmooth();

  if (!colour_chosen) {
    main_colour = getComputedStyle(document.body).getPropertyValue('--main-colour');
  
    main_colour_choice.value = main_colour;

    secondary_colour = getComputedStyle(document.body).getPropertyValue('--secondary-colour');
    
    background_colour_choice.value = secondary_colour;
  }

  main_colour_choice_wrapper.style.background = main_colour;
  background_colour_choice_wrapper.style.background = secondary_colour;

  background(secondary_colour);
  
  stroke(main_colour);
  
  strokeWeight(RESOLUTION / 128);

  if (update_frame_offset) {
    frameOffset = frameCount;
    update_frame_offset = false;
  }
  
  var frame = Math.floor((frameCount - frameOffset) * SPEED) % FRAMES;
  
  if (frame == 0 && use_random_pattern) {
    points = [];
    
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 50, 60);
    }
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 120, 130);
    }
    for (let i=0; i<getRandomInt(1, 4); i++) {
      createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 190, 200);
    }
  }

  
  // draw the basic horizontal grid lines 
  var horizontalGaps = [];
  for (let i=0; i<=PIXELS; i++) {
    horizontalGaps.push(
      ((i / PIXELS) * RESOLUTION) ** 1
    );
  }

  var verticalRows = [];
  
  // draw the basic vertical grid lines
  for (let i=0; i<PIXELS; i++) {
    var verticalGaps = [];
    for (let j=0; j<=PIXELS; j++) {
      verticalGaps.push(
        ((j / PIXELS) * RESOLUTION) ** 1
      );
    }
    verticalRows.push(verticalGaps);
  }
  
  // add points
  for (let point of points) {
    var weight;
    if (frame >= point.start && frame <= point.end) {
      // add full weighting for the point
      weight = 1;
      
    } else if (
      (frame >= (point.start - FADE) && frame <= (point.end + FADE)) 
      // || (frame <= (point.end + FADE) % FRAMES && point.end + FADE >= FRAMES)
      ) {
      
      // give a weighted contribution of the point weighting
      weight = 1 - (
        Math.min(Math.abs(frame - point.start), Math.abs(frame - point.end)) / FADE
      );
      
    } else {
      // no need to calculate any weighting
      continue;
    }
    
    var verticalTotal = 0;
    var horizontalTotal = 0;
    
    for (let i=0; i<=PIXELS; i++) {
      verticalTotal += weight * pointWeight(point.x, i);
      
      verticalRows[point.y - 1][i] += verticalTotal;
      
      horizontalTotal += weight * pointWeight(point.y, i);
      
      horizontalGaps[i] += horizontalTotal;
    }
    
  }
  
  // draw lines
  
  horizontalGaps = normalizeGaps(horizontalGaps);
  
  var prev = -10;
  
  for (let gap of horizontalGaps) {
    // bit of a hack - draw the same line multiple times to make it heavier
    // console.log(Math.round(gap));
    // console.log(prev+1)
    if (Math.round(gap) <= prev+2) {
      continue;
    }
    for (let i=0; i<3; i++) {
      line(0, Math.round(gap), RESOLUTION, Math.round(gap));
      prev = Math.round(gap);
    }
  }
  
  for (let i=0; i<PIXELS; i++) {
    let verticalGaps = normalizeGaps(verticalRows[i]);
  
    for (let gap of verticalGaps) {
      for (let j=0; j<3; j++) {
        line(Math.round(gap), Math.round(horizontalGaps[i]), Math.round(gap), Math.round(horizontalGaps[i+1]));
      }
    }
  }
  
  
}