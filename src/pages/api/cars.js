// New API route for cars
//pages/api.cars.js
const axios = require('axios');

export const getCars = async (userInput) => {
  // Destructure userInput to get make, model, and year
  const { make, model, year } = userInput;

  // Construct params object based on user input
  let params = {
    // set default params
    direction: 'asc',
    sort: 'id',
    verbose: 'yes'
  };

  // Add make, model, and year to params if they are provided from the user
  if (make) params.make = make;
  if (model) params.model = model;
  if (year) params.year = year;

  //models endpoint data - model, make, year
  const options = {
    method: 'GET',
    url: 'https://car-api2.p.rapidapi.com/api/trims', // Adjust the URL based on the endpoint you need
    params: params,
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'x-rapidapi-host': 'car-api2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// trim endpoint return value:  
/*
data:
    0:
        id:6292
        make_model_id:97
        year:2020
        name:"Base"
        description:"4dr Sedan (2.4L 4cyl 8AM)"
        msrp:25900
        invoice:24617
        created:"2023-06-29T20:59:59-04:00"
        modified:"2023-06-29T20:59:59-04:00"
        make_model:
            id:97
            make_id:1
            name:"ILX"
            make:
            id:1
            name:"Acura"
*/

// trim view endpoint to show details cars data
export const getCarDetails = async (id) => {
    const options = {
      method: 'GET',
      url: `https://car-api2.p.rapidapi.com/api/trims/${id}`,
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'x-rapidapi-host': 'car-api2.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
 
// trim view endpoint - year, doors, length, width, seats, height, description, enginetype, fueltype, colors, range_city
// This need to be passed params of id: make_model_trim_id: 21

/*
id:21
make_model_id:3
year:2023
name:"******** (hidden)"
description:"*********************************************************************************** (hidden)"
msrp:55000
invoice:51700
created:"2023-06-29T20:57:41-04:00"
modified:"2023-10-21T08:58:12-04:00"
make_model_trim_interior_colors:
0:"... (colors hidden)"
make_model_trim_exterior_colors:
0:"... (colors hidden)"
make_model_trim_mileage:
id:21
make_model_trim_id:21
fuel_tank_capacity:"15.3"
combined_mpg:28
epa_city_mpg:24
epa_highway_mpg:33
range_city:3672
range_highway:5049
battery_capacity_electric:null
epa_time_to_charge_hr_240v_electric:null
epa_kwh_100_mi_electric:null
range_electric:null
epa_highway_mpg_electric:null
epa_city_mpg_electric:null
epa_combined_mpg_electric:null
make_model_trim_engine:
id:21
make_model_trim_id:21
engine_type:"*** (engine type hidden)"
fuel_type:"*** (fuel_type hidden)"
cylinders:"*** (cylinders hidden)"
size:"2.0"
horsepower_hp:201
horsepower_rpm:null
torque_ft_lbs:236
torque_rpm:null
valves:16
valve_timing:"*** (valve_timing hidden)"
cam_type:"*** (cam_type hidden)"
drive_type:"*** (drive_type hidden)"
transmission:"*** (transmission hidden)"
make_model_trim_body:
id:21
make_model_trim_id:21
type:"*** (body type hidden)"
doors:5
length:"187.3"
width:"72.5"
seats:5
height:"54.6"
wheel_base:"111.2"
front_track:null
rear_track:null
ground_clearance:null
cargo_capacity:"21.8"
max_cargo_capacity:"35.0"
curb_weight:3725
gross_weight:null
max_payload:null
max_towing_capacity:null
make_model:
id:3
make_id:2
name:"** (hidden)"
make:
id:2
name:"Audi"
__message:"NOTE: Data is limited to 2015-2020 for non-paying users. Search for 2015-2020 vehicles or subscribe to unlock this data. If you are still seeing this message after subscribing, be sure you have renewed your JWT and are including it in the HTTP authentication header. Read more here: https://carapi.app/docs/#authentication"
*/

// body endpoints:year, doors, length, width, seats, height, acura, description
