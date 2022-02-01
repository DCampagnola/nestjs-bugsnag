import { DynamicModule, Module } from '@nestjs/common';
import BugsnagService from './bugsnag.service';
import bugsnag from '@bugsnag/js';
import { Config } from '@bugsnag/js';

@Module({})
export default class BugsnagModule {
  static forRoot(options: Config): DynamicModule {
    const bugsnagService = {
      provide: BugsnagService,
      useValue: bugsnag.start(options),
    };
    return {
      module: BugsnagModule,
      providers: [
        {
          provide: 'BugsnagOptions',
          useValue: options,
        },
        bugsnagService,
      ],
      exports: [bugsnagService],
    };
  }
}
