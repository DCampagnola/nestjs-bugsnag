import { Test } from '@nestjs/testing';
import { BugsnagModule } from '../src/bugsnag.module';
import { BugsnagService } from '../src/bugsnag.service';
import bugsnag, { Config } from '@bugsnag/js';

jest.mock('@bugsnag/js');

describe('Bugsnag async (e2e)', () => {
  it('it should notify an error with an injected module', async () => {
    class TestModule {}

    class TestProvider {
      value = 'test';
    }

    const testProvider = {
      provide: TestProvider,
      useFactory: () => new TestProvider(),
    };
    const moduleFixture = await Test.createTestingModule({
      imports: [
        BugsnagModule.forRootAsync({
          imports: [
            {
              module: TestModule,
              exports: [testProvider],
              providers: [testProvider],
            },
          ],
          useFactory: (testProvider: TestProvider) => ({
            apiKey: testProvider.value,
            appVersion: '10',
          }),
          inject: [TestProvider],
        }),
      ],
    }).compile();
    await moduleFixture.init();
    const config: Partial<Config> = {
      apiKey: 'test',
      appVersion: '10',
    };
    expect(bugsnag.start).toBeCalledWith(config);
  });
});
