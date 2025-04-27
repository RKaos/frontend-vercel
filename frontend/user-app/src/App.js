import React, { useEffect, useState } from 'react';

const App = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detect backend URL
  const backendURL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/users" // during local dev
    : "https://backend-render-tsfd.onrender.com/api/users"; // deployed backend

  const getUser = () => { 
    fetch(backendURL)
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(json => {
        if (Array.isArray(json)) {
          setUser(json);
        } else {
          throw new Error("Invalid JSON format");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to fetch users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      {user.map((data, index) => (
        <div key={index} style={{ border: "1px solid gray", width: "500px", marginBottom: "10px" }}>
          <h1>Name : {data.name}</h1>
          <h1>Username : {data.username}</h1>
          <h1>Email : {data.email}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
