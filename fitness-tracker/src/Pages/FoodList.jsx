import React, { useEffect, useState } from 'react';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/foods');
                if (!response.ok) { // Check if response is OK
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setError('Failed to fetch food items.'); // Set error message
            }
        };

        fetchFoods();
    }, []);

    return (
        <div>
            <h1>Food List</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error */}
            <ul>
                {foods.map(food => (
                    <li key={food.f_id}>
                        {food.food_name} - {food.category} - {food.calories} calories
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
