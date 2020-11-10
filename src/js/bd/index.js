export const roles = {
  admin: "admin",
  guest: "guest",
  user: "user"
}

export const users = [
  {
    id: 0,
    firstName: "Иван",
    secondName: "Иванов",
    email: "ivan@ivanov.ru",
    password: "123456",
    role: roles.admin
  },
  {
    id: 1,
    firstName: "Петр",
    secondName: "Петров",
    email: "petr@petrov.ru",
    password: "123456",
    role: roles.user
  },
  {
    id: 2,
    firstName: "Вова",
    secondName: "Вовик",
    email: "Вовик@Вовик.ru",
    password: "123456",
    role: roles.user
  }
]

export let articles = [
  {
    id: 0,
    authorId: 1,
    title: "Какой то!",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero? Sapiente amet, aliquam harum illo quo quidem eligendi eum earum maiores, vero debitis omnis quod aperiam laboriosam, doloremque iure! Similique molestias nostrum eveniet vero. Quasi ex sint inventore distinctio a odit exercitationem! Velit unde molestias sint non vero itaque.",
    data: ""
  }
]