import React from 'react'
import classes from './Textarea.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}


export default props => {

const textareaType = props.type || 'text'
const cls = [classes.Textarea]
const htmlFor = `${textareaType}-${Math.random()}`

if (isInvalid(props)) {
  cls.push(classes.invalid)
}

return (
   <div className={cls.join(' ')} >

    <label htmlFor={htmlFor}>{props.label}</label>
    <textarea
    type={textareaType}
    id={htmlFor}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
    />

    {
      isInvalid(props)
        ? <span>{props.errorMessage || 'Введите верное значение'}</span>
        : null
    }
    
   </div>
)}
