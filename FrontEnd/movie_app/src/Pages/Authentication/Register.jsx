import React, { useState } from "react";
import TextField from "../../Components/TextField";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Registerschema } from "./Validation_Schema/Schema";
import axios from "axios";
import { config } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility toggle

  const notify = (data) =>
    toast.success(data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyerror = (data) =>
    toast.error(data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const SubmitSignupForm = async (value) => {
    try {
      setLoading(true);
      const res = await axios.post(`${config.ApiUrl}user/Register`, value);
      if (res.data.status === 200) {
        setTimeout(() => {
        setLoading(false);
        notify(res.data.message);
        handlereset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        }, 2000);
      } else {
        setLoading(false);
        notifyerror(res.data.error);
      }
    } catch (error) {
      notifyerror(error.message);
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Registerschema,
    onSubmit: (value) => {
      SubmitSignupForm(value);
    },
  });

  const handlereset = () => {
    resetForm();
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center min-h-screen sm:p-0 px-4 py-8">
        <div className="w-full flex flex-col gap-8 signup_form px-8 py-3 max-w-md shadow">
          <div className="flex flex-col items-center gap-1">
            <h1>Sign up</h1>
            <span>Sign up to continue</span>
          </div>

          {/* Sign up Form */}
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit}
            id="sign_up_form"
          >
            <TextField
              Label={"Name"}
              type={"text"}
              name={"name"}
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
              onBlur={handleBlur}
            />
            <TextField
              Label={"Email"}
              type={"email"}
              name={"email"}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
              onBlur={handleBlur}
            />
            <div className="relative">
              <TextField
                Label={"Password"}
                type={showPassword ? "text" : "password"}
                name={"password"}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                touched={touched.password}
                onBlur={handleBlur}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash style={{color:"gray"}}/> : <FaEye style={{color:"gray"}}/>}
              </span>
            </div>
            <div className="relative">
              <TextField
                Label={"Confirm Password"}
                type={showConfirmPassword ? "text" : "password"}
                name={"confirmpassword"}
                value={values.confirmpassword}
                onChange={handleChange}
                error={errors.confirmpassword}
                touched={touched.confirmpassword}
                onBlur={handleBlur}
              />
              <span
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash  style={{color:"gray"}}/> : <FaEye  style={{color:"gray"}}/>}
              </span>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            {/* Submit Button */}
            <button
              type="submit"
              form="sign_up_form"
              className="px-4 py-3 flex items-center justify-center bg-blue-500 w-full text-white rounded border-none cursor-pointer text-base disabled:opacity-50"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Signing up..." : "Sign up"}
            </button>
            <div className="flex sm:flex-row flex-col items-center justify-center sm:gap-2 gap-0 text-sm text-center">
              Already have an account <Link to={"/login"}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
