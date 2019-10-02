import React from 'react'
import classes from './Btn.module.css'
import {connect} from 'react-redux'
import {sandRequest} from '../../store/actions/action'

function Btn(props) {

  const cls = [
      classes.Btn,
      classes['primary']
    ]

  return (
    <button
      className={cls.join(' ')}
      disabled={props.loadPage || !props.isFormValid}
      onClick={props.sandRequest}
   >{props.text}
   </button>
)}


function mapStateToProps(state) {
  return {
    loadPage: state.app.loadPage,
    isFormValid: state.app.isFormValid,
    text: state.app.btn.text
  }
}

function mapDispatchToProps(dispatch) {
 return {
    sandRequest: (e, controlName) => dispatch(sandRequest(e, controlName))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Btn)
