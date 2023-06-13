import { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import context from '../context/Context';

function Header() {
  const { headerState, setNotSearch, notSearch } = useContext(context);

  const handlerClick = () => {
    setNotSearch(!notSearch);
  };
  return (
    <header>
      <Link to="/profile">
        <img src={ headerState.profile } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{headerState.title}</h1>
      {headerState.renderHeader && (
        <div>
          <button onClick={ handlerClick }>
            <img src={ headerState.search } alt="Search" data-testid="search-top-btn" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
