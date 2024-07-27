import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');

    // Set the script source to the path of your script
    script.src = `${process.env.PUBLIC_URL}/script.js`;

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, React!</h1>
        <h2>bonjp</h2>
        <p>Welcome to your first React app.</p>
        <p>hadir changed this </p>
      </header>
    </div>
  );
}

export default App;
