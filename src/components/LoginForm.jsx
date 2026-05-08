import React from "react";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState([]);

  const handleValidation = () => {
    const formFields = { ...fields };
    const formErrors = {};
    let isFormValid = true;

    // Email
    if (!formFields["email"]) {
      isFormValid = false;
      formErrors["email"] = "Cannot be empty";
    }

    if (typeof formFields["email"] !== "undefined") {
      if (!formFields["email"].match("^[^@]+@[^@]+\.[^@]+$")) {
        isFormValid = false;
        formErrors["email"] = "Email is not valid";
      }
    }

    // Password
    if (!formFields["password"]) {
      isFormValid = false;
      formErrors["password"] = "Cannot be empty";
    }

    if (typeof formFields["password"] !== "undefined") {
      if (
        !formFields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ) {
        isFormValid = false;
        formErrors["password"] =
          "Minimum eight characters, at least one letter and one number";
      }
    }

    setErrors(formErrors);
    return isFormValid;
  };

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setFormValues((prevFormValues) => [...prevFormValues, fields]);
      alert("Form is submitted successfully");
    } else {
      alert("Form is not submitted");
    }
  };

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="h2">Login Form</h2>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="input-field"
        value={fields["email"]}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <span className="text-red-600 text-[12px] leading-[16px] font-light">
        {errors["email"]}
      </span>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={fields["password"]}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <span className="text-red-600 text-[12px] leading-[16px] font-light">
        {errors["password"]}
      </span>
      <a
        href="#"
        className="block text-[#17313E] text-[18px] leading-[26px] font-normal"
      >
        Forgot Password
      </a>
      <button
        id="submit"
        type="submit"
        className="action-button bg-[#415E72] w-full"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
