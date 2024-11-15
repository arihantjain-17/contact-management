const mongoose=require("mongoose");

require("dotenv").config();

exports.connect=()=>{
      mongoose.connect(process.env.mongodb_url).then(()=>{console.log("DB connected succesfully")})
      .catch((err)=>{
        console.log("db connection issues");
        console.error(err);
        process.exit(1);
      });
}