import React from "react";
import useApi from "../utils/useApi";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css"
import PromotionList from "./List";


const PromotionSearch = () => {
    const [promotions, setPromotions] = useState([]);
    const [search, setSearch] = useState("");
    const [load, loadInfo] = useApi({
        url:'http://localhost:3000/promotions',
        method: 'get',
        params: {
            _embed:'comments',
            _order:'desc',
            _sort:'id',
            title_like: search || undefined,
        },
        onCompleted: (response) =>{
            setPromotions(response.data)
        }
    });

    console.log(loadInfo.data)

    useEffect(() => {
        load()
    }, [search]);

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1> Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input 
            className="promotion-search__input" 
            type="search" 
            placeholder="Buscar"
            onChange={(ev) => setSearch(ev.target.value)}
            />
           <PromotionList promotions = {promotions} loading={!promotions.length}/>
        </div>
    )
}

export default PromotionSearch;