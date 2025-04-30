const keysPressed = {};
const acceptedCodes = ['ArrowLeft', 'ArrowRight'];

function handleKey(pressed, event) {
  if (!acceptedCodes.includes(event.code)) return;

  keysPressed[event.code] = pressed;
}

export const handleKeyDown = (event) => handleKey(true, event);
export const handleKeyUp = (event) => handleKey(false, event);
export const leftArrowPressed = () => keysPressed['ArrowLeft'];
export const rightArrowPressed = () => keysPressed['ArrowRight'];
