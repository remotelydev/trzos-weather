import React from 'react';
import styled from 'styled-components';

const LocationList = styled.ul`
  list-style: none;
  color: white;
  padding: 0 0.5rem;

  li {
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0.5rem;
  }
  li:hover, li:focus {
    background: #90CDF4
  }
  li:focus {
    /* That's the design. I'd pushback on text-emphasis. Bad for accessibiliy */
    /* outline: 3px dashed white; */
    outline: none;
  }
`;

function Locations({ locations, selectLocation }) {
  return (
    <LocationList>
      {locations.map(loc => {
      return (<li key={loc.woeid} tabIndex="1" onClick={() => selectLocation(loc.woeid)}>{loc.title}</li>)
      })}
    </LocationList>
  );
}

export default Locations;
