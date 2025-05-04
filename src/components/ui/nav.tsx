"use client";

import {usePrivy} from '@privy-io/react-auth';

export default function Nav() {
    const {login, logout, authenticated, user} = usePrivy();
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <p className="block py-2 font-bold px-3 md:p-2 text-gray-900 rounded-sm dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                    SyncProof
                </p>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                    {authenticated ? (
                        <>
                            <p className="block py-2 px-3 md:p-2 text-gray-900 rounded-sm dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                {user?.wallet?.address}
                            </p>
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={logout}
                            >

                                logout
                            </button>
                        </>
                    ) : (
                        <button type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={login}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>

    )

}