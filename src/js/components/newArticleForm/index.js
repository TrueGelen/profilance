/* lib */
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
/* components */
import Input from '../inputs/mainInput'
import Textarea from '../inputs/textarea'
import Button from '../buttons/goldBtn'
/* other */
import {
	loginRequest,
	loginSuccess,
	loginError,
	errorShow
} from '../../Redux/actionCreators'
/* styles */
import md from './styles.module.scss'
import { users, roles, articles, usersMap } from '../../bd'

export default function NewArticleForm({
	className,
	onAdd,
	authorId,
	...props }) {

	const dispatch = useDispatch()

	const [state, setState] = useState({
		title: {
			value: '',
			errMessage: 'Поле не должно быть пустым',
			isValid: true,
			validate: (value) => value.trim() !== ""
		},
		body: {
			value: '',
			errMessage: 'Поле не должно быть пустым',
			isValid: true,
			validate: (value) => value.trim() !== ""
		}
	})

	const onChange = useCallback((e, val, field) => {
		const value = e ? e.target.value : val
		const name = e ? e.target.name : field
		setState(prevState => {
			const isValid = prevState[name].validate(value)
			return {
				...prevState, [name]:
				{
					...prevState[name],
					value,
					isValid
				}
			}
		})
	}, [])

	const addNewArticle = () => {
		try {
			const title = state.title.value
			const body = state.body.value
			let date = new Date()
			date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
			const id = Math.floor(Math.random() * 10000)
			const article = { id, authorId, title, body, date, approved: false }
			onAdd(article)
		} catch (error) {
			dispatch(errorShow("Не удалось добавить статью, попробуйте позже!"))
		}
	}

	const onSubmit = () => {
		const fields = Object.keys(state)
		if (fields.every(field => state[field].value !== '' && state[field].isValid)) {
			addNewArticle()
		} else {
			fields.forEach(field => onChange(null, state[field].value, field))
		}
	}

	return (
		<form
			className={`${md.form} ${className && className}`}
			onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
			<Input
				disabled={false} //todo
				value={state.title.value}
				type="title"
				name="title"
				placeholder="Название статьи"
				errMessage={state.title.errMessage}
				isValid={state.title.isValid}
				onChange={onChange} />
			<Textarea
				rows={15}
				className={md.textarea}
				disabled={false} //todo
				value={state.body.value}
				type="body"
				name="body"
				placeholder="Текст статьи..."
				errMessage={state.body.errMessage}
				isValid={state.body.isValid}
				onChange={onChange} />
			<Button
				name="submit"
				type="submit"
				disabled={false} //todo
				value={false ? "Добавление статьи!" : "Добавить статью"} /> {/* todo */}
		</form>
	)
}

NewArticleForm.defaultProps = {
	className: undefined,
	onAdd: () => { },
	authorId: undefined
}

NewArticleForm.propTypes = {
	className: PropTypes.string,
	onAdd: PropTypes.func.isRequired,
	authorId: PropTypes.number.isRequired
}