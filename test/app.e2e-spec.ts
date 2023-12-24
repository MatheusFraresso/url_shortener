import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/routes')
      .send({ long_url: 'https://stackoverflow.com/' })
      .expect(HttpStatus.CREATED);
  });
  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/routes')
      .send({ long_url: 'https://www.npmjs.com/' })
      .expect(HttpStatus.CREATED);
  });
  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/routes')
      .send({ long_url: 'https://fdsfdafdsa.com/' })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/routes')
      .send({ long_url: 'https://google.com/' })
      .expect(HttpStatus.CREATED);
  });
  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/routes')
      .send({ long_url: 'https://stackoverflow.com/' })
      .expect(HttpStatus.CONFLICT);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/routes/1')
      .expect(HttpStatus.FOUND);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/routes/2')
      .expect(HttpStatus.FOUND);
  });
});
