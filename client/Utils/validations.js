  let required = (propertyType) => {
    return v => v && v.length > 0 || `You must add a ${propertyType}`
  }

  let requiredImage = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required`
  }
  
  let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
  }
  let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
  }
  
  let emailFormat = () => {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    return v => v && regex.test(v) || "Must be a valid email"
  }
  
  let confirmation = (propertyType) => {
    return v => v && v === propertyType || "Passwords must match"
  }

  let categoriesRules = (propertyType)=>{
    return v => v.length >= 1 || `At least one ${propertyType} is required`
  }


  export default {
    required,
    requiredImage,
    minLength,
    maxLength,
    emailFormat,
    confirmation,
    categoriesRules
  }