import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const [showCollapsibleSidebar, setShowCollapsibleSidebar] = useState<boolean>(false)
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const [hamburgerImg, setHamburgerImg] = useState<string>('/hamburger-menu.svg')
    const hamburgerClick = () => {
        const collapsibleNavbar = document.getElementById('mobile-menu')
        if (collapsibleNavbar) {
            if (collapsibleNavbar.style.height === 'auto') {
                //collapsibleNavbar.style.display = "none";
                collapsibleNavbar.style.height = '0px';
                //collapsibleNavbar.style.padding = '0px'
            }
            else {
                //collapsibleNavbar.style.display = "block";
                collapsibleNavbar.style.height = 'auto';
                //collapsibleNavbar.style.padding = '10px'
            }
        }

        if (hamburgerImg === '/hamburger-menu.svg') {
            setHamburgerImg('/close.svg')
        }
        else {
            setHamburgerImg('/hamburger-menu.svg')
        }
        setShowCollapsibleSidebar(!showCollapsibleSidebar);

    }


    return (
        <div className='bg-[#121e2c] flex flex-row justify-between px-2 w-screen fixed top-0 left-0 z-100 '>
            <h3 className='flex items-center mx-md  z-100 text-white'>
                <Link href={'/'}>
                    Spiritual-India
                </Link>
            </h3>
            <button className='md:hidden hamburgerBtn transition-all z-100 duration-1000' onClick={hamburgerClick} >
                <img src={hamburgerImg} className='hamburgerImg invert z-100' height={24} width={24} alt='hamburger icon' />
            </button>

            <div className="absolute right-0 mt-12 z-100 h-0 bg-slate-700 z-100 transition-all duration-[30s] overflow-hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2 h-full bg-slate-700 w-screen z-100 transition-all duration-[30s] overflow-hidden">
                    {/* <Link to="/" className="block rounded-md px-5 py-2 text-white z-100 font-medium hover:bg-gray-700 hover:text-white">
                        <span>Services</span>
                    </Link> */}
                    <Link href="/" className="block rounded-md px-5 py-2 text-white font-medium z-100 hover:bg-gray-700 hover:text-white">
                        About us
                    </Link>
                    <Link href="/" className="block rounded-md px-5 py-2 text-white z-100 font-medium  hover:bg-gray-700 hover:text-white">
                        Login
                    </Link>
                </div>
            </div>


            {showDropDown && <div id="dropdown" className={`z-10 bg-white divide-y divide-gray-100 absolute rounded-lg shadow w-44 dark:bg-gray-700 mt-11 right-24`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log out</Link>
                    </li>
                </ul>
            </div>}

            <ul className='flex flex-row z-100 text-white gap-6 m-4 px-2 md:justify-between justify-around items-center hidden w-full md:inline-flex md:w-auto'>
                {/* <li className='hover:font-bold transition-all duration-100 mx-3 z-100'>
                    <Link className='inline-flex items-center z-100' to='/'>
                        Services
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg> 
                    </Link>
                </li> */}
                <li className='hover:font-bold transition-all duration-100 mx-3 z-100'>
                    <Link href={'/'} className='z-100'>
                        About us
                    </Link>
                </li>
                <li className='hover:font-bold transition-all duration-100 mx-3 z-100'>
                    <Link className='z-100 flex items-center' href={`/`}>
                        {'Login'}
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default Navbar