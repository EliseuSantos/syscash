import 'module-alias/register';
import { HttpExceptionFilter } from '@application/filters';
import { AppModule } from '@infrastructure/modules/app.module';
import {
  Logger,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import chalk from 'chalk';
import 'module-alias/register';
import * as moduleAlias from 'module-alias';
import * as path from 'path';
import packageJson = require('../package.json');

if (process.env.NODE_ENV?.toUpperCase() !== 'LOCAL') {
  require('newrelic');
}

require('dotenv').config();

moduleAlias.addAliases({
  '@application': path.resolve(__dirname, 'application'),
  '@domain': path.resolve(__dirname, 'domain'),
  '@infrastructure': path.resolve(__dirname, 'infrastructure'),
});

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    const configService = app.get(ConfigService);
    Logger.log(
      `Environment: ${chalk
        .hex('#87e8de')
        .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
      'Bootstrap',
    );

    //Versioning
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: VERSION_NEUTRAL,
    });

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    const APP_NAME = configService.get('APP_NAME');
    const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .setVersion(
        `${packageJson.version} ${process.env.NODE_ENV?.toUpperCase()}`,
      )
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const HOST = configService.get('HOST');
    const PORT = configService.get('PORT');

    await app.listen(PORT);
    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://${HOST}:${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
