const PIXELS = 16;
var RESOLUTION = 128;

var points = [];

createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 50, 60);
createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 120, 130);
createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 190, 200);

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

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

// // 1
// createPoint(8, 6, 20, 52);
// createPoint(8, 7, 20, 52);
// createPoint(8, 8, 19, 52);
// createPoint(8, 9, 19, 52);
// createPoint(8, 10, 19, 52);
// createPoint(8, 11, 20, 52);
// createPoint(8, 12, 20, 52);


// // 2
// createPoint(7, 6, 52, 84);
// createPoint(8, 6, 52, 84);

// createPoint(4, 7, 52, 84);
// createPoint(12, 7, 52, 84);

// createPoint(13, 8, 52, 84);
// createPoint(12, 9, 52, 84);
// createPoint(9, 10, 52, 84);
// createPoint(7, 11, 52, 84);

// createPoint(6, 12, 52, 84);
// createPoint(8, 12, 52, 84);
// createPoint(10, 12, 52, 84);


// // 8
// createPoint(7, 6, 84, 118);
// createPoint(9, 6, 84, 118);

// createPoint(4, 7, 84, 117);
// createPoint(12, 7, 84, 117);

// createPoint(7, 8, 84, 116);
// createPoint(9, 8, 84, 116);

// createPoint(4, 9, 84, 117);
// createPoint(12, 9, 84, 117);

// createPoint(7, 10, 84, 118);
// createPoint(9, 10, 84, 118);

const FADE = 30;
const FRAMES = 256;
const SPEED = 1;

const POINT_WIDTH = 0.29;
const POINT_HEIGHT = 45;

const small_scale = 1 / 3;
const large_scale = 1 / 10;

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

function windowResized() {
    const orientation = document.getOrientation();


    if (orientation == 'portrait') {
        resizeCanvas(window.innerWidth * small_scale, window.innerWidth * small_scale);
        RESOLUTION = window.innerWidth * small_scale;
    } else {
        resizeCanvas(window.innerWidth * large_scale, window.innerWidth * large_scale);
        RESOLUTION = window.innerWidth * large_scale;
    }



}

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
  
  
  frameRate(60);

  console.log('p5 script ran');
  
  // saveGif('sliding-grids', 128, {units: 'frames'});
}

function draw() {
  
  noSmooth();




  
  const main_colour = getComputedStyle(document.body).getPropertyValue('--main-colour');
  
  const secondary_colour = getComputedStyle(document.body).getPropertyValue('--secondary-colour');

  background(secondary_colour);
  
  stroke(main_colour);
  
  strokeWeight(RESOLUTION / 128);
  
  var frame = Math.floor(frameCount * SPEED) % FRAMES;
  
  if (frame == 0) {
    points = [];
  
    createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 50, 60);
    createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 120, 130);
    createPoint(getRandomInt(1, PIXELS+1), getRandomInt(1, PIXELS+1), 190, 200);
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
    for (let i=0; i<10; i++) {
      line(0, Math.round(gap), RESOLUTION, Math.round(gap));
      prev = Math.round(gap);
    }
  }
  
  for (let i=0; i<PIXELS; i++) {
    let verticalGaps = normalizeGaps(verticalRows[i]);
  
    for (let gap of verticalGaps) {
      for (let j=0; j<10; j++) {
        line(Math.round(gap), Math.round(horizontalGaps[i]), Math.round(gap), Math.round(horizontalGaps[i+1]));
      }
    }
  }
  
  
}