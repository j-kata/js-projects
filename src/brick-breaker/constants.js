const canvas = document.getElementById('canvas');
export const WIDTH = canvas.width;
export const HEIGHT = canvas.height;

export const ROWS_INIT = 3;
export const SPACE = 5;

export const BRICK_WIDTH = 60;
export const BRICK_HEIGHT = 20;

export const SPACED_BRICK_WIDTH = BRICK_WIDTH + SPACE;
export const SPACED_BRICK_HEIGHT = BRICK_HEIGHT + SPACE;

export const BRICKS_MAX = Math.floor(WIDTH / SPACED_BRICK_WIDTH);
export const OFFSET = Math.round((WIDTH - BRICKS_MAX * SPACED_BRICK_WIDTH) / 2);

export const LEVEL = { LIGHT: 0, MIDDLE: 1, STRONG: 2 };
export const COLORS = { 0: '#fdd835', 1: '#fb8c00', 2: '#ff5050' };
