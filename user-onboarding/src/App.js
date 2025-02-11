import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup';
import axios from 'axios'
import { FormContainer, Header, Container } from './Components/Styled'

const App =({ errors, touched, status }) =>  {

  console.log(status)
  const [users, setUsers] = useState([])
  
  // const resetForm = () => {
    //   setUsers(initialState)
    // }
  // const initialState = { name: '', email: '', password: '', role: '', terms: false}
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
      <Container>
        <Header>User Portal</Header>
          <FormContainer>  
          <Form>
            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type="text" name="name" placeholder="Name" /><br /><br />

            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type="text" name="email" placeholder="Email" /><br /><br />

            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type="text" name="password" placeholder="Password" /><br /><br />

            {touched.role && errors.role && <p className='error'>{errors.role}</p>}
            <Field component="select" name="role" placeholder="Role">
              <option value="" disabled>Select Role: </option>
              <option value="developer">Developer</option>
              <option value="legal">Legal</option>
              <option value="ux-designer">UX Designer</option>
            </Field><br /><br />


            {touched.terms && errors.terms && <p className='error'>{errors.terms}</p>}
            <label>  
              <span>Do you agree to the Terms and Conditions?</span>
              <Field type="checkbox" name = "terms" />
            </label><br /><br />
            <button type="submit" name="submit">Submit</button>
            </Form>
          </FormContainer>

          {users.map((user, index) => {
            return <div className="user-card" key={index}>
              <h3>Name: {user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
              <p>Role: {user.role}</p>
              {console.log(user[index])}
          </div>
            })}

      </Container>
    </div>
  );
}


export default withFormik({

  mapPropsToValues: (values) => {

   return {
     name: values.name || '',
     email: values.email || '',
     password: values.password || '',
     role: values.role || '',
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
      // resetForm();
    })
    .catch((err) => {
      console.log(err)
    })
  }
})(App)