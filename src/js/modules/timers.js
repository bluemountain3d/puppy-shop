// Timer map to track multiple timers by name
const timers = {};

/**
 * Starts a customizable timer.
 * @param {string} name - A unique identifier for the timer.
 * @param {number} duration - The duration of the timer in milliseconds.
 * @param {function} onTimeout - The callback function to execute when the timer expires.
 */
export function startTimer(name, duration, onTimeout) {
  // Clear existing timer with the same name if it exists
  if (timers[name]) {
      clearTimeout(timers[name]);
  }

  // Set a new timer
  timers[name] = setTimeout(() => {
      onTimeout();
      delete timers[name]; // Remove the timer reference once it expires
  }, duration);
}

/**
* Stops a specific timer by name.
* @param {string} name - The name of the timer to stop.
*/
export function stopTimer(name) {
  if (timers[name]) {
      clearTimeout(timers[name]);
      delete timers[name]; // Remove the timer reference
  }
}