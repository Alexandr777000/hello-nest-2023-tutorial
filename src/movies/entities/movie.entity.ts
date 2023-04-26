export class Movie {
  // придумываем какие поля у сущности будут
  // id назначаем вручную - он в dto не идет
  id: number;
  title: string;
  year: number;
  genres: string[];
}