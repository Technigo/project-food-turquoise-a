// You should now have data from at least 10 restaurants from the /search endpoint on your page, and include the following data:

// The restaurant name
// The average cost for a dinner there
// The address of the restaurant
// An image (you choose which image you'd like to display from the response)
// Either the aggregate_rating or the rating_text for that restaurant

const apiKey = "11530b7a501b483bed8062f8defd1254";

const cityId = 257; //Rome
const cuisineId = 25; //Chinese
const resultQuantity = 20;

const theRestaurantSection = document.getElementById("restaurant-section")



const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=${resultQuantity}&cuisines=${cuisineId}`
const urlSortOnPrice = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=${resultQuantity}&cuisines=${cuisineId}&sort=cost&order=asc`
const urlSortOnRating = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=${resultQuantity}&cuisines=${cuisineId}&sort=rating&order=desc`

// SCROLL HEADER SECTION
window.onscroll = function () { scrollFunction() };

const header = document.getElementById("scrollHeader");
const sticky = header.offsetTop;

function scrollFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

renderImage = (restaurant) => {
  if (restaurant.photos && restaurant.photos.length > 0) {
    return `<img src=${restaurant.photos[0].photo.url} width="400px">`
  } else {
    return `<img src="noimage.png" height=250px>`
  }
}

rangeToDollar = (restaurant) => {
  if (restaurant.price_range === 1 || restaurant.price_range === 2) {
    return "$"
  } else if (restaurant.price_range === 3 || restaurant.price_range === 4) {
    return "$$"
  } else if (restaurant.price_range === 5) {
    return "$$$"
  }
}
//filter if the restaurant has online delivery.
//Make it so your users can choose to only show resturants 
//which have delivery (has_online_delivery) or can be booked in advance (has_table_booking).

showDeliveryRestaurants = (restaurant) => {
  if (restaurant.has_online_delivery > 0) {
    return "Has"
  } else {
    return "No"
  }
}

showBookingRestaurants = (restaurant) => {
  if (restaurant.has_table_booking > 0) {
    return "Has"
  } else {
    return "No"
  }
}

fetch(url, { headers: { "user-key": apiKey } })

  .then(response => response.json())
  .then(json => {
    console.log(json);
    json.restaurants.forEach(chineseRestaurant => {
      theRestaurantSection.innerHTML += `<div class="card">
      <li>${renderImage(chineseRestaurant.restaurant)}</li>
          <li>Name: ${chineseRestaurant.restaurant.name}</li>
          <li>Average cost for two: ${chineseRestaurant.restaurant.average_cost_for_two} ${chineseRestaurant.restaurant.currency}</li>
          <li>Address: ${chineseRestaurant.restaurant.location.address}</li>
          <li>Rating: ${chineseRestaurant.restaurant.user_rating.aggregate_rating}/5 "${chineseRestaurant.restaurant.user_rating.rating_text}"</li>
          <li> Average price-range: ${rangeToDollar(chineseRestaurant.restaurant)}</li>
          <li> ${showDeliveryRestaurants(chineseRestaurant.restaurant)} online delivery</li>
          <li> ${showBookingRestaurants(chineseRestaurant.restaurant)} table booking</li></div>
`
    })
  })


fetch(urlSortOnPrice, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    document.getElementById("sortOnPrice").addEventListener('click', () => {
      theRestaurantSection.innerHTML = ''
      json.restaurants.forEach(chineseRestaurant => {

        theRestaurantSection.innerHTML += `
        <div class="card">
                <li> ${renderImage(chineseRestaurant.restaurant)}</li>
          <li>Name: ${chineseRestaurant.restaurant.name}</li>
          <li>Average cost for two: ${chineseRestaurant.restaurant.average_cost_for_two} ${chineseRestaurant.restaurant.currency}</li>
          <li>Address: ${chineseRestaurant.restaurant.location.address}</li>
          <li>Rating: ${chineseRestaurant.restaurant.user_rating.aggregate_rating}/5 "${chineseRestaurant.restaurant.user_rating.rating_text}"</li>
          <li> Average price-range: ${rangeToDollar(chineseRestaurant.restaurant)}</li>
          <li> ${showDeliveryRestaurants(chineseRestaurant.restaurant)} online delivery</li>
          <li> ${showBookingRestaurants(chineseRestaurant.restaurant)} table booking</li>
      </div>`

      })
    })
  })


fetch(urlSortOnRating, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    document.getElementById("sortOnRating").addEventListener('click', () => {
      theRestaurantSection.innerHTML = ''
      json.restaurants.forEach(chineseRestaurant => {

        theRestaurantSection.innerHTML += `
                  <div class="card">
        <li> ${renderImage(chineseRestaurant.restaurant)}</li>
          <li>Name: ${chineseRestaurant.restaurant.name}</li>
          <li>Average cost for two: ${chineseRestaurant.restaurant.average_cost_for_two} ${chineseRestaurant.restaurant.currency}</li>
          <li>Address: ${chineseRestaurant.restaurant.location.address}</li>
          <li>Rating: ${chineseRestaurant.restaurant.user_rating.aggregate_rating}/5 "${chineseRestaurant.restaurant.user_rating.rating_text}"</li>
          <li> Average price-range: ${rangeToDollar(chineseRestaurant.restaurant)}</li>
          <li> ${showDeliveryRestaurants(chineseRestaurant.restaurant)} online delivery</li>
          <li> ${showBookingRestaurants(chineseRestaurant.restaurant)} table booking</li>
          </div>
      `

      })
    })
  })