import React from 'react'
import { render } from 'react-dom'
import './styles/styles.scss'
import { App } from './components/App'

window.React = React;

render(
	<App />,
	document.getElementById('reactTarget')
)