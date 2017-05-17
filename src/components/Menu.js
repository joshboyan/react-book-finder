import FaHome from 'react-icons/lib/fa/home';
import MdStar from 'react-icons/lib/md/star';
import GoInfo from 'react-icons/lib/go/info';

export const Menu = ({visibility}) => {

	const showFavorites = () => {
		console.log(visibility);
		visibility({
				highlight: false,
				booklist: false,
				favorites: true
			
		});
	}

	const showHome = () => {
		visibility({
			highlight: false,
			booklist: true,
			favorites: false
		});
	}

	return (
		<nav aria-label="App navigation" id="app-nav">
			<span><MdStar onClick={() => showFavorites()}/></span>
			<span><FaHome onClick={() => showHome()}/></span>
			<span><GoInfo /></span>
		</nav>
	)
}