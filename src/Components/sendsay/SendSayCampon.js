import React from 'react';
import classes from './SendSayCampon.module.css'
import {connect} from 'react-redux'



function SendSay({responseStatus, table}) {



let statusLetters = responseStatus.map((item, index ) => {

    let stat = ''
    let color = 'black'

   if (item.status === 1) {
     stat = table.sended
     color = 'green'
   } else if (item.status < 1) {
     stat = table.error
     color = 'red'
   } else if (item.status > 1) {
     stat = table.queue
   }

    return (
      <tr key={item.index + item.date}>
      <td>{item.date}</td>
      <td>{item.topic}</td>
      <td><span className={classes[color]}>{stat}</span></td>
      </tr>
    )
  })

    return (
  <div className={classes.SendSayCampon}>
      <h3>{table.header}</h3>
      {
        responseStatus[0] ?
        <table>
            <thead>
                <tr>
                  <th>{table.date}</th>
                  <th>{table.topic}</th>
                  <th>{table.status}</th>
                </tr>
            </thead>
            <tbody>
                  {statusLetters}
            </tbody>
       </table>
       :
       <p>{table.label}</p>
      }


  </div>
    )

}

function mapStateToProps(state) {
  return {
    responseStatus: state.app.responseStatus,
    table: state.app.table

  }
}

export default connect(mapStateToProps)(SendSay)
