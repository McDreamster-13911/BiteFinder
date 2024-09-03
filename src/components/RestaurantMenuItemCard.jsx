import { useDispatch } from "react-redux";
import { CDN_IMG_URL_BASE } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const RestaurantMenuItemCard = ({ item_data, showAddButton = true }) => {
    const dispatch = useDispatch();

    const handle_Add_Item = () => {
        // Dispatching an action

        dispatch(addItem(item_data));
      // Whenever an action will be dispatched, redux will create an object and it will create
      // a payload within this object the add the data and then pass it as a second argument over as an action in the corresponding action in the slice

    };

    const url_for_menu_item_img = `${CDN_IMG_URL_BASE}${item_data.imageId}`;

    const rawPrice = item_data.price || item_data.defaultPrice;
    const displayPrice = rawPrice ? (rawPrice / 100).toFixed(2) : '';

    return (
        <div className="menu-item-card">
            <div className="item-info">
                <h3 className="item-name">{item_data.name}</h3>
                <p className="item-price">₹{displayPrice}</p>
            </div>
            <div className="item-image-button">
                <img src={url_for_menu_item_img} alt={item_data.name} className="item-image" />
                {showAddButton && (
                    <button className="add-button" onClick={handle_Add_Item}>
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default RestaurantMenuItemCard;
