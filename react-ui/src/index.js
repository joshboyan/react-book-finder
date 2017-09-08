import React from 'react'
import { render } from 'react-dom'
import './styles/styles.scss'
import { App } from './components/App'

window.React = React;

render(
	<App />,
	document.getElementById('reactTarget')
)

// Check for browser support of service worker
if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('./service-worker.js')
 .then(function(registration) {
   // Successful registration
   console.log('Hooray. Registration successful, scope is:', registration.scope);
   ga('send', 'event', 'Service-worker', 'install', 'Successfully installed sw');
 }).catch(function(err) {
   // Failed registration, service worker won’t be installed
   console.log('Whoops. Service worker registration failed, error:', err);
    ga('send', 'event', 'Service-worker', 'install', 'Failed installing sw');

 });
}

document.addEventListener('scroll', function (event) {
    if (document.body.scrollHeight ==
        document.body.scrollTop +        
        window.innerHeight) {
        ga('send', 'event', 'App', 'scroll', 'Scrolled to bottom');
    }
});

