import React from 'react'

const Selection = ({select}) => {
  return (
    <>
        {
      select.map((item)=>{
          return(
            <div className="selection">
              <span className='name'>name :</span> - <span>{item.name}</span>
              <span className='email'>Email:</span> - <span>{item.email}</span>
            </div>
          )
        })
    }
    </>
  )
}

export default Selection
