
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const  handleSubmit = async(e) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("firstname", firstName);
        formData.append("secondname", lastName);
        formData.append("photo", image);
        const res = await fetch(`${API_URL}/users`, {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        
        if (res.ok){
            alert("Registration successful");
        } else {
            alert(`Registration failed: ${data.message}`);
        }

    };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-4">Sign up</h3>

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
         <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
         <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
        type="file"
        accept="image/*"
        id="imageUpload"
        style={{ display: "none" }}
        onChange={(e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
        }}
        />
        <div
        onClick={() => document.getElementById("imageUpload").click()}
        style={{
        border: "2px dashed #aaa",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        marginBottom: "16px",
        }}
        >
    {image ? (<img
        src = {URL.createObjectURL(image)}
        alt="preview"
        style={{ maxWidth: "100%", maxHeight: "1200px" }}
    />) : (
        "Upload Profile Image"
    )}
    </div>


        <div className="d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleSubmit} >
            Submit
          </button>
          <button className="btn btn-outline-primary w-100" onClick = {() => navigate('/Login') }>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
