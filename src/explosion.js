import { Particle } from './particle';

export function createExplosion({ x, y }) {
  const count = Math.round(5 + Math.random() * 5);
  const particles = [];
  for (let i = 0; i <= count; i++) {
    particles.push(Particle.create(x, y));
  }
  return particles;
}
