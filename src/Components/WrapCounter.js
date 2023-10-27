import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
import axios from 'axios';
import './Style.css'

function WrapCounter({ text, count, increment, deleteFunc }) {
    const URL = process.env.REACT_APP_BASE_URL;
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        fetchButtons();
    }, []);

    const fetchButtons = () => {
        axios.get(`${URL}/Button`)
            .then(response => {
                const { data, statusCode } = response.data;
                if (statusCode === 200) {
                    setButtons(data);
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.statusCode === 404) {
                    setButtons([]);
                } else {
                    console.error("Hubo un error al obtener los botones:", error);
                }
            });
    };

    const incrementCount = (buttonId) => {
        axios.put(`${URL}/Button/${buttonId}`)
            .then(response => {
                const { statusCode } = response.data;
                if (statusCode === 200) {
                    fetchButtons();
                }
            })
            .catch(error => {
                console.error("Hubo un error al incrementar el conteo:", error);
            });
    };

    const addButton = () => {
        axios.post(`${URL}/Button`)
            .then(response => {
                const { data, statusCode } = response.data;
                if (statusCode === 200) {
                    setButtons(prevButtons => [...prevButtons, data]);
                }
            })
            .catch(error => {
                console.error("Hubo un error al agregar un botón:", error);
            });
    };

    const deleteButton = (buttonId) => {
        axios.delete(`${URL}/Button/${buttonId}`)
            .then(response => {
                const { statusCode } = response.data;
                if (statusCode === 200) {
                    fetchButtons();
                }
            })
            .catch(error => {
                console.error("Hubo un error al eliminar el botón:", error);
            });
    };

    return (
        <div className='wrap-counter'>
            {buttons.length > 0 ? (
                buttons.map(button => (
                    <ButtonComponent
                        key={button.buttonID}
                        text={`Botón: ${button.buttonID}`}
                        count={button.clickCount}
                        increment={() => incrementCount(button.buttonID)}
                        deleteFunc={() => deleteButton(button.buttonID)}
                    />
                ))
            ) : (
                <p>No hay botones disponibles.</p>
            )}
            <button className='btn-add' onClick={addButton}>Agregar</button>
        </div>
    );
}

export default WrapCounter;
