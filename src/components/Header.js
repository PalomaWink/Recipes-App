import { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  const { headerState, setNotSearch, notSearch } = useContext();

  const handlerClick = () => {
    setNotSearch(!notSearch);
  };
  return (
    <header>
      <h1 data-testid="page-title">{headerState.title}</h1>
      <Link to="/profile">
        <img src={ headerState.profile } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      {headerState.renderHeader && (
        <Link to="/search">
          <img src={ headerState.searchIcon } alt="Search" data-testid="search-top-btn" />
        </Link>
      )}
      <button onClick={ handlerClick }>search</button>
    </header>
  );
}

export default Header;
