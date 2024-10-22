"use client"

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppSelector } from '@/app/hooks/hooks'
import { useAppDispatch } from '@/app/hooks/hooks'
import { userDataAdded, userDataProps } from "./features/userData/userData";
import { initializeCronSchedule } from "@/actions/userAction";


export type stockProps = {
    CompanyName: string,
    Symbol: string,
    Price: string,
    PurchasePrice: string
}

export default function Home() {
    const [formDialog, setFormDialog] = useState(false)
    const userData = useAppSelector(state => state.userData)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()

    useEffect(() => {
        // const fetchCSV = async () => {
        //     const listed_companies: any[] = [];
        //     // Fetch the CSV file from the public directory
        //     const response = await fetch('/listed_companies_new.csv');
        //     const csvData = await response.text(); // Read the file as text
        //     const lines = csvData.split("\n"); // Split the CSV data into lines
        //     // Parse each line into an object
        //     lines.forEach(line => {
        //         const [CompanyName, Symbol, Price] = line.split(",");
        //         if (CompanyName && Symbol && Price && CompanyName !== "CompanyName") { // Check if values are present
        //             listed_companies.push({ CompanyName, Symbol, Price, PurchasePrice: Price });
        //         }
        //     });
        //     setStockCollection(listed_companies); // Update state with the data
        // };
        // fetchCSV(); // Call the fetchCSV function


        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_FETCH_USER_DATA ? process.env.NEXT_PUBLIC_FETCH_USER_DATA : '', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();

            if(data.data && data.data.length > 0) {
                data.data.forEach((item: userDataProps) => {
                    dispatch(userDataAdded(item))
                })
            }
        }

        if(userData.length === 0) {
            fetchData();
        }else{
            setTimeout(() => {
                fetchData();
            }, 60000)
        }

        

    }, [])


    function getFormattedDate() {
        const date = new Date();

        // Get year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
        const day = String(date.getDate()).padStart(2, '0');

        // Get hours, minutes, and AM/PM
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12 || 12; // Converts '0' hours to '12'

        // Format hours and minutes with leading zeros
        const formattedHours = String(hours).padStart(2, '0');

        // Combine all parts into the desired format
        return `${year}-${month}-${day} ${formattedHours}:${minutes} ${amPm}`;
    }


    const handleSubmit = async () => {
        const date = getFormattedDate();
        const response = await fetch(process.env.NEXT_PUBLIC_ADD_DATA_ENDPOINT ? process.env.NEXT_PUBLIC_ADD_DATA_ENDPOINT : '', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title, desc: description, postTime: date }),
        })
        const data = await response.json();
        console.log(data);

        if(data.message.includes("Data added to queue")){
            initializeCronSchedule();
        }

        // if (title && description) {
        //     dispatch(userDataAdded({ title: title, desc: description, postTime: date }));
        // }
        //setUserStocks([...userStocks, { CompanyName: companyName, Symbol: addedStockSymbol, Price: addedStockPrice, PurchasePrice: purchasePrice }]);
        setFormDialog(!formDialog)
    }

    return (
        <>
            <Navbar />

            <div className='flex flex-col'>

                <div>
                    <h1 className='text-4xl text-center mt-2xl'>Data Explorer</h1>
                </div>

                {/* <button className='bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-md' onClick={() => handleAddStock()}>Add Stock</button> */}
                <Dialog open={formDialog} onOpenChange={setFormDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-[150px] ml-10">Add Data</Button>
                    </DialogTrigger>
                    {<DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Add Data</DialogTitle>
                            <DialogDescription>
                                Add a new Data Object here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    defaultValue="enter Title"
                                    className="col-span-3"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    defaultValue="Enter Description"
                                    className="col-span-3"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter onClick={handleSubmit}>
                            <button type="submit" onSubmit={handleSubmit} className="border border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                        </DialogFooter>
                    </DialogContent>}
                </Dialog>

                <div className="w-screen h-[80vh] flex flex-col gap-4 items-center overflow-auto mt-xl border-2 border-black">
                    {
                        userData && userData.length === 0 && <p className='text-center'>No data added yet</p>
                    }
                    {
                        userData && userData.length > 0 &&
                        userData.map((data: userDataProps) => {
                            return (
                                <div key={data.postTime} className='flex flex-col gap-4 border-2 border-black p-lg mt-md w-[500px] '>
                                    <div className={`flex gap-4 justify-between`}>
                                        <div className='flex flex-col gap-4'>
                                            <p className="text-2xl">{data.title}</p>
                                            <p>{data.desc}</p>
                                        </div>
                                        {/* <div className='flex flex-col gap-4'>
                                            <p>your price: {stock.PurchasePrice}</p>
                                            <p>Current price: {stock.Price}</p>
                                        </div> */}
                                    </div>
                                    <div className={`flex ${data.charCount ? 'justify-between' : 'justify-end'}`}>
                                        {data.charCount && <p>charcount: {data.charCount}</p>}
                                        <p>{data.postTime}</p>
                                        {/* <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Edit</button> */}
                                        {/* <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteStock(stock)}>Delete</button> */}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div >



        </>
    );
}
