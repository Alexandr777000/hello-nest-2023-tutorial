import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "movies/entities/movie.entity";
import { CreateMovieDto } from "movies/dto/create-movie.dto";
import { UpdateMovieDto } from "movies/dto/update-movie.dto";

@Injectable()
export class MoviesService {
  // стейт
  private movies: Movie[] = [];

  getAll(): Movie[] {
    // возвращаем все наши фильмы
    // в return всегда работаем со стейтом
    return this.movies;
  }

  getOne(id: number): Movie {
    console.log(typeof id);

    // сравниваем с id фильма в БД и вернем совпавщий фильм
    // return this.movies.find(movie => movie.id === Number(id));
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw  new NotFoundException(`Фильм с id : ${id} не найден, `);
    }
    return movie;
  }

  remove(id: number) {
    // перед удалением сначала проверяем есть ли фильм в нашей БД если не существует
    // то будет вызвана ошибка что логика описана внутри getOne(id: string):
    this.getOne(id);
    // вернем из БД все фильмы кроме него с таким id
    // перезапишем стейт отфильтрованным массивом
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    // добавляем новый элемент в наш массив фильмов
    this.movies.push(
      {
        // надо сделать новое id
        id: this.movies.length + 1,
        ...movieData
      }
    );
  }

  patch(id: number, updateData: UpdateMovieDto) {
    // снова проверяем что фильм существует чтобы могли в нем поле одно изменить и
    // получаем фильм где изменить надо...
    const movie = this.getOne(id);
    // так мы получили фильм теперь его надо удалить и пересоздать заново
    this.remove(id);
    // создаем новую запись в стейте
    this.movies.push({
      // если у нас есть схожие поля они все объединятся  если есть старые поля они
      // останутся а новые поля допишутся
      // с фейковой БД так делаем с настоящей по-другому логика будет
      ...movie, ...updateData
    });
  }

}

/*
Сервис - взаимодействие с БД, получение, изменение данных и передача измененных данных
 в контроллер
 */
