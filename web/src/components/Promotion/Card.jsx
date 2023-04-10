import React from "react";
import './Card.css'
import { Link } from "react-router-dom";
import UIButton from "../UI/Button";

const PromotionCard = ({ promotion, onClickComments }) => (
    <div className="promotion-card">
        <img src={promotion.imageUrl} className="promotion-card__image" />
        <div className="promotion-card__info">
            <h1 className="promotion-card__title">{promotion.title} </h1>
            <span className="promotion-card__price"> R$ {promotion.price}</span>
            <footer className="promotion-card__footer">
                <button className="promotion-card__comments-count" onClick={onClickComments}> 
                {promotion.comments.length} 
                {promotion.comments.length > 1 ? " Comentários":" Comentário"}
                </button>
                <UIButton 
                    component="a" 
                    href={promotion.url} 
                    target="_blanck" 
                    rel="noopener noreferrer"
                >
                    Ir Para o Site
                </UIButton>
                <UIButton
                    component={Link} 
                    to={`/edit/${promotion.id}`} 
                    className="promotion-card__edit-button"
                >
                    Editar
                </UIButton>
            </footer>
        </div>
    </div>
)

export default PromotionCard;

