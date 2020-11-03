// Here goes the schema for the form
import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be 3 characters or longer'),
  email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  role: yup.string()
    .oneOf(['tl', 'instructor', 'alumni', 'student'], 'Role is required'),
  civil: yup.string()
    .required(['single', 'married'], 'Civil status is required'),
  //we are done with checkboxes
  hiking: yup.boolean(),
  reading: yup.boolean(),
  coding: yup.boolean()
})

//Example!!
// const formSchema = Yup.object().shape({
//   email: Yup
//     .string()
//     .email("Must be a valid email address.")
//     .required("Must include email address."),
//   password: Yup
//     .string()
//     .min(6, "Passwords must be at least 6 characters long.")
//     .required("Password is Required")
//   terms: Yup
//     .boolean()
//     .oneOf([true], "You must accept Terms and Conditions")
//     // required isn't required for checkboxes.
// });