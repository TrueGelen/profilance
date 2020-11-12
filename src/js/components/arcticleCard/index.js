/* lib */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
/* components */
import Button from '../buttons/goldBtn'
/* styles */
import md from './styles.module.scss'

function ArticleCard({
	className,
	article,
	controls,
	approved,
	onPublish,
	onHide,
	onRemove,
	...props }) {

	return (
		<div className={md.card}>
			{ console.log("=====ArticleCard======")}
			<h2 className={md.card__title}>{article.title}</h2>
			<p className={md.card__body}>{article.body}</p>
			<p className={md.card__date}>{article.date}</p>
			<div className={`${md.card__buttons} ${controls && md.card__buttons_show}`}>
				<Button
					disabled={approved}
					name="publish"
					className={`${md.card__button} ${md.card__button_publish}`}
					value="Опубликовать"
					onClick={onPublish}
				/>
				<Button
					disabled={!approved}
					name="hide"
					className={`${md.card__button} ${md.card__button_hide}`}
					value="Скрыть"
					onClick={onHide}
				/>
				<Button
					name="remove"
					className={`${md.card__button} ${md.card__button_del}`}
					value="Удалить"
					onClick={onRemove}
				/>
			</div>
		</div>
	)
}

export default memo(ArticleCard)

ArticleCard.defaultProps = {
	className: undefined,
	article: {},
	controls: undefined,
	approved: false,
	onPublish: () => { },
	onHide: () => { },
	onRemove: () => { }
}

ArticleCard.propTypes = {
	className: PropTypes.string,
	article: PropTypes.object.isRequired,
	controls: PropTypes.bool,
	approved: PropTypes.bool,
	onPublish: PropTypes.func,
	onHide: PropTypes.func,
	onRemove: PropTypes.func
}