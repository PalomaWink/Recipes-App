import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import context from '../context/Context';

export default function FavoriteRecipes() {
  const { headerState, setHeaderState } = useContext(context);

  useEffect(() => {
    const updateState = () => {
      setHeaderState({ ...headerState,
        title: 'Favorite Recipes',
        renderHeader: false });
    };
    updateState();
  }, [headerState, setHeaderState]);
  return (
    <div>
      <Header />
    </div>
  );
}
