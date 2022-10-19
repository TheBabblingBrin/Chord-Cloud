import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import FormLogo from "../FormLogo";
import ErrorList from '../ErrorList';


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="modal-forms">


    <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"

          onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit">Log In</button>
      <ErrorList errors={errors}/>
      <FormLogo />
    </form>
    </div>
  );
}

export default LoginForm;
