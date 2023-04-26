import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "movies/dto/create-movie.dto";

// расширяем наш класс за счет класса (или наследуемся...)
// передали от которого наследуемся CreateMovieDto (убирая дублирование типов)
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
}