import React from 'react'
import classes from './ManageFiles.module.css'
import {connect} from 'react-redux'
import {hendlerDeleteFile} from '../../store/actions/action'

function ManagePage({files, hendlerDeleteFile}) {


const file = files.map((item, index) => {
  return (
    <div
     key={item.name + index}
     className={classes.boxFile}
    >
    <div className={classes.boxFileName}>
    <span role='img'>📎</span> { item.name}

    </div>
    <div
    className={classes.boxFileDel}
    onClick={id => hendlerDeleteFile(item.name)}
    >
    Удалить &#10008;
    </div>
    </div>
  )
})

  return (
   <div className={classes.ManageFiles}>
{file}
   </div>
)}

function mapStateToProps(state) {

  return {
    files: state.app.files
  }
}

function mapDispatchToProps(dispatch) {
 return {
   hendlerDeleteFile: name => dispatch(hendlerDeleteFile(name)),
   // handleDrop: (acceptedFiles, rejectFiles) => dispatch(handleDrop(acceptedFiles, rejectFiles))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePage)
