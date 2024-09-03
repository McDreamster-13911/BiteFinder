import { CDN_IMG_URL_BASE } from "../utils/constants";

const RestaurantCategoryItemCard = ({ item_data }) => {
  const url_for_category_item_img = `${CDN_IMG_URL_BASE}${item_data.imageId}`;
  
  return (
    <div className="menu-item-card">
      <div className="item-info">
        <h3 className="item-name">{item_data.name}</h3>
        <p className="item-price">₹{item_data.price}</p>
        <p className="item-description">{item_data.description}</p>
      </div>
      <div className="item-image-button">
        <img src={url_for_category_item_img} alt={item_data.name} className="item-image" />
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default RestaurantCategoryItemCard;
