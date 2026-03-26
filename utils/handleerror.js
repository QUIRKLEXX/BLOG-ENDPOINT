 const handleerror = (err) => {

    let errors = {name: '', email: '',password: ''};
    
    if(err.code === 11000) {
        errors.email = 'Email is already in use'
        errors.name = 'password invalid'
        errors.password = 'Name is already in use'
       return errors;
    }
    if (err.message === 'incorrect email') {
         errors.email = 'This email or password is not registered'
         return errors;
        }

     if (err.message === 'Incorrect password') {
        errors.password = 'Thi email or password is not registered'
         return errors;
        
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
        })
    }
    return errors;
 }

 module.exports = handleerror;