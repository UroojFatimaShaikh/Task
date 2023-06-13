// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';

// const LoginSignup = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     console.log('Email:', email);
//     console.log('Password:', password);
  
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div>
//       <h2>{isLogin ? 'Login' : 'Signup'}</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
//       </form>

//       <p>
//         {isLogin ? "Don't have an account?" : 'Already have an account?'}
//         <button onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Signup' : 'Login'}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default LoginSignup;


import React, { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform login/signup logic here
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   // Reset form
  //   setEmail('');
  //   setPassword('');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(isLogin ? 'http://localhost:8000/login' : 'http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.log('Something went wrong');
      }
  
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>

      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";

// function App() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/users")
//       .then((response) => response.json())
//       .then((data) => setUsers(data));
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;



