import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useApi from "../utils/useApi";
import { Link } from "react-router-dom";
import "./Search.css"
import PromotionList from "./List";
import UIButton from "../UI/Button";

const PromotionSearch = () => {
    const mountRef = useRef(null)
    const [search, setSearch] = useState("");
    const [load, loadInfo] = useApi({
        debounceDelay: 300,
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
        load({
            debounced: mountRef.current,
        })

        if (!mountRef.current) {
          mountRef.current = true;
         }
    }, [search]);

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1> Promo Show</h1>
                <UIButton component={Link} to="/create" theme="contained-green">
                    Nova Promoção
                </UIButton>
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
           error={loadInfo.error}
           />
        </div>
    )
}

export default PromotionSearch;