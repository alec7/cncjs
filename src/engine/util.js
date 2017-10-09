/*!
 * cncjs
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 */

/**
 * Loads an image
 * @param {String} src Image URI
 * @return {Promise<Image, Error>}
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

/**
 * Get a random whole number
 * @param {Number} [min=0] Minimum
 * @param {Number} [max=Number.MAX_VALUE] Maximum
 * @return {Number}
 */
export function randomInteger(min = 0, max = Number.MAX_VALUE) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Get a parameter from query string
 * @param {String} [q] parameter to extract
 * @param {String} [search] string to use
 * @return {String}
 */
export function queryParameter(q, search) {
  search = search || window.location.search;

  let hashes = search.slice(search.indexOf('?') + 1).split('&');
  const result = hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=');
    return Object.assign(params, {[key]: decodeURIComponent(val)});
  }, {});

  return q ? result[q] : result;
}

/**
 * Copies a 2D array
 * @param {Array} arr Array
 * @return {Array}
 */
export function copy(arr) {
  return arr.map((a) => a.slice(0));
}

/**
 * Draws text over multiple lines
 * @param {CanvasRenderingContext2D} target Render context
 * @param {String[]} text Text
 * @param {Object} options Options
 * @param {Number} [options.top=0] Top position
 * @param {Number} [options.lineHeight=10] Line height
 * @param {String} [options.font=monospace] Font name
 * @param {String} [options.fillStyle=black] Fill style
 */
export function drawText(target, text, options) {
  if ( !(text instanceof Array) ) {
    text = [text];
  }

  options = Object.assign({}, {
    top: 0,
    lineHeight: 10,
    font: '12px monospace',
    fillStyle: '#000000'
  }, options || {});

  target.font = options.font;
  target.fillStyle = options.fillStyle;

  for ( let i = 0; i < text.length; i++ ) {
    target.fillText(text[i], 4, options.top + (i * options.lineHeight));
  }
}

/**
 * Sorts an array of objects
 * @param {Array} arr Array
 * @param {String} key Key
 */
export function sort(arr, key) {
  arr.sort((a, b) => {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  });
}
