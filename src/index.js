import React from 'react'
import { render } from 'react-dom'
import './styles/styles.scss'
import { App } from './components/App'

window.React = React;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
render(
	<App />,
	document.getElementById('reactTarget')
)