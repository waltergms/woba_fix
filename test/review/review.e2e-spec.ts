import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as mockResponse from './mock.response.json';

describe('Review', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET review`, async () => {
    const result = await request(app.getHttpServer()).get(
      '/review?start_date=01%2F08%2F2022&end_date=31%2F08%2F2022&rating_min=0&rating_max=5&street=Broad&category=Delivery&state=OH',
    );
    expect(result.statusCode).toBe(200);
    expect(result.body.data).toEqual(mockResponse.data);
  });

  afterAll(async () => {
    await app.close();
  });
});
