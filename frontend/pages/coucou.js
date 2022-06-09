import React from 'react'


export default function coucou({data}) {
  console.log(data)
//  const myId = Object.values(data)

//  myId.map(data => data.id)

// data.forEach(element => {
  //   console.log(element.id)
  // });
  
  return (
    <div>
    {data.data.map(element => (element.attributes.name))}
      {/* {myId} */}
    </div>
  )
}
