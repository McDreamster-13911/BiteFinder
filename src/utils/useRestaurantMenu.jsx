import { useState, useEffect } from "react";
import { MENU_URL, CDN_IMG_URL_BASE } from "../utils/constants";

const useRestaurantMenu = (res_id) => {
  const [res_info, set_res_info] = useState(null);
  const [res_menu_items_info, set_res_menu_items_info] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    fetch_menu();
  }, [res_id]);

  const fetch_menu = async () => {
    try {
      const response = await fetch(MENU_URL + res_id);
      const json_data = await response.json();

      const res_data = json_data.data.cards[2].card.card.info;
      const res_menu_items_data =
        json_data.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card
          .card.itemCards;

      json_data.data.cards[4].groupedCard.cardGroupMap.REGULAR?.cards.forEach(
        (category, index) => {
          console.log(`Item ${index}:`, category.card?.card?.["@type"]);
        }
      );

      const categories =
        json_data.data.cards[4].groupedCard.cardGroupMap.REGULAR?.cards.filter(
          (category) =>
            category.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        );

      console.log(categories);

      // Declare the variables
      const main_category_name_array = categories.map((category) => {
        return category.card.card.title;
      });

      console.log(main_category_name_array);

      // Declare the variables
      const sub_category_names_array = categories.map((category) => {
        // Array of the array of sub-category names
        return category.card.card.categories;
      });

      console.log("Sub_Category_Names_Array : ", sub_category_names_array);

      // Sub-categories - names and items
      const sub_category_items_array = categories.map((category) => {
        const categoryName = category.card.card.title;

        const subCategories = category.card.card.categories.map(
          (sub_category) => {
            const subCategoryName = sub_category.title;

            const items = sub_category.itemCards.map((item) => {
              const item_name = item.card.info.name;
              const item_image_id = item.card.info.imageId;
              const item_description = item.card.info.description;
              const item_price = item.card.info.finalPrice / 100;

              // Return a formatted string for each item
              return `${item_name} - $${item_price}`;
            });

            // Return the sub-category name followed by the list of items
            return `${subCategoryName}: ${items.join(", ")}`;
          }
        );

        // Return the category name followed by all its sub-categories and items
        return `${categoryName}: ${subCategories.join(" | ")}`;
      });

      console.log("Sub-Category Items: ", sub_category_items_array);

      set_res_info(res_data);
      set_res_menu_items_info(res_menu_items_data);

      const imgUrl = `${CDN_IMG_URL_BASE}${json_data.data.cards[2].card.card.info.cloudinaryImageId}`;
      setImgUrl(imgUrl);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  return { res_info, res_menu_items_info, imgUrl };
};

export default useRestaurantMenu;
