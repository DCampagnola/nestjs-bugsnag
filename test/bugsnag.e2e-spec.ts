import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import BugsnagModule from '../src/bugsnag.module';
import BugsnagService from '../src/bugsnag.service';

describe('Bugsnag (e2e)', () => {
  let bugsnagService: BugsnagService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        BugsnagModule.forRoot({
          apiKey: 'test-key',
        }),
      ],
    }).compile();
    bugsnagService = moduleFixture.get(BugsnagService);
    await moduleFixture.init();
  });

  it('it should notify an error', () => {
    bugsnagService.notify(new Error());
  });
});
