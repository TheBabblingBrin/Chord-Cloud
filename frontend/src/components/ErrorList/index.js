import './index.css'

function ErrorList({errors}) {

  const errorBorder = '2px solid rgba(222, 8, 26, 0.8)'
  const nodes = document.getElementsByTagName('form');
  for(let node of nodes){
    if(node?.hasChildNodes()){
      for( let form of node.childNodes.values()){
       if(form.nodeName === 'INPUT') {
        console.log(errors)
        let formPH = form.placeholder
            if(formPH === 'Title' && errors.includes('Please input a song title')){
              form.style.border = errorBorder
            }
            if(formPH === "Audio URL" && errors.includes('Please input an audio source url')){
              form.style.border = errorBorder
            }
            if(formPH === "Image URL" && errors.includes('Please input an image source url')){
              form.style.border = errorBorder
            }
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

  console.log(nodes)
  // if(nodes.hasChildNodes()){
  //   let children = nodes.childNodes
  //   console.log('children++++++++++++++++++++++', children)
  // }
  // console.log(nodes)
//   for(let i=0; i< nodes.length; i++) {
//     if (nodes[i].nodeName.toLowerCase() == 'input') {
//          nodes[i].style.border = '1px solid red';
//      }
// }


  return (

            <ul className='error-list'>
                {errors.map((error) => (
                            <li key={error}><i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
            </ul>
  )
}

export default ErrorList;
