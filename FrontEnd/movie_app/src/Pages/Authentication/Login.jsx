import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "../../Components/TextField";
import { loginschema } from "./Validation_Schema/Schema";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import axios from "axios";
import { config } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { LoggedIn } from "../../ReduxToolkit/Slice/StoreToken";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

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
const loginfunction = async(value)=>
{
  try {
    setLoading(true);
      const res = await axios.post(`${config.ApiUrl}user/Login`, value);
      if(res.data.status === 200)
      {
        setTimeout(() => {
          setLoading(false)
          notify(res.data.message);
          handleresetfun()
          setTimeout(() => {
            localStorage.setItem("auth", JSON.stringify(res.data.token));
            localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(LoggedIn(res.data.token))
            navigate('/')
            console.log(res)
          }, 2000);

        }, 2000);
      }
      else if(res.data.status === 401)
      {
        setTimeout(() => {
          setLoading(false)
          notifyerror(res.data.message);

        }, 2000);
      }
      else 
      {
        setTimeout(() => {
          setLoading(false)
          notifyerror(res.data.message);

        }, 2000);
      }
  } catch (error) {
    notifyerror(error.message);
  }
}
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
      email: "",
      password: "",
    },
    validationSchema: loginschema,
    onSubmit: (value) => {
      // Add your login API call here
      loginfunction(value)
    },
  });
const handleresetfun = ()=>
{
  resetForm()
}
  return (
    <>
    <ToastContainer />
      <div className="flex flex-col justify-center items-center min-h-screen sm:p-0 px-16">
        <div className="flex flex-col gap-8 signin_form px-8 py-6 shadow">
          <div className="flex justify-center gap-1">
            <h1>Login</h1>
          </div>

          {/* Login Form */}
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit}
            id="login_form"
          >
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
          </form>

          <div className="flex flex-col gap-4">
            {/* Submit Button */}
            <button
              type="submit"
              form="login_form"
              className="px-4 py-3 flex items-center justify-center bg-blue-500 w-full text-white rounded border-none cursor-pointer text-base"
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
                    stroke="currentColor"
                    strokeWidth="4"
                    cx="12"
                    cy="12"
                    r="10"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="flex sm:flex-row flex-col items-center justify-center gap-2 text-sm text-center">
              Don't Have an Account? <Link to={"/register"}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
