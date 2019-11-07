// You should now have data from at least 10 restaurants from the /search endpoint on your page, and include the following data:

// The restaurant name
// The average cost for a dinner there
// The address of the restaurant
// An image (you choose which image you'd like to display from the response)
// Either the aggregate_rating or the rating_text for that restaurant

const apiKey = "5ee55c33678b037bb059d0f847013cd6";

const cityId = 257; //Rome
const cuisineId = 25; //Chinese
const resultQuantity = 20;


const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=${resultQuantity}&cuisines=${cuisineId}`


fetch(url, { headers: { "user-key": apiKey } })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        json.restaurants.forEach(chineseRestaurant => {
            console.log(chineseRestaurant.restaurant.name);
            document.getElementById("restaurant-section").innerHTML += ` 
  <li>Name: ${chineseRestaurant.restaurant.name}</li>
  <li>Avarage cost for two: ${chineseRestaurant.restaurant.average_cost_for_two} ${chineseRestaurant.restaurant.currency}</li>  
  <li>Address: ${chineseRestaurant.restaurant.location.address}</li>
  <li>Rating: ${chineseRestaurant.restaurant.user_rating.aggregate_rating}/5 "${chineseRestaurant.restaurant.user_rating.rating_text}"</li>
  <li><img src=${chineseRestaurant.restaurant.photos[0].photo.thumb_url}></li>  
`;
            console.log(chineseRestaurant.restaurant)
        });
    });