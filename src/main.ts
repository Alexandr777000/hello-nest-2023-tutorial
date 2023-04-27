import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // запрос от пользователя даже не дойдет до валидатора - будет уничтожен на пути..
    whitelist: true,
    // запрет любых запросов которые не соответствуют нашим критериям
    forbidNonWhitelisted: true,
    // налету id преобразовали из строки в число когда запрос еще не поступил к нам на
    // сервер
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap();
