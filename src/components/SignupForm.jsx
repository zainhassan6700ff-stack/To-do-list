import React, { useEffect, useState } from "react";
import clsx from "clsx";
import LoginForm from "../components/LoginForm";

const SignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      if (!formFields["email"].match(/^[^@]+@[^@]+\.[^@]+$/)) {
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

    // Confirm Password
    if (!formFields["confirmPassword"]) {
      isFormValid = false;
      formErrors["confirmPassword"] = "Confirm Password cannot be empty";
    } else if (formFields["password"] !== formFields["confirmPassword"]) {
      isFormValid = false;
      formErrors["confirmPassword"] = "Confirm password is not match";
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
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-100">
      <div className="bg-white flex flex-col items-center justify-center gap-4 py-4 px-6 rounded-[8px] relative mt-5">
        <div className="mb-6 w-full flex flex-row justify-between gap-3">
          <button
            className={clsx(
              "rounded-[4px] py-2 px-[22px] text-[16px] leading-[26px] font-normal w-full",
              isLogin
                ? "bg-[#17313E] text-white"
                : "bg-white text-[#17313E] border border-[#17313E]",
            )}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={clsx(
              "rounded-[4px] py-2 px-[22px] text-[16px] leading-[26px] font-normal w-full",
              !isLogin
                ? "bg-[#17313E] text-white"
                : "bg-white border border-[#17313E] text-[#17313E]",
            )}
            onClick={() => setIsLogin(false)}
          >
            SignUp
          </button>
        </div>
        <div>
          {isLogin ? (
            <LoginForm />
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <h2 className="h2">SignUp Form</h2>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input-field"
                value={fields["email"]}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <span className="error">{errors["email"]}</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                value={fields["password"]}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <span className="error">{errors["password"]}</span>
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm Password"
                value={fields["confirmPassword"]}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
              <span className="error">{errors["confirmPassword"]}</span>
              <button className="action-button bg-[#415E72] w-full">
                SignUp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
