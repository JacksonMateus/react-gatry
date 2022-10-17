import React from "react";
import axios from "axios"
import './Form.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/promotions/${id} `)
                .then((response) => {
                    setValues(response.data)
                })
        }
    }, []);

    function onChange(ev) {
        const { name, value } = ev.target;
        const newValues = {...values};
        newValues[name] = value
        setValues(newValues)

    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const method = id ? 'put' : 'post';
        const url = id ? `http://localhost:3000/promotions/${id}` : 'http://localhost:3000/promotions'

        axios[method](url, values)
            .then(() => {
                navigate('/')
            })

    }

    return (
        <div>
        <h1>Promo Show</h1>
        <h2>Nova Promoção</h2>
        {!values ?
            (<div> Carregando...</div> )
        : (
        <form onSubmit={onSubmit} >
            <div className="promotion-form__group">
                <label htmlFor="title">Título</label>
                <input name="title" id="title" type="text" onChange={onChange} value={values.title} />

                <label htmlFor="url">Link</label>
                <input name="url" id="url" type="text" onChange={onChange} value={values.url} />

                <label htmlFor="imageUrl">Imagem (URL)</label>
                <input name="imageUrl" id="imageUrl" type="text" onChange={onChange} value={values.imageUrl} />

                <label htmlFor="price">Preço</label>
                <input name="price" id="price" type="number" onChange={onChange} value={values.price} />
            </div>

            <div>
                <button type="submit" > Salvar </button>
            </div>
        </form>
       )}
        </div>
    )

}


export default PromotionForm;