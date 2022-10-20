import './index.css'

function ErrorList({errors, id}) {

  const errorBorder = '2px solid rgba(222, 8, 26, 0.8)'
  const nodes = document.getElementsByTagName('form');
  for(let node of nodes){
    if(node?.hasChildNodes()){
      for( let form of node.childNodes.values()){
       if(form.nodeName === 'INPUT') {
        let formPH = form.placeholder
            if(formPH === 'Title' && errors.includes('Please input a song title')){
              form.style.border = errorBorder
            }
            if(formPH === "Audio URL" && errors.includes('Please input an audio source url')){
              form.style.border = errorBorder
            }
            if(formPH === "Album ID" && errors.includes('Please select a valid Album ID')){
              form.style.border = errorBorder}
            if(formPH === "Username or Email" && errors.includes('Please provide a valid email or username.')){
              form.style.border = errorBorder
            }
            if(formPH === "Password" && errors.includes('Please provide a password.')){
              form.style.border = errorBorder
            }
            if(formPH === 'First Name' && errors.includes('First Name is required')){
              form.style.border = errorBorder}
            if(formPH === "Last Name" && errors.includes('Last Name is required')){
              form.style.border = errorBorder}
            if(formPH === "Username" && errors.includes('Please provide a username with at least 4 characters.')){
              form.style.border = errorBorder}
            if(formPH === "Password" && errors.includes('Password must be 6 characters or more.')){
              form.style.border = errorBorder}
            if(formPH === "Confirm Password" && errors.includes('Confirm Password field must be the same as the Password field')){
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
