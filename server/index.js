const express = require('express');
const cors = require('cors')
const mongoose= require('mongoose')

const app=express();
app.use(cors());
app.use(express.json())

const PORT= process.env.PORT||8080


//schema
const schemaData = mongoose.Schema({
    name:String,
    email: String,
    mobile: String,
},{
    timestamps:true  
    // Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
})


const userModel = mongoose.model("user",schemaData)


//read
app.get("/",async(req,res)=>
{
    const data= await userModel.find({

    })
    res.json({success:true,data:data})
})

//create data || save data in mongodb
app.post("/create", async (req,res)=>{
    console.log(req.body);
    const data = new userModel(req.body)
    await data.save()

    res.send({success:true,message:"data saved successfully",data:data})

})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body);

    const {_id,...rest}=req.body
    const data = await userModel.updateOne({_id:_id},rest)
    
    res.send({success:true,message:"data updated successfully",data:data})
})


//delete data

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id);
    const data = await userModel.deleteOne({_id:id})

    res.send({success:true,message:"data updated successfully",data:data})
})



mongoose.connect("mongodb://localhost:27017/curdoperation")
.then(()=>{
    console.log("connect to db")
app.listen(PORT,()=> console.log("server is running"))
})
.catch((err)=> console.log(err))

