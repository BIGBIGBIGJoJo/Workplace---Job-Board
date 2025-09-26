import React from 'react'
import { BsFillPersonFill } from "react-icons/bs";

const PersonCard = ({ name, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <BsFillPersonFill className="w-32 h-32 mx-auto mb-4" />
      <h3 className="text-xl font-medium">{name}</h3>
      <p className="text-gray-600">{title}</p>
      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  )
}

export default PersonCard