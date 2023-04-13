import React, {useState} from "react";
import PromotionCard from "./Card";
import PromotionModal from "./Modal";
import useApi from "../utils/useApi";
import './List.css';

const PromotionList = ({ loading, error, promotions }) => {
    const [promotionId, setPromotionId] = useState(null)
    const [deletePromotion, deletePromotionInfo] = useApi({
        method: 'DELETE',
    })

    if (error) {
        return <div>Algo de errado, não está certo</div>
    }
    if (loading || promotions === null) {
        return <div>Carregando...</div>
    }
    if (promotions.length === 0) {
        return <div>Nenhum resultado encontrado</div>
    }


    return (

        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard 
                promotion={promotion} 
                onClickComments = {() => setPromotionId(promotion.id)}
                onClickDelete={() => {
                    deletePromotion({
                        url: `/promotions/${promotion.id}`
                    })
                }} 
                />
             ))}
            {promotionId && (
            <PromotionModal 
                promotionId={promotionId} 
                onClickClose={() => setPromotionId(null)}
            />  
            )} 
        </div>

    )
}

export default PromotionList;