 import React, { useState } from 'react';
import Tittle from '../Components/Tittle';
import { useNavigate } from 'react-router-dom';

const paymentMethods = [
  { name: 'PayPal', img: 'https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_266x142.png' },
  { name: 'Credit Card', img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/MasterCard-logo.png' },
  { name: 'Google Pay', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png' },
  { name: 'Apple Pay', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Apple_Pay_logo.svg' },
];

function PlaceOrder() {
  const [userInfo, setUserInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '', street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [selectedPayment, setSelectedPayment] = useState(null);

  const subtotal = 100.00;
  const discount = subtotal * 0.1;
  const shippingFee = 5.00;
  const total = subtotal - discount + shippingFee;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

    const navigate = useNavigate();
 
  return (
    <div className='container mx-auto px-4 py-10 mt-20'>
      <Tittle text1='Complete Your' text2='Order' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Billing Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input type='text' name='firstName' value={userInfo.firstName} onChange={handleChange} placeholder='First Name' className='input-field' />
            <input type='text' name='lastName' value={userInfo.lastName} onChange={handleChange} placeholder='Last Name' className='input-field' />
            <input type='email' name='email' value={userInfo.email} onChange={handleChange} placeholder='Email Address' className='input-field' />
            <input type='text' name='phone' value={userInfo.phone} onChange={handleChange} placeholder='Phone Number' className='input-field' />
            <input type='text' name='street' value={userInfo.street} onChange={handleChange} placeholder='Street Address' className='input-field' />
            <input type='text' name='city' value={userInfo.city} onChange={handleChange} placeholder='City' className='input-field' />
            <input type='text' name='state' value={userInfo.state} onChange={handleChange} placeholder='State' className='input-field' />
            <input type='text' name='zipCode' value={userInfo.zipCode} onChange={handleChange} placeholder='ZIP Code' className='input-field' />
            <input type='text' name='country' value={userInfo.country} onChange={handleChange} placeholder='Country' className='input-field' />
          </div>
        </div>
        <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>Order Summary</h2>
          <div className='flex justify-between text-gray-700 mb-2'><span>Subtotal:</span><span className='font-medium'>${subtotal.toFixed(2)}</span></div>
          <div className='flex justify-between text-green-600 mb-2'><span>Discount (10%):</span><span className='font-medium'>-${discount.toFixed(2)}</span></div>
          <div className='flex justify-between text-gray-700 mb-2'><span>Shipping Fee:</span><span className='font-medium'>${shippingFee.toFixed(2)}</span></div>
          <div className='flex justify-between font-bold text-xl mt-4'><span>Total:</span><span className='text-gray-800'>${total.toFixed(2)}</span></div>
        </div>
      </div>
      <div className='mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Select Payment Method</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {paymentMethods.map((method, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center border p-4 rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer ${selectedPayment === method.name ? 'border-black' : 'border-gray-300'}`}
              onClick={() => setSelectedPayment(method.name)}
            >
              <img src={method.img} alt={method.name} className='w-16 h-16 object-contain' />
              <p className='mt-2 text-gray-700 font-medium'>{method.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-10 text-center'>
        <button className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold shadow-md' onClick={() => navigate("/orders")}>
          Place Order
        </button>
      </div>
      <style>{`
        .input-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          transition: border 0.3s;
        }
        .input-field:focus {
          border-color: black;
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default PlaceOrder;