import Sendsay from '../../Components/sendsay/Sendsay1'

import {
  CLOSE_LOAD_PAGE,
  PUSH_FILES,
  SHOW_LOAD_PAGE,
  DATA_FORM,
  PUSH_FILE,
  CLEAN_FORM_CONTROLS,
  FILE_WILL_DELETED
} from './actionTypes'



export function closeLoadPage() {
  return {
     type: CLOSE_LOAD_PAGE
   }
}

export function handleDrop(acceptedFiles, rejectFiles) {

  return async (dispatch, getState) => {

    if (rejectFiles[0]) {
       alert('Такой файл мы не принимаем. Проверьте тип и размер файла')
     }


   let allSizeLetter = [...acceptedFiles, ...getState().app.files].reduce((total, {size}) => {
     return total + size
   }, 0)


     if (allSizeLetter <= getState().app.detailsFiles.maxSizeLetter) {

           const stateFiles = [...getState().app.files, ...acceptedFiles]


     dispatch(pushFiles(stateFiles))

   } else {
     alert('Слишком большое письмо. Максимум 20 Мб')
   }
  }
}

export function pushFiles(files) {
  return {
     type: PUSH_FILES,
     files
   }
}

export function showLoadPage() {
  return {
     type: SHOW_LOAD_PAGE
   }
}

// ====================================== mainPage


export function onChange(e, controlName) {

    return  (dispatch, getState) => {

let formControls = {...getState().app.formControls}
let control = {...formControls[controlName]}
    control.value = e.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })


dispatch(dataForm(formControls, isFormValid))

}
}

export function dataForm(data, valid) {
return {
  type: DATA_FORM,
  data,
  valid
}
}

export function validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  export function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  //============================sended

  export function sandRequest() {

    return  (dispatch, getState) => {

    let log = {
     action : "login",
     login  : "89217409387@mail.ru",
     sublogin : "",
     passwd : "vi8Shingo"
    }


    let dataRequest = {...getState().app.formControls}
    let fileName = ''


    if (getState().app.files[0]) {
    fileName = getState().app.files[0].name
    }


    let request = {
      "action" : "issue.send.test",
      "session": "",
      "letter" : {
        "subject" : `${dataRequest.topicOfTheLetter.value}`,
        "from.name" : `${dataRequest.name.value}`,
        "from.email" : `${dataRequest.email.value}`,
        "to.name" : `${dataRequest.nameTo.value}`,
        "message": { "text" : `${dataRequest.text.value}` },
        "attaches": [
                      {
                        "name" : `${fileName}`,
                        "content": `${getState().app.files}`,
                        "encoding" : "base64",
                      }
                    ]
      },
      "sendwhen": "test",
      "mca": [
        `${dataRequest.emailTo.value}`,
      ]

    }

  sendRequests(getState)


  async function sendRequests(getState) {

   let sendsay =  new  Sendsay({ apiUrl: 'https://api.sendsay.ru/clu180' })

   let setLogin = await sendsay.request(log)

   let getTrackId = {...request, session: setLogin.session}

   let getStatus = await sendsay.request(getTrackId)

   let res2 = { "action": "track.get", "id": getStatus["track.id"], "session":  setLogin.session}

   let statusRes = await sendsay.request(res2)

   if(statusRes) {
     let fileValue = {
        date: statusRes.obj.dt,
        status: statusRes.obj.status,
        topic: getState().app.formControls.topicOfTheLetter.value
  }

     let statusRespose = [...getState().app.responseStatus, fileValue]


  dispatch(pushFilesToState(statusRespose))

  dispatch(cleanStateHendler())

  } else {
    alert('Что то пошло не так. Попробуйте позже')
  }
  }
  }
  }

  export function pushFilesToState(file) {
   return {
     type: PUSH_FILE,
     file
   }
  }

  export function cleanStateToinitial(clean) {
   return {
     type: CLEAN_FORM_CONTROLS,
     clean
   }
  }

  export function cleanStateHendler() {

  return (dispatch, getState ) => {


    let formControls = {...getState().app.formControls}


  Object.keys(formControls).forEach(item => {


    let name = {...formControls[item]}
        name.value = ''
        name.valid = false
        name.touched = false
        formControls[item] = name


  })


        dispatch(cleanStateToinitial(formControls))

  }
  }

  //==============================deleteFile

  export function hendlerDeleteFile(id) {

    return (dispatch, getState ) => {

    const stateFiles = getState().app.files

    const files = stateFiles.filter(({name}) => name !== id)

    dispatch(fileWillDeleted(files))
  }
}

export function fileWillDeleted(filelDel) {
 return {
   type: FILE_WILL_DELETED,
   filelDel
 }
}
