import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginComponent.css';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    document.getElementById('username').style.borderColor = 'black';
    document.getElementById('password').style.borderColor = 'black';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Por favor ingrese un correo y una contraseña.');
      }

      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }

      const response = await axios.post("https://reqres.in/api/login", formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token)
      navigate('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Usuario o contraseña inválidos');
        document.getElementById('username').style.borderColor = 'red';
        document.getElementById('password').style.borderColor = 'red';
      } else {
        document.getElementById('username').style.borderColor = 'red';
        document.getElementById('password').style.borderColor = 'red';
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" id="username" name="email" value={formData.email} placeholder='Email' onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" value={formData.password}  placeholder='Password' onChange={handleChange} />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p></p>
      <p>Valid User: eve.holt@reqres.in</p>
      <p>Valid Password: cityslicka</p>

    </div>
  );
}

export default LoginComponent;