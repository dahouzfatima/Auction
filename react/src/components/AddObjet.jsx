import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { userStateContext } from '../contexts/ContextProvider';

const AddObjet = () => {
    const { userToken, setCurrentUser, currentUser } = userStateContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    console.log(userToken);
    console.log(currentUser.id);
    if (!userToken) {
        console.log("No token");
        return <Navigate to="/login" />;
    }
    useEffect(() => {
        console.log("Authorization Header:", {
            'Authorization': `Bearer ${userToken}`,
        });

        // Send the request to the API with the token
        axiosClient.get('/me', {
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
            .then(({ data }) => {
                console.log("data:", data);
                setCurrentUser(data);
            })
            .catch((error) => {
                console.error("Request error:", error);
            });
    }, [userToken]);


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        address: "",
        initialPrice: "",
        currentPrice: "",
        startDate: "",
        endDate: "",
        seller_id: "",
    });

    const calculateStatus = (startDate, endDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > today) return "pending";
        if (start <= today && end >= today) return "ongoing";
        if (end < today) return "finished";
        return "pending";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            currentPrice: prevData.initialPrice,
        }));
    }, [formData.initialPrice]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            seller_id: currentUser.id,
        }));
    }, [currentUser.id]);



    const handleSubmit = async (e) => {
        setErrorMessage("");
        setSuccessMessage('');
        e.preventDefault();


        const status = calculateStatus(formData.startDate, formData.endDate);
        const dataToSubmit = { ...formData, status };
        console.log(dataToSubmit);

        try {
            const response = await axiosClient.post("/objects/add", dataToSubmit, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json', // Added Content-Type

                },
            });

            if (response.status === 201) {
                setSuccessMessage("Data added successfully!");
                window.scrollTo(0, 0);
                setFormData({
                    title: "",
                    description: "",
                    image: "",
                    address: "",
                    initialPrice: "",
                    currentPrice: "",
                    startDate: "",
                    endDate: "",
                    seller_id: currentUser.id || "", // Set the user ID for the next submission
                });
            } else {
                setErrorMessage(`Error: ${response.data.message}`);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error sending data:", error);
            setErrorMessage("Error connecting to the server.");
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <h2 className="font-semibold text-4xl text-gray-900 mb-3">Add an Item</h2>
                {errorMessage && (
                    <div class="relative items-center w-full mb-3 mx-auto md:px-12 lg:px-24 max-w-7xl">
                        <div class="p-6 border-l-4 border-red-500 -6 rounded-r-xl bg-red-50">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div class="text-sm text-red-600">
                                        <p>{errorMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <div class="relative items-center w-full mb-3 max-w-7xl">
                        <div class="p-6 border-l-4 border-green-500 -6 rounded-r-xl bg-green-50">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <div class="text-sm text-green-600">
                                        <p>{successMessage}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form className="bg-white rounded shadow-lg mb-6" onSubmit={handleSubmit}>
                    <div className="h-fit grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="text-gray-700">
                            <img
                                src="https://i.pinimg.com/736x/80/e8/a8/80e8a8b9ddb0a6cf9dccad2aca0e12dd.jpg"
                                className="md:h-full object-top min-[300px]:h-[400px] rounded min-[300px]:w-full"
                                alt="image preview"
                            />
                        </div>

                        <div className="lg:col-span-2 grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 p-4 px-4 md:p-8">
                            <div className="md:col-span-5">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder="Enter the title of the item"
                                    required
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="h-28 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder="Enter a detailed description"
                                ></textarea>
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="h-10 mt-2 border px-4 rounded w-full bg-gray-50"
                                    required
                                    placeholder="Enter the URL of your image"
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    name="address"
                                    id="address"
                                    rows="2"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder="Enter the address"
                                ></textarea>
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="initialPrice">Initial Price ($)</label>
                                <input
                                    type="number"
                                    name="initialPrice"
                                    id="initialPrice"
                                    value={formData.initialPrice}
                                    onChange={handleChange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder="0.00"
                                    step="0.01"
                                    required
                                />
                            </div>



                            <div className="md:col-span-3">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    id="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    required
                                />
                            </div>

                            <div className="md:col-span-5 text-right">

                                <button
                                    type="submit"
                                    className="bg-slate-950 hover:bg-slate-200 text-gray-50 hover:text-gray-950 border-1 border-gray-950 transition-all duration-300 font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddObjet;
