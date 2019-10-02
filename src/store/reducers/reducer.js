import {
  CLOSE_LOAD_PAGE,
  PUSH_FILES,
  SHOW_LOAD_PAGE,
  DATA_FORM,
  CLEAN_FORM_CONTROLS,
  PUSH_FILE,
  FILE_WILL_DELETED
} from '../actions/actionTypes'



     const initialState = {
       mainLabel: 'Отправлялка сообщений',
       isFormValid: false,
       formControls: {
           name: {
           value: '',
           type: 'text',
           id: 'name',
           label: 'От кого',
           placeholder: 'Имя',
           errorMessage: 'Имя не может быть менее двух букв ',
           valid: false,
           touched: false,
           validation: {
             required: true,
             minLength: 2
         }
       },
           email: {
           value: '',
           type: 'email',
           id: 'email',
           label: '',
           placeholder: 'Email',
           errorMessage: 'Введите корректный email',
           valid: false,
           touched: false,
           validation: {
             required: true,
             email: true
         }
       },
           nameTo: {
           value: '',
           type: 'text',
           id: 'nameTo',
           label: 'Кому',
           placeholder: 'Имя',
           errorMessage: 'Имя не может быть менее двух букв',
           valid: false,
           touched: false,
           validation: {
             required: true,
             minLength: 2
         }
       },
           emailTo: {
           value: '',
           type: 'email',
           id: 'emailTo',
           label: '',
           placeholder: 'Email',
           errorMessage: 'Введите корректный email',
           valid: false,
           touched: false,
           validation: {
             required: true,
             email: true
         }
       },
       topicOfTheLetter: {
         value: '',
         type: 'text',
         id: 'topicOfTheLetter',
         label: 'Тема письма',
         placeholder: 'Моя тема письма',
         errorMessage: 'Не менее 5 символов',
         valid: false,
         touched: false,
         validation: {
           required: true,
           minLength: 5
       }
    },
    text: {
      value: '',
      type: 'text',
      id: 'text',
      label: 'Сообщение',
      placeholder: 'Введите Ваше сообщение',
      errorMessage: 'Не менее 20 символов',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 20
    }
   }
   },
   attach: {
     text: 'Прикрепить файл',
     sign: '📎'
   },
   btn: {
     text: 'Отправить'
   },
   files: [],
   detailsFiles: {
     maxSizeFile: 5e+6,
     maxSizeLetter: 5e+6 * 4,
     acceptFiles: ['.jpg', '.png', '.gif', '.doc', '.xls', '.pdf', '.zip']
   },
   loadPage: false,
   responseStatus: [],
   table: {
     header: 'Отправленные сообщения ',
     label: 'Сообщения ещё не отправлялись',
     date: 'Дата',
     topic: 'Тема',
     status: 'Статус',
     sended: 'Отправлено',
     queue: 'В очереди',
     error: 'Ошибка'
   }
   }

   export default function appReducer(state = initialState, action) {

   switch (action.type) {
     case CLOSE_LOAD_PAGE:
       return {
         ...state, loadPage: false
       }
     case PUSH_FILES:
       return {
         ...state, loadPage: false, files: action.files
       }
     case SHOW_LOAD_PAGE:
       return {
         ...state, loadPage: true
       }
     case DATA_FORM:
       return {
         ...state,
         formControls: action.data,
         isFormValid: action.valid
       }
     case PUSH_FILE:
       return {
         ...state, responseStatus: action.file
       }
     case CLEAN_FORM_CONTROLS:
       return {
         ...state, formControls: action.clean, files: []
       }
     case FILE_WILL_DELETED:
       return {
         ...state, files: action.filelDel
       }
     default:
       return state
   }
   }
