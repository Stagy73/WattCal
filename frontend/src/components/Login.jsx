import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Login.css";

function LoginForm({ setUser }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6001"}/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        if (data.user.verified !== undefined && data.user.verified) {
          console.log(data.user);

          // Navigate to the "myspace" page
          navigate("/Myspace");
        }
      });
  };

  return (
    <form className="formLogin" onSubmit={handleSubmit}>
      <div className="divLogin">
        <label htmlFor="email">email</label>
        <input type="text" id="email" ref={emailRef} />
      </div>
      <div className="divLogin">
        <label htmlFor="password">password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit">Go</button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
