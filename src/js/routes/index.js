import HomePage from '../pages/home'
import NewsPage from '../pages/news'
import Page404 from '../pages/page404'

let routes = [
  {
    name: 'home',
    url: '/',
    container: HomePage,
    exact: true
  },
  {
    name: 'news',
    url: '/NewsPage',
    container: NewsPage,
    exact: true
  },
  {
    url: '**',
    container: Page404,
  }
]

let routesMap = {}

routes.forEach(item => {
  if (item.hasOwnProperty('name')) {
    routesMap[item.name] = item.url;
  }
})

let urlBuilder = function (name, id) {
  if (!routesMap.hasOwnProperty(name)) {
    console.error("page doesn't exist")
    return null;
  }

  return `${routesMap[name].replace(":id", id)}`;
}

export { routes, routesMap, urlBuilder }