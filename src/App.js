import React, { useState } from 'react';
import styled from 'styled-components';

import Search from './components/Search';
import Locations from './components/Locations';
import Weather from './components/Weather'

function App() {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const [woeid, setWoeid] = useState(0);

  const updateQuery = e => {
    setSearch(e.target.value)
  }

  const printQuery = e => {
    e.preventDefault();
    
    if (!search.length) return;

    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${search}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setLocations(json)
        if (json.length) {
          setWoeid(json[0].woeid);
        }
      });
  };

  const selectLocation = id => {
    setWoeid(id);
  };

  return (
    <Page>
      <aside>
        <Search onChange={updateQuery} search={search} onSubmit={printQuery}/>
        <Locations locations={locations} selectLocation={selectLocation}/>
      </aside>
      <Weather woeid={woeid}/>
    </Page>
  );
}

const Page = styled.div`
  height: 100vh;
  display: flex;

  aside {
    flex: 1;
    background: #63B3ED;
    padding: 4rem;
  }

  main {
    flex: 2;
    padding: 4rem;
  }
`;

export default App;
