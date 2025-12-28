import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const  handleSubmit = async(e) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {  "content-type": "application/json"  },
            body: JSON.stringify({username, password}),
        });
        const data = await res.json();
        console.log(data);
        if(res.ok){
            alert("Login successful");
            localStorage.setItem("token", data.token);
        } else {
            alert(`Login failed: ${data.message}`);
        }
    };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value ={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleSubmit} >
            Submit
          </button>
          <button className="btn btn-outline-primary w-100" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
