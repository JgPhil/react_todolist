import './App.css';
import { Site } from './App/Site';
import { useEffect, useState } from 'react';
import { apiFetch } from './utils/api';
import { LoginForm } from './App/LoginForm';

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(function () {
    apiFetch('/login')
      .then(setUser)
      .catch(() => setUser(false))
  }, [])

  if (user === null) {
    return null;
  }

  return (
    user ? <Site /> : <LoginForm onConnect={setUser} />
  );
}