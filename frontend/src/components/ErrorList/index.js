
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react'
import './index.css'

function ErrorList({errors, id}) {
  const dispatch = useDispatch()
  const errorBorder = '2px solid rgba(222, 8, 26, 0.8)'
  const noErrorBorder = '1px solid rgba(107, 106, 106, 0.5)'
  const nodes = document.getElementsByTagName('form');

  useEffect(() => {

  },[errors])


  for(let node of nodes){
    if(node?.hasChildNodes()){
      for( let form of node.childNodes.values()){
       if(form.nodeName === 'INPUT') {
        let formPH = form.placeholder
            form.style.border = noErrorBorder
            if(formPH === 'Title' && (errors.includes('Song title is required') || errors.includes('Song title must be between 4 and 200 characters'))){
              form.style.border = errorBorder
            }
            if(formPH === "Audio URL" && errors.includes('Audio is required')){
              form.style.border = errorBorder
            }
            if(formPH === "Album ID" && (errors.includes('Please select a valid Album ID')|| errors.includes('Album does not exist'))){
              form.style.border = errorBorder}
            if(formPH === "Username or Email" && errors.includes('Please provide a valid email or username.')){
              form.style.border = errorBorder
            }
            if(formPH === "Password" && errors.includes('Please provide a password.')){
              form.style.border = errorBorder
            }
            if(formPH === 'First Name' && (errors.includes('First Name is required') || errors.includes('First Name must be between 1 and 100 characters'))){
              form.style.border = errorBorder}
            if(formPH === "Last Name" && (errors.includes('Last Name is required') || errors.includes('Last Name must be between 1 and 100 characters'))){
              form.style.border = errorBorder}
            if(formPH === "Email" && errors.includes('Please provide a valid email.')){
                form.style.border = errorBorder}
            if(formPH === "Username" && errors.includes('Please provide a username between 4 and 50 characters.')){
              form.style.border = errorBorder}
            if(formPH === "Password" && errors.includes('Password must be 6 and 30 characters.')){
              form.style.border = errorBorder}
            if(formPH === "Confirm Password" && errors.includes('Confirm Password field must be the same as the Password field')){
              form.style.border = errorBorder}
            if(formPH === "Description" && errors.includes("Song description must be less than 250 characters")){
                form.style.border = errorBorder}

       }
      }
    }
  }


  return (

            <ul className='error-list' id={id}>
                {errors.map((error) => (
                            <li key={error}><i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
            </ul>
  )
}

export default ErrorList;
