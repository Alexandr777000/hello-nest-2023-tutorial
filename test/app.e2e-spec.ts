import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('GET', function () {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST 201', function () {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'карты деньги...',
          year: 1998,
          genres: ['криминал'],
        })
        .expect(201);
    });

    it('POST 400', function () {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'карты деньги...',
          year: 1998,
          genres: ['криминал'],
        })
        .expect(400);
    });

    it('DELETE 404', function () {
      return request(app.getHttpServer()).delete('movies').expect(404);
    });
  });

  describe('/movies:id', () => {
    it('GET 200', function () {
      return request(app.getHttpServer()).get('movies/1').expect(200);
    });

    it('GET 404', function () {
      return request(app.getHttpServer()).get('movies/999999666').expect(404);
    });

    it('PATCH 200', function () {
      return request(app.getHttpServer()).patch('movies/1').expect(200);
    });

    it('DELETE 200', function () {
      return request(app.getHttpServer()).delete('movies/1').expect(200);
    });
  });

});