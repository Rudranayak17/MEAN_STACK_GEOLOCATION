import { Weather } from "../model/userHistorymodel.js";

export const weatherHistory = async (req, res, next) => {
    try {
        const weatherData = req.body; // Assuming the request body contains the weather data
        const userId = req.user._id;
        // Create a new Weather document
        weatherData.user = userId;
        const newWeather = new Weather(weatherData);
    
        // Save the document to the database
        await newWeather.save();
    
        res.status(201).json({ message: 'Weather data stored successfully' });
    } catch (error) {
      next(error);
      
    }
  };

export const UserWeatherHistory = async (req, res, next) => {
    try {
        const weatherData = req.body; // Assuming the request body contains the weather data
        const userid=req.user._id
        // Create a new Weather document
        const weather=await Weather.find({user:userid})
    
        res.status(201).json({ success:true,
            weather});
    } catch (error) {
      next(error);
      
    }
  };
