/**
 * This element is for the users to navigate between the 
 * home/search list and the favorites list 
 */
import FaHome from 'react-icons/lib/fa/home';
import MdStar from 'react-icons/lib/md/star';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

export const Menu = ({setVisibility, visibility}) => {
	
	const color = { color: '#BDBDBD'};

	const showFavorites = () => {
		console.log(visibility);
		setVisibility({
				highlight: false,
				booklist: false,
				favorites: true
			
		});
		ga('send', 'event', 'Menu', 'Navigate to favortites');
	}

	const showHome = () => {
		setVisibility({
			highlight: false,
			booklist: true,
			favorites: false
		});

		ga('send', 'event', 'Menu', 'Navigate Home');
	}

	return (
		<nav aria-label="App navigation" id="app-nav">
			<span>{visibility.favorites ? 
				<MdStar style={color} /> : 
				<MdStar onClick={() => showFavorites()}/>}</span>
			<span>{visibility.favorites ?
				<FaHome onClick={() => showHome()}/> :
			    <FaHome style={color} /> }</span>
			<span><a href="https://github.com/joshboyan/react-book-finder"><GoMarkGithub /></a></span>
		</nav>
	)
}