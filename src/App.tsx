import React from 'react';
import 'antd/dist/antd'; // Import Ant Design styles
import MainTable from './MainTable';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>ML Engineer Salaries</h1>
      <MainTable />
    </div>
  );
};

export default App;