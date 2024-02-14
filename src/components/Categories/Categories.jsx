import React from 'react';
import './Categories.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then((json) => {
          setCategories(json.trivia_categories);
          setIsLoading(false);
        })
        .catch(err => console.log(err))
      }, [])

      // Sorting categories alphabetically
      const sortedCategories = [...categories].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
    //   console.log(cat);
  return (
    <>
    { isLoading ? (
      <div className="loader-container">
        <GridLoader color="#D8C7FF" size={30} />
        <h1>Fetching Categories . . .</h1>
      </div>
    ) : (
      <div className="category-container">
      <h1>Choose a Category</h1>
      <hr />
      <div className="main">
        {sortedCategories.map((category) => {
          return (
            <NavLink to={`/difficulty/${category.id}`}>
              <button key={category.id}>{category.name}</button>
            </NavLink>
          );
        })}
      </div>
    </div>
    )}
    </>
  );
}

export default Categories