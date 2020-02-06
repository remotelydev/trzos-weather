import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.form`
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 1.5rem;
    font-size: 2rem;
    color: white;
    background: none;
    border: none;
    border-bottom: 1px solid white;
  }
  input::placeholder {
    color: white;
  }
  input:focus {
    outline: 2px solid white;
  }

`

function Search({onChange, onSubmit, search}) {
  return (
    <SearchBar onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={onChange}
      />
    </SearchBar>
  );
}

export default Search;