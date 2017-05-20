import FaHome from 'react-icons/lib/fa/home';
import MdStar from 'react-icons/lib/md/star';
import GoInfo from 'react-icons/lib/go/info';

export const Menu = ({setVisibility, visibility}) => {
	
	const color = { color: '#BDBDBD'};

	const showFavorites = () => {
		console.log(visibility);
		setVisibility({
				highlight: false,
				booklist: false,
				favorites: true
			
		});
		ga('send', 'event', 'Menu', 'click', 'Navigate to favortites');
	}

	const showHome = () => {
		setVisibility({
			highlight: false,
			booklist: true,
			favorites: false
		});

		ga('send', 'event', 'Menu', 'click', 'Navigate Home');
	}

	return (
		<nav aria-label="App navigation" id="app-nav">
			<span>{visibility.favorites ? 
				<MdStar style={color} /> : 
				<MdStar onClick={() => showFavorites()}/>}</span>
			<span>{visibility.favorites ?
				<FaHome onClick={() => showHome()}/> :
			    <FaHome style={color} /> }</span>
			<span><GoInfo /></span>
		</nav>
	)
}