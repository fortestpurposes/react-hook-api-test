import React, { useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState({ hits: []});

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=hooks',
      )
      console.log(result.data)
      setData(result.data);
    }

    fetchData()
  }, []);

  return(
    <ul className="list">
       {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
    </ul>
  );
}

export default App;
