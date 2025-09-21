import express from 'express';
import { addDonnerProduct, approvedDonner, deleteDonnerProduct, getAllDonner, getDonnerById, getRequestsByUserId, pendingDonner, updateDonnerProduct } from '../controller/donner.controller.js';

const donnerRouter=express.Router();

donnerRouter.get("/pending",pendingDonner)// all pending donner ka data      //done
donnerRouter.get("/approved",approvedDonner)// all aproved donner ka data    //done
donnerRouter.get("/all",getAllDonner)// all donner ka data                   //done
donnerRouter.post("/byId",getDonnerById)// donner ka khud ki request ka data    //done
donnerRouter.post("/product",getRequestsByUserId)// particluar product ka data or display a product   //done  
donnerRouter.post("/create",addDonnerProduct)// donner apni side se product add krta hai  //done
donnerRouter.delete("/delete",deleteDonnerProduct)// admin ke side se delete krna hai     //done
donnerRouter.put("/update",updateDonnerProduct)// admin ki side se approve krna hai       //done
export default donnerRouter;