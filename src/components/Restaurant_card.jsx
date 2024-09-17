import { CDN_IMG_URL_BASE } from "../utils/constants";

const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const Restaurant_card = (props) => {
    const { res_data } = props;
    const imgUrl = `${CDN_IMG_URL_BASE}${res_data.cloudinaryImageId}`;
  
    return (
        <div className="restaurant-card">
            <img
                className="res-card-logo"
                alt="Restaurant"
                src={imgUrl}
            />
            <h3>{res_data.name}</h3>
            <div className="card-details">
                <div className="cuisine-info">{res_data.cuisines.join(", ")}</div>
                <div className="cuisine-cost">{res_data.costForTwo}</div>
                <div className="rating-delivery">
                    <div className="rating">⭐ {res_data.avgRating}</div>
                    <div className="delivery-time">{res_data.sla.slaString}</div>
                </div>
                <div className="restaurant-location">{toTitleCase(res_data.areaName)}</div>
            </div>
        </div>
    );
};

// Creating Higher Order component of Restaurant Card

// Input - Restaurant_card
// Output - Restaurant_card_with_Discount

export const with_Discount_Label = (Restaurant_card) => {

    return ({ discountHeader, discountSubHeader, ...props }) => {
        return (
            <div>
                <label className="absolute z-20 text-white bg-gradient-to-r from-slate-400 to-slate-600 p-0.5 px-3 rounded-lg shadow-lg text-sm font-semibold tracking-wide transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
    {discountHeader} - {discountSubHeader}
</label>

                <Restaurant_card {...props} />
            </div>
        );
    };
};

export default Restaurant_card;
