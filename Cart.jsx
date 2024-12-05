import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/axios';

const Cart = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="mx-4 mt-4 font-outfit h-[530px] overflow-y-auto 
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-gray-400/50
            [&::-webkit-scrollbar-thumb]:rounded-full
            dark:[&::-webkit-scrollbar-thumb]:bg-gray-600/50
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            <div className="flex flex-col gap-2">
                <h1>Cart</h1>
            </div>
        </div>
    );
};

export default Cart;