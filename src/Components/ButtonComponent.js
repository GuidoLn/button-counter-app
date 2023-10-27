import React from 'react';
import './Style.css'

function ButtonComponent({ text, count, increment, deleteFunc }) {
  return (
    <div>
      <button className='btn-increment' onClick={increment}>{text} </button>
      <span>{count} clicks</span> 
      <button className='btn-delete' onClick={deleteFunc}>Eliminar</button>
    </div>
  );
}

export default ButtonComponent;
