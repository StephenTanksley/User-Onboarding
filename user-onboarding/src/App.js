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
            <Field type="checkbox" name = "terms" />
            <span>Have you read our Terms and Conditions?</span>
          </label>
          <button type="submit" name="submit">Submit</button>

        {users.map((user) => {
          return <div>
            <h2>Name: {user.name}</h2>
            <p>Diet: {user.email}</p>
            <p>Notes: {user.notes}</p>
        </div>
          })}

        </Form>
    </div>
  );
}

export default withFormik({

})(App)