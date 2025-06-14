import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../App';
function Services() {
    const {cartItems,addToCart,clearCart} = useContext(CartContext);
    const services = [
        {
            name: "WhatsApp 12000",
            qty: 12000,
            description: "Flexible use for MB, minutes or SMS. Unlimited texting even after units have been used up. Surfing with up to 50 Mbps including 5G. EU roaming included at no extra charge.",
            price: 10.00,
            duration: "4 weeks",
            simCardFee: 10.00,
            features: [
                "12,000 units flexible use for MB, minutes or SMS",
                "WhatsApp Flat: Unlimited texting even after units have been used up",
                "High-speed internet: Surfing with up to 50 Mbps including 5G",
                "EU roaming included at no extra charge"
            ]
        },
        {
            name: "WhatsApp 5000",
            qty: 5000,
            description: "Flexible use for MB, minutes or SMS. Unlimited texting even after units have been used up. Surfing with up to 50 Mbps including 5G. EU roaming included at no extra charge.",
            price: 5.00,
            duration: "4 weeks",
            simCardFee: 10.00,
            features: [
                "5,000 units flexible use for MB, minutes or SMS",
                "WhatsApp Flat: Unlimited texting even after units have been used up",
                "High-speed internet: Surfing with up to 50 Mbps including 5G",
                "EU roaming included at no extra charge"
            ]
        },
        {
            name: "WhatsApp 2000",
            qty: 2000,
            description: "Flexible use for MB, minutes or SMS. Unlimited texting even after units have been used up. Surfing with up to 50 Mbps including 5G. EU roaming included at no extra charge.",
            price: 3.00,
            duration: "4 weeks",
            simCardFee: 10.00,
            features: [
                "2,000 units flexible use for MB, minutes or SMS",
                "WhatsApp Flat: Unlimited texting even after units have been used up",
                "High-speed internet: Surfing with up to 50 Mbps including 5G",
                "EU roaming included at no extra charge"
            ]
        },
        {
            name: "WhatsApp Unlimited",
            qty: "Unlimited",
            description: "Truly unlimited data, calls, and SMS. Unlimited texting even after units have been used up. Surfing with up to 100 Mbps including 5G. EU roaming included at no extra charge.",
            price: 25.00,
            duration: "4 weeks",
            simCardFee: 10.00,
            features: [
                "Unlimited data, calls, and SMS",
                "WhatsApp Flat: Unlimited texting always",
                "Ultra high-speed internet: Surfing with up to 100 Mbps including 5G",
                "EU roaming included at no extra charge"
            ]
        }

    ]
  return (
    <div className="flex flex-row gap-4">
      {services.map((service)=>(
        <>
        <div className='bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lime-700 w-100'>
            <div className='bg-green-200 text-bold p-4 rounded-lg mb-4'>
                <h2 className='text-2xl font-bold mb-4'>{service.name}</h2>
            <h1 className='text-xl font-semibold mb-2'>{service.qty} units</h1>
            </div>
            <p className='text-gray-700 mb-4'>{service.description}</p>
            <div className='text-gray-600 mb-4 font-bold'>
                {service.features.map((feature)=>(
                    <>
                    <p className='mb-2'>✔ {feature}</p>
                    </>
                ))}
            </div>
            <h1 className='text-lg font-bold mb-2 text-center'>Price: €{service.price.toFixed(2)}</h1>
            <p className='text-gray-600 mb-4'>Duration: {service.duration}</p>
            <button className='bg-green-900 rounded-lg text-white text-2xl hover:bg-green-700 p-4 w-full' onClick={() => addToCart(service)}>
                {cartItems.some(item => item.name === service.name) ? "Remove from Cart" : "Add To Cart"}
            </button>
        </div>
        </>
      ))}
    </div>
  )
}

export default Services
