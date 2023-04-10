import React from "react";
import './Form.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useApi from "../utils/useApi";
import UIButton from "../UI/Button";


const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0,
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue);
    const navigate = useNavigate();
    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (response) => {
            setValues(response.data)
        }

    })
    const [save, saveInfo] = useApi({
        url: id ? `/promotions/${id}`:'/promotions',
        method: id ? 'put' : 'post',
        onCompleted: (response) => {
            if (!response.error) {
                navigate('/')
          }
        } 

    })

    useEffect(() => {
        if (id) {
           load()
        }
    }, [id]);

    function onChange(ev) {
        const { name, value } = ev.target;
        const newValues = {...values};
        newValues[name] = value
        setValues(newValues)

    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        save({
            data: values
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
            {saveInfo.loading && <span>Salvando dados...</span>}
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
                <UIButton component="button" type="submit" > Salvar </UIButton>
            </div>
        </form>
       )}
        </div>
    )

}


export default PromotionForm;