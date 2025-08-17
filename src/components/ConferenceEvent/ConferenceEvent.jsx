import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "../TotalCost/TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "../avSlice";
import { toggleMealSelection } from "../mealsSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "meals") {
            mealsItems.forEach((item) => {
                if (item.selected) {
                  totalCost += item.cost * numberOfPeople;
                }
              });
        }
      return totalCost;
    };    

    const venueItems = useSelector((state) => state.venue);
    const venueTotalCost = calculateTotalCost("venue");
    const avItems = useSelector((state) => state.av);
    const avTotalCost = calculateTotalCost("av");
    const mealsItems = useSelector((state) => state.meals);
    const mealsTotalCost = calculateTotalCost("meals");

    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall").quantity;

    const totalCosts = {
      venue: venueTotalCost,
      av: avTotalCost,
      meals: mealsTotalCost,
    };
    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall" && venueItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    const handleMealSelection = (index) => {
        const item = mealsItems[index];
        if (item.selected && item.type === "mealForPeople") {
            // Ensure numberOfPeople is set before toggling selection
            const newNumberOfPeople = item.selected ? numberOfPeople : 0;
            dispatch(toggleMealSelection(index, newNumberOfPeople));
        }
        else {
            dispatch(toggleMealSelection(index));
        }
    };

    const getItemsFromTotalCost = () => {
      const items = [];
      venueItems.forEach((item) => {
        if (item.quantity > 0) {
          items.push({ ...item, type: "venue" });
        }
      });
      avItems.forEach((item) => {
        if (
          item.quantity > 0 &&
          !items.some((i) => i.name === item.name && i.type === "av")
        ) {
          items.push({ ...item, type: "av" });
        }
      });
      mealsItems.forEach((item) => {
        if (item.selected) {
          const itemForDisplay = { ...item, type: "meals" };
          if (item.numberOfPeople) {
            itemForDisplay.numberOfPeople = numberOfPeople;
          }
          items.push(itemForDisplay);
        }
      });
      return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        console.log(items);
        return <>
            
                {items.length === 0 ? (
                  <p className="text-center text-3xl p-3">No items selected</p>
                ) : (
                <div className="display_box1 overflow-x-auto">
                  <table className="table_item_data relative min-w-full shadow-md border border-gray-200 rounded-lg outline-1 outline-amber-50 outline-solid">
                      <thead className="bg-blue-100 border border-t border-b border-blue-200 font-semibold text-lg text-blue-950">
                          <tr>
                              <th className="text-start p-2">Name</th>
                              <th className="text-start p-2">Unit Cost</th>
                              <th className="text-start p-2">Quantity</th>
                              <th className="text-start p-2">Subtotal</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white text-gray-800">
                          {items.map((item, index) => (
                              <tr key={index}>
                                  <td className="p-2">{item.name}</td>
                                  <td className="p-2">₹ {item.cost}</td>
                                  <td className="p-2">
                                      {item.type === "meals" || item.numberOfPeople
                                      ? ` For ${numberOfPeople} people`
                                      : item.quantity}
                                  </td>
                                  <td className="p-2">{item.type === "meals" || item.numberOfPeople
                                      ? `${item.cost * numberOfPeople}`
                                      : `${item.cost * item.quantity}`}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
            
        </>
    };    

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
      }    

    return (
        <>
            <nav className="bg-cyan-950 sticky top-0 navbar_event_conference">
                <div className="flex justify-between items-center mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8 main_event">
                  <div className="text-3xl font-bold tracking-tight text-balance text-white company_logo">BudgetEase Solutions</div>
                  <div className="flex items-center justify-end left_navbar">
                      <div className="flex space-x-4 nav_links text-2xl font-light me-8">
                          <a className="rounded-md px-3 py-2 text-white hover:bg-white/8 hover:text-blue-200" href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                          <a className="rounded-md px-3 py-2 text-white hover:bg-white/8 hover:text-blue-200" href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                          <a className="rounded-md px-3 py-2 text-white hover:bg-white/8 hover:text-blue-200" href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                      </div>
                      <button className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-cyan-950 hover:text-white inset-ring inset-ring-white/5 hover:bg-blue-600 cursor-pointer details_button" onClick={() => setShowItems(!showItems)}>
                          Show Details
                      </button>
                    </div>
                </div>
            </nav>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main bg-blue-900 text-white">                              

                              <div>
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                  <div className="flex items-end justify-between mb-10">
                                    <h2 className="text-5xl font-semibold text-center">Venue Room Selection</h2>
                                    <div className="total_cost text-3xl font-light text-center">Total Cost: <span className="font-bold">₹ {venueTotalCost}</span></div>
                                  </div>

                                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {venueItems.map((item, index) => (
                                      <div key={index}>
                                        <div className="group">
                                          <img
                                            src={item.img} alt={item.name}
                                            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                          />
                                          
                                          <h3 className="mt-0 pt-4 mb-2 text-2xl">{item.name}</h3>
                                          <div className="flex items-center justify-between">
                                            <div>                                              
                                              <p className="mt-1 text-sm font-medium">Capacity : {item.capacity}</p>
                                              <p className="mt-1 text-lg font-bold">₹ {item.cost}</p>
                                            </div>

                                            {venueItems[index].name === "Auditorium Hall" ? (

                                              <>
                                              <div className="flex items-center gap-1 button_container">
                                                <button
                                                  className={`px-2 py-1 rounded-md text-blue-900 font-bold 
                                                    ${venueItems[index].quantity === 0 
                                                      ? "bg-blue-50 opacity-50 cursor-not-allowed" 
                                                      : "bg-blue-50 hover:bg-blue-50"}`}
                                                  onClick={() => handleRemoveFromCart(index)} disabled={venueItems[index].quantity === 0}
                                                >
                                                  &#8211;
                                                </button>
                                                <span className="min-w-[30px] text-center text-lg font-semibold selected_count">
                                                  {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                </span>
                                                <button
                                                  className={`px-2 py-1 rounded-md text-blue-900 font-bold 
                                                  ${remainingAuditoriumQuantity === 0 
                                                    ? "bg-blue-50 opacity-50 cursor-not-allowed" 
                                                    : "bg-blue-50 hover:bg-blue-50"}`}
                                                  onClick={() => handleAddToCart(index)}
                                                  disabled={remainingAuditoriumQuantity === 0}
                                                >
                                                  &#43;
                                                </button>
                                              </div>
                                            </>
                                            ) : (
                                              <div className="flex items-center gap-1 button_container">
                                                <button
                                                    className={`px-2 py-1 rounded-md text-blue-900 font-bold 
                                                      ${venueItems[index].quantity === 0 
                                                        ? "bg-blue-50 opacity-50 cursor-not-allowed" 
                                                        : "bg-blue-50 hover:bg-blue-50"}`}
                                                    onClick={() => handleRemoveFromCart(index)}
                                                  >
                                                    &#8211;
                                                  </button>
                                                  <span className="min-w-[30px] text-center text-lg font-semibold selected_count">
                                                    {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                  </span>
                                                  <button
                                                    className={`px-2 py-1 rounded-md text-blue-900 font-bold 
                                                    ${remainingAuditoriumQuantity === 0 
                                                      ? "bg-blue-50 opacity-50 cursor-not-allowed" 
                                                      : "bg-blue-50 hover:bg-blue-50"}`}
                                                    onClick={() => handleAddToCart(index)}
                                                  >
                                                  &#43;
                                                  </button>
                                              </div>
                                            )}

                                          </div>
                                          
                                        </div>
                                        
                                      
                                      </div>

                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              
                              
                            </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main bg-green-100">


                              <div>
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                                  <div className="flex items-end justify-between mb-10">
                                    <h2 className="text-5xl font-semibold text-center text-blue-800">Add-ons Selection</h2>
                                    <div className="total_cost text-3xl font-light text-center">Total Cost: <span className="font-bold">₹ {avTotalCost}</span></div>
                                  </div>

                                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 addons_selection">
                                    {avItems.map((item, index) => (
                                      <div key={index}>
                                        <div className="group">
                                          <img
                                             src={item.img} alt={item.name}
                                            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                          />
                                          
                                          <h3 className="mt-0 pt-4 mb-2 text-2xl text-gray-700 ">{item.name}</h3>
                                          <div className="flex items-center justify-between">
                                            <div>
                                              
                                              <p className="mt-1 text-lg font-bold text-gray-900">₹ {item.cost}</p>
                                            </div>

                                            {venueItems[index].name === "Auditorium Hall" ? (

                                              <>
                                              <div className="flex items-center gap-1 button_container">
                                                <button
                                                  className={`px-2 py-1 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600`}
                                                  onClick={() => handleRemoveFromCart(index)}
                                                >
                                                  &#8211;
                                                </button>
                                                <span className="min-w-[30px] text-center text-lg font-semibold text-gray-700 selected_count">
                                                  {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                </span>
                                                <button
                                                  className={`px-2 py-1 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600`}
                                                  onClick={() => handleAddToCart(index)}
                                                >
                                                  &#43;
                                                </button>
                                              </div>
                                            </>
                                            ) : (
                                              <div className="flex items-center gap-1 button_container">
                                                <button
                                                    className={`px-2 py-1 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600`}
                                                     onClick={() => handleDecrementAvQuantity(index)}
                                                  >
                                                    &#8211;
                                                  </button>
                                                  <span className="min-w-[30px] text-center text-lg font-semibold text-gray-700 selected_count">
                                                    {item.quantity}
                                                  </span>
                                                  <button
                                                    className={`px-2 py-1 rounded-md text-white font-bold bg-blue-500 hover:bg-blue-600`}
                                                     onClick={() => handleIncrementAvQuantity(index)}
                                                  >
                                                  &#43;
                                                  </button>
                                              </div>
                                            )}

                                          </div>
                                          
                                        </div>
                                        
                                      
                                      </div>

                                    ))}
                                  </div>
                                </div>
                              </div>

                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main bg-blue-900 text-white">

                              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                                <div className="flex items-end justify-between mb-10">
                                    <h2 className="text-5xl font-semibold text-center">Meals Selection</h2>
                                    <div className="total_cost text-3xl font-light text-center">Total Cost: <span className="font-bold">₹ {mealsTotalCost}</span></div>
                                  </div>

                                <div className="flex items-end justify-between space-x-6 mt-10">
                                  <div className="w-1/4">
                                    <label htmlFor="numberOfPeople" className="block text-sm/6 font-medium text-white">
                                      Number of People
                                    </label>
                                    <div className="mt-2">
                                      <input
                                        id="numberOfPeople"
                                        name="numberOfPeople"
                                        type="number"
                                        value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                      />
                                    </div>
                                  </div> 

                                  <div>
                                    <div className="flex justify-end space-x-6 meal_selection">
                                        {mealsItems.map((item, index) => (
                                            <label className="flex items-center space-x-3 meal_item" htmlFor={`meal_${index}`} key={index}>
                                              <input 
                                                type="checkbox" 
                                                className="form-checkbox h-5 w-5 text-indigo-600" 
                                                id={ `meal_${index}` }
                                                checked={ item.selected }
                                                onChange={() => handleMealSelection(index)}
                                              />
                                              <div className="flex flex-col">
                                                <span className="font-medium text-white">{item.name}</span>
                                                <span className="text-sm text-white">₹ {item.cost}</span>
                                              </div>
                                            </label>
                                        ))}
                                    </div>

                                  </div> 

                                </div>  

                              </div>


                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
