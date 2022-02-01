<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Bugsnag](https://github.com/bugsnag/bugsnag-js) module for [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install --save nestjs-bugsnag @bugsnag/js
```

## Usage

In the root of your project:

```typescript
import { BugsnagModule } from 'nestjs-bugsnag';
import BugsnagPluginExpress from '@bugsnag/plugin-express'

@Module({
  imports: [
    BugsnagModule.forRoot({
      apiKey: '<your-api-key>',
      releaseStage: 'production',
      appVersion: '1.0.0',
      plugins: [BugsnagPluginExpress],
      notifyReleaseStages: ['production'],
      onUncaughtException: true,
      onUnhandledRejection: true,
    }),
  ],
})
export class AppModule {
}
```

You can add the `BugsnagPluginExpress` to your `plugins` array in the `forRoot` method.

You can also use the `forRootAsync` method to configure the module:

```typescript
import { Module } from '@nestjs/common';
import { BugsnagModule } from 'nestjs-bugsnag';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...
    }),
    BugsnagModule.forRootAsync({
      inject: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('BUGSNAG_API_KEY'),
        releaseStage: configService.get('BUGSNAG_RELEASE_STAGE'),
        appVersion: configService.get('BUGSNAG_APP_VERSION'),
        notifyReleaseStages: configService.get('BUGSNAG_NOTIFY_RELEASE_STAGES'),
        onUncaughtException: configService.get('BUGSNAG_ON_UNCAUGHT_EXCEPTION'),
        onUnhandledRejection: configService.get('BUGSNAG_ON_UNHANDLED_REJECTION'),
      }),
    }),
  ],
})
```

More options are found in [Bugsnag docs](https://docs.bugsnag.com/platforms/javascript/configuration-options/)

You can inject the `BugsnagService` to use it in your application:

```typescript
import { BugsnagService } from 'nestjs-bugsnag';

@Controller()
export class AppController {
  constructor(private readonly bugsnagService: BugsnagService) {
  }

  failingMethod() {
    this.bugsnagService.notify(new Error('Something went wrong'));
  }
}
```


