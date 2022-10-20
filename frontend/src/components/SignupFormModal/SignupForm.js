import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import FormLogo from "../FormLogo";
import ErrorList from '../ErrorList';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>

    <h3>Sign up and strike your first chord today!</h3>
    <form className="modal-inputs"
    onSubmit={handleSubmit}>


        <input
          type="text"
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstname(e.target.value)}
        />


        <input
          type="text"
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastname(e.target.value)}
        />


        <input
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="text"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />


        <input
          type="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />


        <input
          type="password"
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

      <button className="continue" type="submit">Continue</button>
      <ErrorList errors={errors}/>

      <FormLogo />
    </form>
    </>
  );
}

export default SignupFormPage;
