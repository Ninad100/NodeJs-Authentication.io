import { connectToMongoDB } from "./db.config.js";
import { app } from "./index.js";


app.listen(3000,()=>{
    console.log('server is listening at 3000')
    connectToMongoDB();
})