export const clamp = (num, val1, val2) => Math.min(Math.max(num, val1), val2);
export const lerp = (a, b, t) => a + (b - a) * t;
