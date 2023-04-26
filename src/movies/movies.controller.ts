import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
// декораторы пишутся над функциями всегда
  @Get()
  getAll() {
    return "Здесь будут возвращаться все фильмы";
  }

// обрабатываем url с адресом search
  @Get("search")
  // передаем в сервис параметр "год" что забрали с url сохраняяего в переменную searchingYear
  search(@Query('year') searchingYear: string ) {
    return `Мы ищем фильм выпушенный после ${searchingYear} года: `;
  }

  @Get(":id")
  // получили параметр и сохраняем в переменную с таким типом
  getOne(@Param("id") movieId: string) {
    return `Здесь будет возвращаться один фильм с айдишником: ${movieId}`;
  }

  // обработка пост запросов
  @Post()
  create(@Body() movieData) {
    // console.log(movieData);
    return movieData;
  }

  // передаем id сюда по какому удалить фильм
  @Delete(":id")
  // ловим id это в Param
  remove(@Param("id") movieId: string) {
    return `Эта функция будет удалять фильм по айдишке: ${movieId}`;
  }

  // передаем id чтобы понимать что обновляем
  @Patch(":id")
  // тут обновляем id только свойство в объекте updateData
  patch(@Param("id") movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData
    };
  }

}
