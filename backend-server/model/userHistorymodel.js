import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  current:{
  last_updated_epoch: Number,
  last_updated: String,
  temp_c: Number,
  temp_f: Number,
  is_day: Boolean,
  condition: {
    text: String,
    icon: String,
    code: Number,
  },
  wind_mph: Number,
  wind_kph: Number,
  
  wind_degree: Number,
wind_dir: String,
pressure_mb: Number,
pressure_in: Number,
precip_mm: Number,
precip_in: Number,
humidity: Number,
cloud: Number,
feelslike_c: Number,
feelslike_f: Number,
vis_km: Number,
vis_miles: Number,
uv: Number,
gust_mph: Number,
gust_kph: Number,
},
location:{
    
    name: String,
    region: String,
    country:String,
    lat: Number,
    lon: Number,
    tz_id: String,
    localtime_epoch: Number,
    localtime: Date

}
});

export const Weather = mongoose.model("Weather", weatherSchema);
