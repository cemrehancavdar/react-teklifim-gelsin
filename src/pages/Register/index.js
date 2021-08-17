import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticationService } from "../../services/authentication.service";

import styles from "./Register.module.css";

const { register } = authenticationService;

function Register() {
  let history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const { status } = await register(username, password);
    if (status === "success") {
      history.push("/");
    }
    else {
      alert("Hata oluştu.")
    }
  }
  return (
    <>
      <div className={styles.auth}>
        <Link to="/login">Giriş Yap</Link>
      </div>

      <div className={styles.loginWrapper}>
        <h3>Kayıt Ol</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
