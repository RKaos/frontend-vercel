import react, { useEffect, useState } from 'react';

const App = ()  => {

const [user,setUser] = useState([])

const getUser = () => { 
  fetch("https://backend-render-tsfd.onrender.com")
  .then(res => res.json())
  .then(json => setUser(json))
}

useEffect(() => {
  getUser()
},[])

    return (
        <div>
            {user.map((data)=>{
          return <>
          <div style ={{border:"1px solid gray", width:"500px"}}>
          <h1>Name : {data.name}</h1>
              <h1>Username : {data.username}</h1>
              <h1>Email : {data.email}</h1>
          </div>
          </>
            })}
          
        </div>
    )
}

export default App;
