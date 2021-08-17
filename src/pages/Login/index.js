import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticationService } from "../../services/authentication.service";

import styles from "./Login.module.css";

const { login } = authenticationService;

function Login() {
  let history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const { status, message } = await login(username, password);
    if (status === "success") {
      history.push("/");
    } else {
      alert("Giriş bilgileri hatalı.");
    }
  }
  return (
    <>
      <div className={styles.auth}>
        <Link to="/register">Kayıt Ol</Link>
      </div>

      <div className={styles.loginWrapper}>
        <h3>Giriş Yap</h3>
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

export default Login;
