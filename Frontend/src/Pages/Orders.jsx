import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Tittle from '../Components/Tittle';
import { Truck, MapPin } from "lucide-react";

function Orders() {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='mt-20 border-t pt-16 px-4 md:px-10 lg:px-20'> 
      <div className='text-2xl mb-6'>
        <Tittle text1={'my'} text2={'orders'} />
      </div>

      <div className='space-y-6'>
        {products.length > 0 ? (
          products.slice(0,5).map((item, index) => (
            <div key={index} className='p-4 border rounded-lg flex flex-col md:flex-row items-center gap-4 shadow-md'>
              <img src={item.image[0]} alt={item.name} className='w-20 h-20 rounded-lg' />
              <div className='flex-1'>
                <h2 className='text-lg font-semibold'>{item.name}</h2>
                
                <p className='text-gray-700'>Price: {currency}{item.price}</p>
                <p className='text-gray-700'>Quantity: 1</p>
                <p className='text-sm text-green-600'>Status: {item.status}</p>
                <p className='text-sm text-gray-500'>Paymemt method : {item.deliveryDate}</p>
                <p>Date: <span className='text-gray-500'>25 Jan 2025</span></p>
              </div>
              <div>
              </div>
              <div className='flex flex-col gap-2'>
                <button className='px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-100'>
                  <Truck size={16} /> Track Order
                </button>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700'>
                  <MapPin size={16} /> Shipping Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No orders placed yet.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;