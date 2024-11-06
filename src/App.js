// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataList from './components/DataList';
import './index.css';

function App() {
  const [categorizedData, setCategorizedData] = useState({
    Incomplete: [],
    'To Do': [],
    Doing: [],
    'Under Review': [],
    Completed: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://simple-site-zpgs.onrender.com/api/data')
      .then((response) => {
        const data = response.data;
        const categorized = data.reduce((acc, item) => {
          if (acc[item.type]) {
            acc[item.type].push(item);
          } else if (item.type !== "Overdue") { 
            acc[item.type] = [item];
          }
          return acc;
        }, {});

        setCategorizedData(categorized);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;
  }

  return (
    <div className="App p-2">
      
      <h1 className="text-3xl font-bold text-center mb-8">Categorized Data</h1>
      <div className="horizontal-scroll-wrapper">
        <div className="grid grid-flow-col gap-4">
          {Object.keys(categorizedData).map((type) => (
            <div key={type} className="min-w-[250px]">
              <DataList type={type} data={categorizedData[type]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
