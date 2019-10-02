import React from 'react'
import classes from './Attach.module.css'
import {connect} from 'react-redux'
import {showLoadPage} from '../../store/actions/action'


function Attach({ attach, showLoadPage }) {

return (
   <div className={classes.Attach}
     onClick={showLoadPage}
     >
     <span>{`${attach.sign}  ${attach.text}` }</span>
   </div>
)
}

function mapStateToProps(state) {
  return {
    attach: state.app.attach
  }
}

function mapDispatchToProps(dispatch) {
 return {
   showLoadPage: () => dispatch(showLoadPage())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attach)
