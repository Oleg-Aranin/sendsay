import React from 'react'
import classes from './MainPage.module.css'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Attach from '../Attach/Attach'
import Btn from '../Btn/Btn'
import Upload from '../Upload/Upload'
import ManageFiles from '../ManageFiles/ManageFiles'
import {connect} from 'react-redux'
import {onChange} from '../../store/actions/action'


function MainPage(props) {

  const inputArray = Object.keys(props.formControls).map((controlName, index) => {
         const {validation, ...control} = props.formControls[controlName]

         return (
           index < 5 ?
           <Input
             key={controlName + index}
             shouldValidate={!!validation}
             onChange={e => props.onChange(e, controlName)}
             {...control}
           />
         :
         <Textarea
           key={controlName + index}
           shouldValidate={!!validation}
           onChange={e => props.onChange(e, controlName)}
           {...control}
         />
         )
       })





  return (
   <div className={classes.MainPage}>

     <div className={classes.label}>
       <p>{props.mainLabel}</p>
     </div>

     <div className={classes.from}>
       {inputArray[0]}
       {inputArray[1]}
     </div>
     <div className={classes.to}>
       {inputArray[2]}
       {inputArray[3]}
     </div>
     <div className={classes.topic}>
      {inputArray[4]}
     </div >
     <div >
      {inputArray[5]}
    </div>

     <Attach />

     <Btn />

     <ManageFiles />

    { props.loadPage ? <Upload/> : null }

   </div>
)}

function mapStateToProps(state) {
  return {
    loadPage: state.app.loadPage,
    formControls: state.app.formControls,
    mainLabel: state.app.mainLabel
  }
}

function mapDispatchToProps(dispatch) {
 return {
    onChange: (e, controlName) => dispatch(onChange(e, controlName))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
