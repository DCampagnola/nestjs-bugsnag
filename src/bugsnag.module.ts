import {
  DynamicModule,
  FactoryProvider,
  Module,
  Provider,
} from '@nestjs/common';
import { BugsnagService } from './bugsnag.service';
import bugsnag from '@bugsnag/js';
import { Config } from '@bugsnag/js';

@Module({})
export class BugsnagModule {
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

  static forRootAsync(options: AsyncFactoryProvider<Config>): DynamicModule {
    const bugsnagService: Provider = {
      provide: BugsnagService,
      useFactory: (bugsnagOptions: Config) => bugsnag.start(bugsnagOptions),
      inject: ['BugsnagOptions'],
    };
    return {
      module: BugsnagModule,
      providers: [
        {
          provide: 'BugsnagOptions',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        bugsnagService,
      ],
      exports: [bugsnagService],
    };
  }
}

export type AsyncFactoryProvider<T> = Pick<
  FactoryProvider<T>,
  'useFactory' | 'inject'
>;
