import React from "react";
import useApi from "../utils/useApi";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css"
import PromotionList from "./List";


const PromotionSearch = () => {
    const [search, setSearch] = useState("");
    const [load, loadInfo] = useApi({
        url:'/promotions',
        method: 'get',
        params: {
            _embed:'comments',
            _order:'desc',
            _sort:'id',
            title_like: search || undefined,
        },
        
    });


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
           <PromotionList 
           promotions = {loadInfo.data} 
           loading={loadInfo.loading}
           error={loadInfo.error}/>
        </div>
    )
}

export default PromotionSearch;