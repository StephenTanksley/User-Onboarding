import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup';
import axios from 'axios'

const App =({ errors, touched, status }) =>  {

  console.log(status)
  const [users, setUsers] = useState([])

  // errors === form validation errors that come from formik
  // touched === an object with true/false for each input field, whether the user has touched it yet or not
  // status === an object coming from formik containing a new animal (from when we call setStatus)  

  useEffect(() => {
    if(status) {
      setUsers([...users, status])
    }
  }, [status])

  return (
    <div className="App">
      <h1>This is my React Header</h1>
        <Form>
          {touched.name && errors.name && <p className='error'>{errors.name}</p>}
          <Field type="text" name="name" placeholder="Name" />

          {touched.email && errors.email && <p className='error'>{errors.email}</p>}
          <Field type="text" name="email" placeholder="Email" />

          {touched.password && errors.password && <p className='error'>{errors.password}</p>}
          <Field type="text" name="password" placeholder="Password" />

          {touched.terms && errors.terms && <p className='error'>{errors.terms}</p>}
          <label>  
            <span>Have you read our Terms and Conditions?</span>
            <Field type="checkbox" name = "terms" />
          </label>
          <button type="submit" name="submit">Submit</button>

        {users.map((user) => {
          return <div>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Password: {user.notes}</p>
        </div>
          })}

        </Form>
    </div>
  );
}

export default withFormik({

  mapPropsToValues: (values) => {

   return {
     name: values.name || '',
     email: values.email || '',
     password: values.password || '',
     terms: values.terms || false,
   }
 },

validationSchema: yup.object().shape({
  name: yup.string().required('User\'s name is required.'),
  email: yup.string().required('User\'s email address is required.'),
  password: yup.string().required('User must enter a password.'),
  terms: yup.boolean().oneOf([true], 'User must agree to Terms and Conditions to proceed.')
}),

handleSubmit: (values, { setStatus }) => {
  axios.post('https://reqres.in/api/users_', values)
    .then((res) => {
      console.log(res)
      setStatus(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
})(App)