import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
import axios from 'axios';
import './Style.css';

function WrapCounter() {
    const URL = process.env.REACT_APP_BASE_URL;
    const [buttons, setButtons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/Button`);
                const { data, statusCode } = response.data;
                if (statusCode === 200) {
                    setButtons(data);
                }

            } catch (error) {
                if (error.response && error.response.data && error.response.data.statusCode === 404) {
                    setButtons([]);
                }
            }
        };

        fetchData();
    }, []);



    const fetchButtons = async () => {
        try {
            const response = await axios.get(`${URL}/Button`);
            const { data, statusCode } = response.data;
            if (statusCode === 200) {
                setButtons(data);
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.statusCode === 404) {
                setButtons([]);
            }
        }

    };

    const incrementCount = async (buttonId) => {
        try {
            const response = await axios.put(`${URL}/Button/${buttonId}`);
            const { statusCode } = response.data;
            if (statusCode === 200) {
                await fetchButtons();
            }
        } catch (error) {
            setError("Hubo un error al incrementar el conteo.");
        }
    };

    const addButton = async () => {
        try {
            const response = await axios.post(`${URL}/Button`);
            const { data, statusCode } = response.data;
            if (statusCode === 200) {
                setButtons(prevButtons => [...prevButtons, data]);
            }
        } catch (error) {
            setError("Hubo un error al agregar un botón.");
        }
    };

    const deleteButton = async (buttonId) => {
        try {
            const response = await axios.delete(`${URL}/Button/${buttonId}`);
            const { statusCode } = response.data;
            if (statusCode === 200) {
                await fetchButtons();
            }
        } catch (error) {
            setError("Hubo un error al eliminar el botón.");
        }
    };

    return (
        <div className='wrap-counter'>
            {error && <p>{error}</p>}
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
