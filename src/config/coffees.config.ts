import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  foo: 'bar',
  promo: {
    cod: 20,
    msg: 'First visit',
  },
}));
