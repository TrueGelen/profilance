/* lib */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
/* components */
import ArticleCard from '../../components/arcticleCard'
import Input from '../../components/inputs/mainInput'
import Button from '../../components/buttons/goldBtn'
import PopUp from '../../components/popUp'
import NewArticleForm from '../../components/newArticleForm'
/* other */
import {
} from '../../Redux/actionCreators'
import { articles } from '../../bd'
/* styles */
import md from './styles.module.scss'

function NewsPage(props) {
  const [popUp, setPopUp] = useState(false)
  const [search, setSearch] = useState("")
  const [allArticles, setAllArticles] = useState(null)
  const userStore = useSelector(state => state.user)

  useEffect(() => {
    // будь у нас сервер, то тут мы бы получали статьи асинхронно
    setAllArticles(articles)
  }, [])

  const showPopUp = () => {
    setPopUp(true)
  }

  const hidePopUp = () => {
    setPopUp(false)
  }

  const addNewArticle = (arcticle) => {
    setAllArticles([...allArticles, arcticle])
    hidePopUp()
  }
  console.log("allArticles", allArticles)

  let filteredArticles = []
  if (allArticles) {
    allArticles.forEach(article => {
      if (search) {
        if (article.title.toLowerCase().includes(search.toLowerCase())) {
          filteredArticles.push(
            <ArticleCard key={article.id} article={article} />)
        }
      } else {
        filteredArticles.push(
          <ArticleCard key={article.id} article={article} />)
      }
    })
  }

  const onFilter = (e) => setSearch(e.target.value)

  return (
    <div className={md.wrapper}>
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

export default NewsPage