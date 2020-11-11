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
    password: "123",
    role: roles.admin
  },
  {
    id: 1,
    firstName: "Петр",
    secondName: "Петров",
    email: "petr@petrov.ru",
    password: "123",
    role: roles.user
  },
  {
    id: 2,
    firstName: "Вова",
    secondName: "Вовик",
    email: "vovik@vovik.ru",
    password: "123",
    role: roles.user
  }
]

export let usersMap = {}

users.forEach((item, ind) => {
  if (item.hasOwnProperty('email')) {
    usersMap[item.email] = ind;
  }
})

export let articles = [
  {
    id: 0,
    authorId: 1,
    title: "Какая то!",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero? Sapiente amet, aliquam harum illo quo quidem eligendi eum earum maiores, vero debitis omnis quod aperiam laboriosam, doloremque iure! Similique molestias nostrum eveniet vero. Quasi ex sint inventore distinctio a odit exercitationem! Velit unde molestias sint non vero itaque.",
    date: "2020-10-01",
    approved: true
  },
  {
    id: 1,
    authorId: 1,
    title: "Это вам не это!",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero? Sapiente amet, aliquam harum illo quo quidem eligendi eum earum maiores, vero debitis omnis quod aperiam laboriosam, doloremque iure! Similique molestias nostrum eveniet vero. Quasi ex sint inventore distinctio a odit exercitationem! Velit unde molestias sint non vero itaque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero?",
    date: "2020-11-05",
    approved: false
  },
  {
    id: 2,
    authorId: 2,
    title: "Это статья Вована!",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero? Sapiente amet, aliquam harum illo quo quidem eligendi eum earum maiores, vero debitis omnis quod aperiam laboriosam, doloremque iure! Similique molestias nostrum eveniet vero. Quasi ex sint inventore distinctio a odit exercitationem! Velit unde molestias sint non vero itaque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, pariatur vero? Sapiente amet, aliquam harum illo quo quidem eligendi eum earum maiores, vero debitis omnis quod aperiam laboriosam, doloremque iure! Similique molestias nostrum eveniet vero.",
    date: "2020-11-11",
    approved: true
  }
]