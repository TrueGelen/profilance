/* lib */
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
/* components */
import ArticleCard from '../../components/arcticleCard'
import Input from '../../components/inputs/mainInput'
import Button from '../../components/buttons/goldBtn'
import PopUp from '../../components/popUp'
import NewArticleForm from '../../components/newArticleForm'
/* other */
import {
  errorShow
} from '../../Redux/actionCreators'
import { articles as arc, roles } from '../../bd'
/* styles */
import md from './styles.module.scss'

/* исходил из того, что вряд ли мы будем хранить статьи в общем сторе и поэтому пришлось
   покастылить таким образом со всеми исходящими последствиями. тип такой синхронный сервер */
let articles = [...arc]

function NewsPage(props) {
  const dispatch = useDispatch()
  const [popUp, setPopUp] = useState(false)
  const [search, setSearch] = useState("")
  const [allArticles, setAllArticles] = useState([])
  const userStore = useSelector(state => state.user)

  const memoizedFunctions = useMemo(() => {
    //думаю лучше так будет иногда перебрать массив, чем ререндерить все карточки и кнопки из-за этого
    let memoized = null
    if (userStore.user.role === roles.admin) {
      allArticles.length && allArticles.forEach((a, ind) => {
        const onRemove = () => {
          //по хорошему тут(как и ниже) везде должны быть запросы к серверу и если ок,
          //то запись в стейт, ну и все это в try catch'ах
          setAllArticles((prevState) => {
            const newArr = [...prevState]
            newArr.splice(ind, 1)
            articles = [...newArr] //тип обновили на сервере
            return newArr
          })
        }

        const onHide = () => {
          setAllArticles((prevState) => {
            const newArr = [...prevState]
            const newArcticle = { ...newArr[ind], approved: false }
            newArr[ind] = newArcticle
            articles = [...newArr]
            return newArr
          })
        }

        const onPublish = () => {
          setAllArticles((prevState) => {
            const newArr = [...prevState]
            const newArcticle = { ...newArr[ind], approved: true }
            newArr[ind] = newArcticle
            articles = [...newArr]
            return newArr
          })
          return true
        }
        memoized = { ...memoized, [ind]: { onRemove, onHide, onPublish, } }
      })
    }
    return memoized
  }, [allArticles.length, userStore.user.id])

  const filteredArticles = useMemo(() => {
    let memoized = []
    const accessController = (article, ind) => {
      switch (userStore.user.role) {
        case roles.admin:
          memoized.push(
            <ArticleCard
              key={article.id}
              article={article}
              approved={article.approved}
              controls
              onPublish={memoizedFunctions && memoizedFunctions[ind].onPublish}
              onHide={memoizedFunctions && memoizedFunctions[ind].onHide}
              onRemove={memoizedFunctions && memoizedFunctions[ind].onRemove} />)
          break;
        case roles.user:
          (article.approved || userStore.user.id === article.authorId) && memoized.push(
            <ArticleCard
              key={article.id}
              article={article} />)
          break;
        default:
          article.approved && memoized.push(<ArticleCard key={article.id} article={article} />)
          break;
      }
    }

    if (allArticles.length) {
      allArticles.forEach((article, ind) => {
        if (search) {
          if (article.title.toLowerCase().includes(search.toLowerCase())) {
            accessController(article, ind)
          }
        } else {
          accessController(article, ind)
        }
      })
    }
    return memoized
  }, [allArticles, userStore.user.id, search])

  useEffect(() => {
    console.log("func useEffect")
    // будь у нас сервер, то тут мы бы получали статьи асинхронно
    try {
      setAllArticles([...articles])
    } catch (error) {
      dispatch(errorShow("Не удалось получить статьи, попробуйте позже!"))
    }
  }, [])

  // console.log("func data memoizedFunctions", memoizedFunctions)
  // console.log("allArticles", allArticles)
  // console.log("func data filteredArticles", filteredArticles)

  const showPopUp = useCallback(() => {
    setPopUp(true)
  }, [])

  const hidePopUp = useCallback(() => {
    setPopUp(false)
  }, [])

  const addNewArticle = (arcticle) => {
    try {
      articles.push(arcticle) //тип записали на сервер
      setAllArticles([...allArticles, arcticle])
      hidePopUp()
    } catch (error) {
      dispatch(errorShow("Не удалось получить статьи, попробуйте позже!"))
    }
  }

  const onFilter = useCallback((e) => setSearch(e.target.value), [])

  return (
    <div className={md.wrapper}>
      {/* console.log(`!=====ARTICLES PAGE======!`) */}
      <div className={md.header}>
        <Input
          className={md.header__search}
          value={search}
          type="text"
          name="search"
          placeholder="Фильтровать по названию"
          onChange={onFilter}
        />
        {
          userStore.isAuthorized && <Button
            name="AddArticle"
            className={md.header__button}
            value="Добавить статью"
            onClick={showPopUp} />
        }
      </div>
      <div className={md.articles}>
        {filteredArticles}
      </div>

      {
        userStore.isAuthorized &&
        <PopUp
          onClose={hidePopUp}
          show={popUp}>
          <NewArticleForm
            authorId={userStore.user.id}
            onAdd={addNewArticle} />
        </PopUp>
      }
    </div>
  )
}

export default memo(NewsPage)