import * as yup from 'yup'
const CommonRegexForNames=/^[a-zA-Z ]+$/;
// const Cnicno = /^[0-9]{5}[-]{1}[0-9]{7}[-]{1}[0-9]{1}$/;
// const Mobileno=/^[0-9]{4}[-]{1}[0-9]{7}$/;
export const Registerschema =yup.object().shape({
    name:yup.string().min(3,"Minimum 3 characters required").matches(CommonRegexForNames,{message:"Enter Only Alphabets"}).required("Enter Your Name Here"),
    email:yup.string().email("Enter Valid Email").required("Enter your email here"),
    password:yup.string().required("Enter Your Password"),
    confirmpassword:yup.string().oneOf([yup.ref("password")],"Password Must Match").required("Enter Your Confirm Password")
    
})

export const loginschema =yup.object().shape({
    email:yup.string().email("Enter Valid Email").required("Enter your email here"),
    password:yup.string().required("Enter Your Password"),
})