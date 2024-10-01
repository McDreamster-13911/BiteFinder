import React, { useEffect, useState } from "react";
import Restaurant_card, { with_Discount_Label } from "./Restaurant_card";
import Shimmer from "./Shimmer";
import Search_Component from "./Search_Component";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { fetchRestaurants } from "utils/api";

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
    try {
      setIsLoading(true);
      const json_data = await fetchRestaurants("17.406498", "78.47724389999999", "DESKTOP_WEB_LISTING");
      console.log("Received data:", json_data);

      const restaurant_obj_data_from_api =
        json_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      
      if (restaurant_obj_data_from_api) {
        set_all_restaurants(restaurant_obj_data_from_api);
        set_filtered_restaurants(restaurant_obj_data_from_api);
      } else {
        setError("Unexpected data structure in the API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
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
