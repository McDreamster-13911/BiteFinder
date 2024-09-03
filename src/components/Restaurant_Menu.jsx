import React from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useRestaurantCategory from "../utils/useRestaurantCategory";
import RestaurantMenuItemCard from "./RestaurantMenuItemCard";
import RestaurantCategoryItemCard from "./RestaurantCategoryItemCard";
import Shimmer from "./Shimmer";

// Import Material-UI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Restaurant_Menu = () => {
  const { res_id } = useParams();

  // Using custom hooks
  const { res_info, res_menu_items_info, imgUrl } = useRestaurantMenu(res_id);
  const categoriesData = useRestaurantCategory(res_id);

  return res_info === null ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-header-content">
        <img
          src={imgUrl}
          alt="Restaurant"
          className="restaurant-image"
        />
        <div className="header-text text-center">
          <div className="restaurant-name">
            <p className="text-2xl font-semibold">{res_info.name}</p>
          </div>
          <div className="details-row flex justify-center space-x-4 text-sm text-gray-600">
            <p>⭐ {res_info.avgRating}</p>
            <p>{res_info.sla.slaString}</p>
            <p>{res_info.costForTwoMessage}</p>
          </div>
        </div>
      </div>

      <div className="accordion">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 className="font-medium">Recommended</h3>
          </AccordionSummary>
          <AccordionDetails>
            <div className="recommend-info mb-4">
              <p className="text-lg font-medium">Recommended</p>
              <p className="text-sm text-gray-600">
                {res_menu_items_info ? res_menu_items_info.length : 0} items
              </p>
            </div>

            {res_menu_items_info &&
              res_menu_items_info.map((item) => (
                <RestaurantMenuItemCard
                  key={item.card.info.id}
                  item_data={item.card.info}
                />
              ))}
          </AccordionDetails>
        </Accordion>

        {/* Categories Accordion */}
        {categoriesData.map((category, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <h3 className="font-medium"> {category.categoryName} </h3>
            </AccordionSummary>
            <AccordionDetails>
              {category.subCategories.map((subCategory, subIndex) => (
                <div key={subIndex} className="sub-category">
                  <h3 className="sub-category-title text-lg font-semibold mb-2">
                    {subCategory.subCategoryName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {subCategory.items.length} items
                  </p>
                  <div>
                    {subCategory.items.map((item, itemIndex) => (
                      <RestaurantCategoryItemCard
                        key={itemIndex}
                        item_data={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Restaurant_Menu;
