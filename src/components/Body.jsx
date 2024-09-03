import React, { useEffect, useState } from "react";
import Restaurant_card, { with_Discount_Label } from "./Restaurant_card";
import Shimmer from "./Shimmer";
import Search_Component from "./Search_Component";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [all_restaurants, set_all_restaurants] = useState([]);
  const [filtered_restaurants, set_filtered_restaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [search_term, set_search_term] = useState("");

  const Restaurant_Card_With_Discount = with_Discount_Label(Restaurant_card);

  function filter_restaurants() {
    const high_avgRatingList_resto = all_restaurants.filter(
      (restaurant) => restaurant.info.avgRating >= 4.1
    );
    set_filtered_restaurants(high_avgRatingList_resto);
    setIsFiltered(true);
  }

  function clear_filter() {
    set_search_term("");
    setIsFiltered(false);
  }

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json_data = await data.json();
    const restaurant_obj_data_from_api =
      json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    set_all_restaurants(restaurant_obj_data_from_api);
  };

  const online_status = useOnlineStatus();

  if (online_status === false) {
    return <h1>Looks like you are offline! Please check your Internet Connection</h1>;
  }

  if (all_restaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <Search_Component
        all_restaurants={all_restaurants}
        set_filtered_restaurants={set_filtered_restaurants}
        setIsFiltered={setIsFiltered}
        search_term={search_term}
        set_search_term={set_search_term}
      />
      <div className="filter">
        <button className="filter-btn" onClick={filter_restaurants}>
          Top Rated Restaurants
        </button>
        <div className="clear-filter">
          <button className="clear-filter-btn" onClick={clear_filter}>
            Clear Filter
          </button>
        </div>
      </div>
      <div className="restaurant-cards-container flex justify-around flex-wrap gap-5">
        {(isFiltered ? filtered_restaurants : all_restaurants).map(
          (restaurant) => {
            const discountInfo = restaurant.info.aggregatedDiscountInfoV3;

            return (
              <Link to={`restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
                {discountInfo?.header && discountInfo?.subHeader ? (
                  <Restaurant_Card_With_Discount
                    key={restaurant.info.id}
                    res_data={restaurant.info}
                    discountHeader={discountInfo.header}
                    discountSubHeader={discountInfo.subHeader}
                  />
                ) : (
                  <Restaurant_card
                    key={restaurant.info.id}
                    res_data={restaurant.info}
                  />
                )}
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Body;
