import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Americano',
    brand: 'Nescafe',
    flavors: ['cream'],
  };
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', async () => {
    const resp = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee);

    expect(resp.status).toBe(HttpStatus.CREATED);
    expect(resp.body.id).toBeDefined();
    expect(resp.body.name).toBe(coffee.name);
    expect(resp.body.brand).toBe(coffee.brand);
    expect(resp.body.flavors).toHaveLength(1);
  });

  it('Get all [GET /]', async () => {
    const resp = await request(app.getHttpServer()).get('/coffees');

    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.length).toBeDefined();
  });

  it('Get one [GET /:id]', async () => {
    const createdCoffeeResp = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee);
    const createdCoffee = createdCoffeeResp.body;

    const resp = await request(app.getHttpServer()).get(
      `/coffees/${createdCoffee.id}`,
    );

    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body).toEqual(createdCoffee);
  });

  it('Update [PATCH /:id]', async () => {
    const newName = 'New Americano';
    const newFlavors = ['cream', 'chocolate'];
    const createdCoffeeResp = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee);
    const createdCoffee = createdCoffeeResp.body;

    const resp = await request(app.getHttpServer())
      .patch(`/coffees/${createdCoffee.id}`)
      .send({ name: newName, flavors: newFlavors });

    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body.id).toBe(createdCoffee.id);
    expect(resp.body.name).toBe(newName);
    expect(resp.body.brand).toBe(coffee.brand);
    expect(resp.body.flavors).toHaveLength(2);
  });

  it('Delete [DELETE /:id]', async () => {
    const createdCoffeeResp = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee);
    const { id, ...createdCoffeeRest } = createdCoffeeResp.body;

    const resp = await request(app.getHttpServer()).delete(`/coffees/${id}`);

    expect(resp.status).toBe(HttpStatus.OK);
    expect(resp.body).toEqual(createdCoffeeRest);
  });

  afterAll(async () => {
    await app.close();
  });
});
