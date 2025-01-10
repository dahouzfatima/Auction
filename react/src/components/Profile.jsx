import { Link, Navigate } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider";
export default function Profile() {
    const { userToken, currentUser } = userStateContext();
    return (
        <div>
            <h1 className="font-bold mb-5 text-xl">Basic Infos</h1>
            <div className="flex  items-center w-full min-h-full md:mt-10 ">
                <form class="w-full  ">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value={currentUser.firstName}/>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Last Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" value={currentUser.lastName}/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Email
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="" value={currentUser.email}/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Password
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="" />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Password Confirmation
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex">
                <div className="mr-3">
                    <Link to={`/preview`} >
                        <button class="bg-black text-white py-2 px-4 mt-5   border border-white rounded hover:bg-white hover:text-black hover:underline hover:border-black ">Update</button>
                    </Link>
                </div>
                <div>
                    <Link to={`/preview`} >
                        <button class="bg-white text-black py-2 px-4 mt-5   border border-black rounded hover:bg-black hover:text-white hover:underline">Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}