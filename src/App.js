import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.users) {
          setUsers(data.users); // Update state with user data
          setIsLoading(false); // Data has been loaded
        } else {
          setIsLoading(false); // No user data found
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="table-container">
      <h1>User List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default App;
