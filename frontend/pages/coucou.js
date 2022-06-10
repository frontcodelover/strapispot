import React from 'react'




export default function coucou({data}) {
  console.log(data)


  return (
    <div>
    {data.data.map(element => (element.attributes.name))}
    </div>
  )
}
