import { useParams } from "react-router-dom";
import RestaurantCategoryItemCard from "./RestaurantCategoryItemCard";
import useRestaurantCategory from "../utils/useRestaurantCategory";
import Shimmer from "./Shimmer";

const Restaurant_Category = () => {
  const { res_id } = useParams();
  const categoriesData = useRestaurantCategory(res_id);

  return !categoriesData.length ? (
    <Shimmer />
  ) : (
    <div className="restaurant-categories">
      {categoriesData.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.categoryName}</h2>
          {category.subCategories.map((subCategory, subIndex) => (
            <div key={subIndex} className="sub-category-section">
              <h3 className="sub-category-title">{subCategory.subCategoryName}</h3>
              <div className="sub-category-items">
                {subCategory.items.map((item, itemIndex) => (
                  <RestaurantCategoryItemCard key={itemIndex} item_data={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Restaurant_Category;
