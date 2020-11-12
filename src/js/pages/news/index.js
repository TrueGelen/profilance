/* lib */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useStore } from 'react-redux'
/* components */
import ArticleCard from '../../components/arcticleCard'
import Input from '../../components/inputs/mainInput'
import Button from '../../components/buttons/goldBtn'
import PopUp from '../../components/popUp'
import NewArticleForm from '../../components/newArticleForm'
/* other */
import {
} from '../../Redux/actionCreators'
import { articles, roles } from '../../bd'
/* styles */
import md from './styles.module.scss'

function NewsPage(props) {
	const [popUp, setPopUp] = useState(false)
	const [search, setSearch] = useState("")
	const [allArticles, setAllArticles] = useState([])
	const [memoizedFunctions, setMemoizedFunctions] = useState(undefined)
	const userStore = useSelector(state => state.user)
	let filteredArticles = []
	// let memoizedFunctions = useMemo(() => null)

	useEffect(() => {
		// будь у нас сервер, то тут мы бы получали статьи асинхронно
		//todo try catch и диспачи
		setAllArticles(articles)
	}, [])

	useEffect(() => {
		//думаю лучше так будет иногда перебрать массив, чем ререндерить все карточки и кнопки из-за этого
		console.log("useEff memoizedFunctions")
		if (userStore.user.role === roles.admin) {
			setMemoizedFunctions(prevState => { })
			/* Array.isArray(allArticles) */ allArticles.length && allArticles.forEach((a, ind) => {
				//по хорошему тут везде должны быть запросы и try catch'ы
				const onRemove = () => {
					setAllArticles(prevState => {
						const newArr = [...prevState]
						newArr.splice(ind, 1)
						return newArr
					})
				}

				const onHide = () => {
					setAllArticles(prevState => {
						const newArr = [...prevState]
						const newArcticle = { ...newArr[ind], approved: false }
						newArr[ind] = newArcticle
						return newArr
					})
				}

				const onPublish = () => {
					setAllArticles(prevState => {
						const newArr = [...prevState]
						const newArcticle = { ...newArr[ind], approved: true }
						newArr[ind] = newArcticle
						return newArr
					})
				}

				setMemoizedFunctions(prevState => ({ ...prevState, [ind]: { onRemove, onHide, onPublish, } }))
			})
		}
	}, [allArticles.length, userStore.user.role])

	console.log("memoizedFunctions", memoizedFunctions)

	const showPopUp = useCallback(() => {
		setPopUp(true)
	}, [])

	const hidePopUp = useCallback(() => {
		setPopUp(false)
	}, [])

	const addNewArticle = (arcticle) => {
		setAllArticles([...allArticles, arcticle])
		hidePopUp()
	}

	const accessController = (article, ind) => {
		switch (userStore.user.role) {
			case roles.admin:
				filteredArticles.push(
					<ArticleCard
						key={article.id}
						article={article}
						approved={article.approved}
						controls
						/* */ onPublish={memoizedFunctions && memoizedFunctions[ind].onPublish}
						onHide={memoizedFunctions && memoizedFunctions[ind].onHide}
						onRemove={memoizedFunctions && memoizedFunctions[ind].onRemove} />)
				break;
			case roles.user:
				(article.approved || userStore.user.id === article.authorId) && filteredArticles.push(
					<ArticleCard
						key={article.id}
						article={article} />)
				break;
			default:
				article.approved && filteredArticles.push(<ArticleCard key={article.id} article={article} />)
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

	const onFilter = useCallback((e) => setSearch(e.target.value), [])

	console.log("allArticles", allArticles)

	return (
		<div className={md.wrapper}>
			{ console.log(`!=====ARTICLES PAGE======!`)}
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

export default NewsPage