import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  // описываем какие поля пользователи могут отправлять при отправке запросов
  // = безопасность чтобы взлома не было и лишние данные не прислали
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  @IsOptional()
  // проверяем что каждый элемент внутри массива это строка
  @IsString({each: true})
  readonly genres: string[];
}