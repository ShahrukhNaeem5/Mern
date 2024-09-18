import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added `useNavigate` for redirect
import '../assets/css/style.css';
import setnut from '../assets/img/banner/set-nut.jpg';
import axios from 'axios';

const Set_Nutrition = () => {
    const location = useLocation();
    const navigate = useNavigate(); // For redirecting in case the user is not logged in

    const [dayName, setDayName] = useState('');
    const [meals, setMeals] = useState({
        breakfast: [{ food: '', quantity: 1 }],
        lunch: [{ food: '', quantity: 1 }],
        dinner: [{ food: '', quantity: 1 }]
    });
    const [foodOptions, setFoodOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null); // State for storing userId

    // Fetch logged-in user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/protected', {
                    withCredentials: true,
                });
                setUserId(response.data.id); // Assuming the response contains user ID
            } catch (error) {
                console.error("Error fetching user data", error);
                setError("User not logged in.");
                navigate('/login'); // Redirect to login if the user is not logged in
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        // Fetch food options from the API
        const fetchFoodOptions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/foods');
                if (!response.ok) throw new Error('Failed to fetch food options');
                const data = await response.json();
                setFoodOptions(data);
            } catch (error) {
                console.error('Error fetching food options:', error);
                setError('Unable to load food options.');
            }
        };

        fetchFoodOptions();

        const query = new URLSearchParams(location.search);
        const day = query.get('day') || 'Unknown Day';
        setDayName(day);
    }, [location.search]);

    const createFoodSelection = (mealType) => {
        setMeals(prevMeals => ({
            ...prevMeals,
            [mealType]: [...prevMeals[mealType], { food: '', quantity: 1 }]
        }));
    };

    const removeFood = (mealType, index) => {
        setMeals(prevMeals => ({
            ...prevMeals,
            [mealType]: prevMeals[mealType].filter((_, i) => i !== index)
        }));
    };

    const handleChange = (mealType, index, value, field) => {
        setMeals(prevMeals => ({
            ...prevMeals,
            [mealType]: prevMeals[mealType].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!userId) {
            setError("User not logged in.");
            navigate('/login'); // Redirect to login if no user ID is found
            return;
        }

        const mealData = {
            userId,
            day: dayName,
            meals
        };

        try {
            const response = await fetch('http://localhost:4000/saveMeal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess('Meal saved successfully!');
            } else {
                setError(result.message || 'Error saving meal');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while saving the meal');
        } finally {
            setLoading(false);
        }
    };

    const getFoodByCategory = (category) => {
        return foodOptions.filter(food => food.category === category).map(food => food.food_name);
    };

    const renderMealSelection = (mealType, items, setItems) => (
        <div className="meal-card">
            <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
            <div id={`${mealType}Container`}>
                {items.map((item, index) => (
                    <div className="food-selection" key={index}>
                        <select
                            className="form-select d-inline me-2 meal-select"
                            value={item.food}
                            onChange={(e) =>
                                handleChange(mealType, index, e.target.value, 'food')
                            }
                            required
                        >
                            <option value="">Select Food</option>
                            {getFoodByCategory(mealType).map((food) => (
                                <option key={food} value={food}>
                                    {food}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="form-control qty-input"
                            min="1"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) =>
                                handleChange(mealType, index, e.target.value, 'quantity')
                            }
                            style={{ width: '70px' }}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-danger remove-food"
                            onClick={() => removeFood(mealType, index)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                className="btn st-meal-btn btn-primary mb-2"
                onClick={() => createFoodSelection(mealType)}
            >
                Add Food
            </button>
        </div>
    );

    return (
        <div className="black-bg">
            <main>
                <section className="team-area fix mt-5">
                    <div className="container set-nt">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="text-center">Set Meals for <span id="dayName">{dayName}</span></h1>
                                
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                
                                <form onSubmit={handleSubmit} id="mealForm">
                                    {renderMealSelection('breakfast', meals.breakfast, setMeals)}
                                    {renderMealSelection('lunch', meals.lunch, setMeals)}
                                    {renderMealSelection('dinner', meals.dinner, setMeals)}

                                    <button type="submit" className="btn btn-success p-4" disabled={loading}>
                                        {loading ? 'Saving...' : 'Submit Meals'}
                                    </button>
                                </form>
                            </div>

                            <div className="col-md-4">
                                <div className="team-img setntimg">
                                    <img src={setnut} alt="Nutrition" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Set_Nutrition;
