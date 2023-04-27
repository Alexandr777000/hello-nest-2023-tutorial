import { Test } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { NotFoundException } from "@nestjs/common";

// describe - описание теста
// describe - отдельно та как тестируем каждцю часть - каждую функцию
describe("MoviesService", () => {
  // сервис импортирован сюда MoviesService
  let service: MoviesService;

  // перед каждым тестом что-то делаем
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MoviesService]
    }).compile();

    service = moduleRef.get<MoviesService>(MoviesService);
  });
  it("это должно быть определено", () => {
    expect(service).toBeDefined();
  });

  describe("Тестируем функцию getAll()", () => {
    it("Должен возвращаться --> массив", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
// изначально БД пустая и не сможем протестировать getOne() - надо ее наполнить с помощью
  // service.create()
  describe("Тестируем функцию getOne()", () => {
    it("Должен возвращаться --> фильм", () => {
      service.create({
        title: "Тестовый фильм",
        genres: ["боевик"],
        year: 2023
      });
      // фильмов не было, создали поэтому id === 1
      const movie = service.getOne(1);
      // что существует...
      expect(movie).toBeDefined();
      // что id === 1
      expect(movie.id).toEqual(1);
    });

    it("Должна вернуться 404 ошибка", () => {
      try {
        // не существующий id тестируем на ошибку
        const movie = service.getOne(666);
        // так как id нет ловим ошибку
      } catch (e) {
        // проверяем
        expect(e).toBeInstanceOf(NotFoundException);
        // toEqual - равно...
        expect(e.message).toEqual(`Фильм с id : 666 не найден, `);
      }
    });
  });
  // для тестирования удаления фильма может быть 2 сценария: если все ок и удалили
  // фильм и второй  если  запросили не существующий id и не смогли удалить его - мы
  // не смогли его просто найти
  describe("Тестируем remove()", () => {
    it("Фильм удаляется", function() {
      // создаем фильм
      service.create({
        title: "Тестовый фильм",
        genres: ["боевик"],
        year: 2023
      });
      // после создания проверяем что фильм есть в консоле смотрим
      /*console.log(service.getAll());*/
      const allMovies = service.getAll();
      service.remove(1);
      // еще раз вызовем функцию service.getAll() -- получим после удаления
      // и сравним 2 переменных === и один массив другому массиву чтобы понять удалили
      // ли элемент или нет или лучше количество элементов  в массиве до удаления и после
      const afterRemove = service.getAll();

      // toBeLessThan - меньше чем
      expect(afterRemove.length).toEqual(allMovies.length - 1);

    });

    it("Вернулась 404 ошибка при удалении не существующего фильма", () => {
      try {
        const movie = service.remove(666);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Фильм с id : 666 не найден, `);
      }
    });
  });

  describe("Тестирование функции create()", () => {
    it("Фильм создается", function() {
      // перед созданием фильма
      const beforeCreate = service.getAll().length;

      service.create({
        title: "Тестовый фильм",
        genres: ["боевик"],
        year: 2023
      });
// после того как создали
      const afterCreate = service.getAll().length;
// больше чем toBeGreaterThan
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("Тестируем patch()", () => {
    it("Фильм изменен", function() {
      service.create({ title: "Тестовый фильм", genres: ["боевик"], year: 2023 });
      service.patch(1, { title: "обновленный заголовок" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("обновленный заголовок");
    });

    it("Вернулась 404 ошибка", () => {
      try {
        const movie = service.patch(1, { title: "" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

});