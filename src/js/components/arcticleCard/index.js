/* lib */
import React from 'react'
import PropTypes from 'prop-types'
/* components */
/* styles */
import md from './styles.module.scss'

export default function ArticleCard({
  className,
  article,
  ...props }) {

  return (
    <div className={md.card}>
      <h2 className={md.card__title}>{article.title}</h2>
      <p className={md.card__body}>{article.body}</p>
      <p className={md.card__date}>{article.date}</p>
    </div>
  )
}

ArticleCard.defaultProps = {
  className: undefined,
  article: {}
}

ArticleCard.propTypes = {
  className: PropTypes.string,
  article: PropTypes.object.isRequired
}