import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantCategory = (res_id) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, [res_id]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + res_id);
    const json_data = await data.json();

  
    const categories =
      json_data.data.cards[4].groupedCard.cardGroupMap.REGULAR?.cards.filter(
        (category) =>
          category.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      );

    const formattedCategories = categories.map((category) => {
      const categoryName = category.card.card.title;

      const subCategories = category.card.card.categories.map(
        (sub_category) => {
          const subCategoryName = sub_category.title;

          const items = sub_category.itemCards.map((item) => {
            return {
              name: item.card.info.name,
              imageId: item.card.info.imageId,
              description: item.card.info.description,
              price: item.card.info.defaultPrice ? (item.card.info.defaultPrice / 100).toFixed(2) : (item.card.info.price / 100).toFixed(2) ,
            };
          });

          return {
            subCategoryName,
            items,
          };
        }
      );

      return {
        categoryName,
        subCategories,
      };
    });

    setCategoriesData(formattedCategories);
  };

  return categoriesData;
};

export default useRestaurantCategory;
