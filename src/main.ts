import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './not-found-exception-filter.filter';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  //! Page 404
  app.useGlobalFilters(new NotFoundExceptionFilter());

  //*s Change the limit of the img's transfer
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  //* HBS config
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public' ,'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);

  logger.log(`Application is running on: http://localhost:${process.env.PORT}`);
}
bootstrap();
