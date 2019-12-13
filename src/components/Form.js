import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function SignupForm({ values, errors, touched, status }) {

  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [signup, setSignup] = useState([]);

  return (
    <Form>
    <label htmlFor="name">
        Name:
        <Field
          id="name"
          type="text"
          name="name"
          placeholder="Name"
        />
        {errors.name && <p>{errors.name}</p>}
    </label>

    <label htmlFor="email">
        Email:
        <Field
          id="email"
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
    </label>

    <label htmlFor="password">
        Password:
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
      <button>Sign-up!</button>
    </Form>
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
      password: Yup.string().min(12, "Your password cannot be longer than 12 characters.")


      // passing a string in required makes a custom inline error msg
    }),

  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(SignupForm);

export default FormikSignup;
