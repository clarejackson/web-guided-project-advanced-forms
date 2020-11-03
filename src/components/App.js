import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
// 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// 🔥 STEP 2- FLESH OUT FriendForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'
import { validate } from 'uuid'

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
  ///// RADIO BUTTONS /////
  civil: '',
  ///// CHECKBOXES /////
  hiking: false,
  reading: false,
  coding: false,
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  const getFriends = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios.get('http://localhost:4000/friends')
      .then(response => {
        setFriends(response.data)
      })
      .catch(error => {
        debugger
        console.log(error)
      })
  }

  const postNewFriend = newFriend => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios.post('http://localhost:4000/friends', newFriend)
    .then(response => {
      setFriends([...friends, response.data]) // do not do this on auto
      // setFormValues(initialFormValues) can put it here instead of in finally
    })
    .catch(error => {
      debugger // eslint-disable-line
      console.log(error)
    })
    .finally(() => {
      setFormValues(initialFormValues) //resets to initial values to clear the form
    })
  }

  const validate = (name, value) => {
    // let's validate this specific key/value
     // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(schema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
    }
  //   // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
  //   setFormState({
  //     ...formState,
  //     [e.target.name]: e.target.value
  //   });
  // };
  // }

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      // 🔥 STEP 7- WHAT ABOUT HOBBIES?
      hobbies: ['coding', 'reading', 'hiking'].filter(hob => formValues[hob])
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
    })
  }, [formValues])

  // THIS IS AN EXAMPLE!!
  /* Each time the form value state is updated, check to see if it is valid per our schema. 

  // This will allow us to enable/disable the submit button.*/

  // useEffect(() => {
  //   /* We pass the entire state into the entire schema, no need to use reach here. 
  //   We want to make sure it is all valid before we allow a user to submit
  //   isValid comes from Yup directly */

  //   formSchema.isValid(formState).then(valid => {
  //     setButtonDisabled(!valid);
  //   });
  // }, [formState]);

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
    }
