import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.booksAPI.category;
  const [sort, setSort] = state.booksAPI.sort;
  const [search, setSearch] = state.booksAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>
          <i className="fa fa-filter"></i> Filters :&nbsp;
        </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Books</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      &nbsp;
      <i className="fas fa-search"></i>
      <input
        type="text"
        value={search}
        placeholder="Enter your search..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row sort">
        <span>
          <i className="fas fa-sort-amount-asc"></i> Sort By : &nbsp;
        </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
