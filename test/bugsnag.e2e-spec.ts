import { Test } from '@nestjs/testing';
import { BugsnagModule } from '../src/bugsnag.module';
import { BugsnagService } from '../src/bugsnag.service';

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
