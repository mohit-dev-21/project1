import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    // Example GET request
    fetch('/api/data')
      .then(response => response.json())
      .then(data => console.log('Data:', data))
      .catch(error => console.error('Error fetching data:', error));

    // Example POST request
    fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'John', age: 30 })
    })
    .then(response => response.json())
    .then(data => console.log('Data added successfully:', data))
    .catch(error => console.error('Error adding data:', error));
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
