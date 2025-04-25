import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  // const { name, email, password } = user;
  const [file, setFile] = useState(null);
  const [video,setVideo]=useState(null);
  const [users, setUsers] = useState([]);

  const fieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const imageSet = (e) => {
    setFile(e.target.files[0]);
  };
  const videoSet=(e)=>{
    setVideo(e.target.files[0]);
  }

  const collectData = async (e) => {
   e.preventDefault();
    if (!file) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", file);
    formData.append("video",video);

    try {
      const response = await axios.post("http://localhost:3009/api/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
     
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3009/api/fetch");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
 

 
  return (
    <div className="container">
      <div className="container1">
      <h2>Register Here</h2>
      <form onSubmit={collectData}>
        <input type="text" name="name" placeholder="Name" onChange={fieldChange} required />
        <input type="email" name="email" placeholder="Email" onChange={fieldChange} required />
        <input type="password" name="password" placeholder="Password" onChange={fieldChange} required />
        <input type="file" name="image" onChange={imageSet} required />
        <input type="file" name="video" onChange={videoSet} required />
        <button type="submit">Register</button>
      </form>
      </div>
      <div className="container2">
      <table>
        <tr>
          <th>Sno.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Image</th>
          <th>Video</th>
        </tr>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>
              {console.log(user.image)}

              <img src={`http://localhost:3009/uploads/`+user.image} width="100" height="100" alt="User" />
            </td>
           <td>
            {console.log(user.video)}
           <video src={`http://localhost:3009/uploads/`+user.video} width="200" height="100" controls/>
           </td>
          </tr>
        ))}
      </table>
      </div>
      
     


    
     
    </div>
  );
}

export default App;
