import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function SignupForm({ values, errors, touched, status }) {

  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="signupform">
      <Form>
        <label htmlFor="name">
          <center>Name:</center>
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          {errors.name && <p>{errors.name}</p>}
        </label>

        <label htmlFor="email">
          <center>Email:</center>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && <p>{errors.email}</p>}
        </label>

        <label htmlFor="password">
          <center>Password:</center>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password}</p>}
        </label>

        <label className="checkbox-container">
          Agree to Terms of Service
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
          <span className="checkmark" />
          {errors.termsofservice && <p>{errors.termsofservice}</p>}
        </label>
        <center><button type="submit">Sign-up!</button></center>
      </Form>

      {users.map(users => {
        return (
          <ul key={users.id} className="signedup">
            <li>Name: {users.name}</li>
            <li>Email: {users.email}</li>
          </ul>
        );
      })}
    </div>
  );
}

const FormikSignup = withFormik({
  mapPropsToValues({ name, email, password, termsofservice }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsofservice: termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    termsofservice: Yup
      .boolean()
      .oneOf([true], "You must agree to the Terms of Service!"),

    name: Yup.string().min(3, "Your name must be at least 3 characters long."),
    email: Yup.string().email("Email must be a valid email!"),
    password: Yup.string().min(6, "Your password must be at least 6 characdters long."),

    name: Yup.string().max(26, "Your name cannot be longer than 26 characters."),
    password: Yup.string().max(12, "Your password cannot be longer than 12 characters.")


    // passing a string in required makes a custom inline error msg
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);

        //clears form inputs, from FormikBag
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(SignupForm);

export default FormikSignup;
