import React from 'react'
import Dropzone from 'react-dropzone'
import classes from './Upload.module.css'
import {connect} from 'react-redux'
import {closeLoadPage, handleDrop} from '../../store/actions/action'


function Upload(props) {

  return (
    <>
    <div
      className={classes.span}
      onClick={props.closeLoadPage}
      >
      X
    </div>

<Dropzone
    onDrop={(acceptedFiles, rejectFiles) => props.handleDrop(acceptedFiles, rejectFiles)}
    maxSize = {props.detailsFiles.maxSizeFile}
    accept= {props.detailsFiles.acceptFiles}
    >
  {
    ({getRootProps, getInputProps}) => (
    <section className={classes.Upload}>

      <div {...getRootProps()}>

        <input {...getInputProps()} />
        <h2>Бросайте файлы сюда, я ловлю</h2>
        <p>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. <br />Размеры файла до 5 МБ</p>
      </div>
    </section>
  )
}
</Dropzone>
</>
  )}

  function mapStateToProps(state) {
    return {
      detailsFiles: state.app.detailsFiles
    }
  }

  function mapDispatchToProps(dispatch) {
   return {
     closeLoadPage: () => dispatch(closeLoadPage()),
     handleDrop: (acceptedFiles, rejectFiles) => dispatch(handleDrop(acceptedFiles, rejectFiles))
   }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Upload)
