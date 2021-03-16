import React, { useState } from 'react'

export const BandAdd = ({agregar}) => {

    const [valor, setValor] = useState('');

    const onSubmit = (ev) =>{
        ev.preventDefault();
        
        agregar(valor);

    }


    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={ onSubmit }>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre banda"
                    value={valor}
                    onChange = {(ev)=>setValor(ev.target.value)}
                />
            </form>
        </>
    )
}
