"use server"

import { userDataProps } from "@/app/features/userData/userData";
import connectDB from "@/db/connectDb"
import userData from "@/models/UserData"
import cron from 'node-cron'


export const insertUserData = async ({dataId}: {dataId: string}) => {
    await connectDB();

    const currentUserData = await userData.findOne({ dataId: dataId })
    console.log(currentUserData)

    let ndata = {
        ...currentUserData.toObject(),  // Convert Mongoose document to plain object
        charCount: currentUserData.desc ? currentUserData.desc.length : "0"
    };

    if(currentUserData) {
        console.log("data found");
        await userData.updateOne({dataId: dataId}, ndata) 
        console.log("data updated");
    } 
    
}

const taskToRun = async () => {
    const response: any = await fetch(process.env.FETCH_QUEUE_MESSAGES ? process.env.FETCH_QUEUE_MESSAGES : '', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const dataUser = await response.json();
    console.log(dataUser);
    //connectDB();
    if(dataUser.data && dataUser.data.length > 0) {
        console.log(dataUser.data[0])        

        await insertUserData({dataId: dataUser.data[0].split(",")[1]})
    }
}

export const initializeCronSchedule = async () => {

    cron.schedule('* * * * *', () => {
        console.log('Running the cron job...');
        taskToRun();
    });
}