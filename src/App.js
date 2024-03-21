import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ResizableComponent = ({ id, children }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const handleMouseDown = (event) => {
    const initialX = event.clientX;
    const initialY = event.clientY;

    const onMouseMove = (event) => {
      const deltaX = event.clientX - initialX;
      const deltaY = event.clientY - initialY;
      setWidth(width + deltaX);
      setHeight(height + deltaY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className="resizable-component"
      style={{ width, height }}
      id={id}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [newComponentTitle, setNewComponentTitle] = useState('');
  const [newComponentContent, setNewComponentContent] = useState('');
  const [updateComponentId, setUpdateComponentId] = useState('');
  const [updatedComponentTitle, setUpdatedComponentTitle] = useState('');
  const [updatedComponentContent, setUpdatedComponentContent] = useState('');

  useEffect(() => {
    fetchComponentCount();
  }, []);

  const fetchComponentCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/components/count');
      const { addCount } = response.data;
      setAddCount(addCount);
    } catch (error) {
      console.error('Error fetching component count:', error);
    }
  };

  const handleAddComponent = async () => {
    try {
      await axios.post('http://localhost:5000/api/components/add', {
        title: newComponentTitle,
        content: newComponentContent,
      });
      setAddCount(addCount + 1);
      // Clear the input fields after adding the component
      setNewComponentTitle('');
      setNewComponentContent('');
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  const handleUpdateComponent = async () => {
    try {
      await axios.put(`http://localhost:5000/api/components/update/${updateComponentId}`, {
        title: updatedComponentTitle,
        content: updatedComponentContent,
      });
      setUpdateCount(updateCount + 1);
      // Clear the input fields after updating the component
      setUpdatedComponentTitle('');
      setUpdatedComponentContent('');
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  return (
    
    <div className="App">
      <div className="container">
        <div className="row">
        <div>
        Add Count: {addCount}
      </div>
      <div>
        Update Count: {updateCount}
      </div>
          <ResizableComponent id="component1">
            <h2>Component 1</h2>
            <div className="add-component">
        <p>Add Component</p>
        <input
          type="text"
          placeholder="Enter Title"
          value={newComponentTitle}
          onChange={(e) => setNewComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Content"
          value={newComponentContent}
          onChange={(e) => setNewComponentContent(e.target.value)}
        />
        
      </div>
            <button onClick={handleAddComponent}>Add New Component</button>
            <div className="update-component">
        <p>Update Component</p>
        <input
          type="text"
          placeholder="Enter Component ID"
          value={updateComponentId}
          onChange={(e) => setUpdateComponentId(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Title"
          value={updatedComponentTitle}
          onChange={(e) => setUpdatedComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Content"
          value={updatedComponentContent}
          onChange={(e) => setUpdatedComponentContent(e.target.value)}
        />
        
      </div>
            <button onClick={handleUpdateComponent}>Update Component</button>
          </ResizableComponent>
          <ResizableComponent id="component2">
            <h2>Component 2</h2>
            <div className="add-component">
        <p>Add Component</p>
        <input
          type="text"
          placeholder="Enter Title"
          value={newComponentTitle}
          onChange={(e) => setNewComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Content"
          value={newComponentContent}
          onChange={(e) => setNewComponentContent(e.target.value)}
        />
        
      </div>
            <button onClick={handleAddComponent}>Add New Component</button>
            <div className="update-component">
        <p>Update Component</p>
        <input
          type="text"
          placeholder="Enter Component ID"
          value={updateComponentId}
          onChange={(e) => setUpdateComponentId(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Title"
          value={updatedComponentTitle}
          onChange={(e) => setUpdatedComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Content"
          value={updatedComponentContent}
          onChange={(e) => setUpdatedComponentContent(e.target.value)}
        />
        
      </div>
            <button onClick={handleUpdateComponent}>Update Component</button>
          </ResizableComponent>
        </div>
      </div>
      <ResizableComponent id="component3">
        <h2>Component 3</h2>
        <div className="add-component">
        <p>Add Component</p>
        <input
          type="text"
          placeholder="Enter Title"
          value={newComponentTitle}
          onChange={(e) => setNewComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Content"
          value={newComponentContent}
          onChange={(e) => setNewComponentContent(e.target.value)}
        />
        
      </div>
        <button onClick={handleAddComponent}>Add New Component</button>
        <div className="update-component">
        <p>Update Component</p>
        <input
          type="text"
          placeholder="Enter Component ID"
          value={updateComponentId}
          onChange={(e) => setUpdateComponentId(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Title"
          value={updatedComponentTitle}
          onChange={(e) => setUpdatedComponentTitle(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Enter Updated Content"
          value={updatedComponentContent}
          onChange={(e) => setUpdatedComponentContent(e.target.value)}
        />
        
      </div>
        <button onClick={handleUpdateComponent}>Update Component</button>
       
      </ResizableComponent>
      
     
     
    </div>
  );
};

export default App;
