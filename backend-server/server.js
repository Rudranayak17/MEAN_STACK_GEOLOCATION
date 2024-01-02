import { app } from "./app.js";
import { connectDB } from "./dataBase/db.js";


connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port localhost ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})