import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function Navbar() {
  const [visible, setVisible] = useState(false);

  const { showSearch, setShowSearch,getCartCount } = useContext(ShopContext);

  return (
    <>
      {/* Fixed Navbar */}
      <div className='fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center py-4 px-4 font-medium'>
        <Link to='/'>
          <img src={assets.logo} className='w-36' alt="" />
        </Link>
 
<ul className='hidden sm:flex gap-5 text-sm text-gray-500'>
          <NavLink to='/' className='flex flex-col items-center ' >  
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden' />
          </NavLink>

          <NavLink to='/collection' className='flex flex-col items-center ' >  
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden' />
          </NavLink>

          <NavLink to='/about' className='flex flex-col items-center ' >  
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden' />
          </NavLink>

          <NavLink to='/contact' className='flex flex-col items-center ' >  
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden' />
          </NavLink>

        
        </ul>

        <div className='flex items-center gap-4'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer hover:text-gray-600' alt="" />
          <div className='relative group'>
<Link to='/login'>
<img  src={assets.profile_icon}  className='h-5 cursor-pointer' alt="" />

</Link>      
      <div className='absolute right-0 mt-2 hidden group-hover:block bg-white shadow-lg border rounded-md z-50  text-nowrap'>
              <div className='flex flex-col items-center gap-2 bg-slate-100 text-gray-500 py-3 px-5 rounded'>
                <p className='hover:text-black cursor-pointer'>My Profile</p>
                <Link to='/orders' className='hover:text-black cursor-pointer'>Orders</Link>
                <p className='hover:text-black cursor-pointer'>Log-Out</p>
              </div>
            </div>
          </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute top-[12px] right-[-6px] w-4 h-4 bg-black text-center text-white leading-4 rounded-full aspect-square text-[8px]'>{getCartCount()}</p>
          </Link>
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='md:hidden flex w-5 cursor-pointer' alt="" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white z-50 shadow-md w-64 transform transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className='flex flex-col text-gray-600'>
            <div className='flex items-center gap-3 p-3 cursor-pointer'>
              <img onClick={() => setVisible(false)} src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
              <p>Back</p>
            </div>

            <NavLink onClick={() => setVisible(false)} to='/' className='px-3 py-2 border'> Home </NavLink>
            <NavLink onClick={() => setVisible(false)} to='/collection' className='px-3 py-2 border'>  Collection </NavLink>
            <NavLink onClick={() => setVisible(false)} to='/contact' className='px-3 py-2 border'>  Contact </NavLink>
            <NavLink onClick={() => setVisible(false)} to='/about' className='px-3 py-2 border'>  About </NavLink>
          </div>
        </div>
      
    </>
  );
}

export default Navbar;
