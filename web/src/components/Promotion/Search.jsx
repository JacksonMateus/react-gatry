import React, { useRef } from "react";
import useApi from "../utils/useApi";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css"
import PromotionList from "./List";
import UIInfiniteScroll from "../UI/InfiniteScroll";

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
            _page: 1,
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
           error={loadInfo.error}
           />
           {loadInfo.data && (
                <UIInfiniteScroll fetchMore={() => console.log('Apareceu na tela')} />
            )}
        </div>
    )
}

export default PromotionSearch;