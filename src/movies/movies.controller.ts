import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res
} from "@nestjs/common";
import { MoviesService } from "movies/movies.service";
import { Movie } from "movies/entities/movie.entity";
import { CreateMovieDto } from "movies/dto/create-movie.dto";
import { UpdateMovieDto } from "movies/dto/update-movie.dto";

@Controller("movies")
export class MoviesController {
  // объект moviesService класса MoviesService
  constructor(private readonly moviesService: MoviesService) {
  }

// декораторы пишутся над функциями всегда
  @Get()
  getAll(/*@Res() res, @Req() req*/): Movie[] {
    // return "Здесь будут возвращаться все фильмы";
    return this.moviesService.getAll();
  }
/*
// обрабатываем url с адресом search
  @Get("search")
  // передаем в сервис параметр "год" что забрали с url сохраняяего в переменную searchingYear
  search(@Query("year") searchingYear: string) {
    return `Мы ищем фильм выпушенный после ${searchingYear} года: `;
  }*/

  @Get(":id")
  // получили параметр и сохраняем в переменную с таким типом
  getOne(@Param("id") movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  // обработка пост запросов
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // console.log(movieData);
    return this.moviesService.create(movieData)
  }

  // передаем id сюда по какому удалить фильм
  @Delete(":id")
  // ловим id это в Param
  remove(@Param("id") movieId: number) {
    return this.moviesService.remove(movieId)
  }

  // передаем id чтобы понимать что обновляем
  @Patch(":id")
  // тут обновляем id только свойство в объекте updateData
  patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData)
  }

}

/*
Контроллер - передаем данные по url в него -- отсюда их выцепляем, сохраняем и
передаем в параметрах в Сервис, создает ендпоинты и возвращает данные на фронтенд

сервис в Контроллере прописывается в конструкторе
 */
