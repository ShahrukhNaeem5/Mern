import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/style.css';
import logo from '../assets/img/logo/logo.png';
import setnut from '../assets/img/banner/set-nut.jpg';
import blog1 from "../assets/img/gallery/blog1.png";
import blog2 from "../assets/img/gallery/blog2.png";
import galleryimage1 from "../assets/img/gallery/gallery1.png";
import galleryimage2 from "../assets/img/gallery/gallery2.png";
import galleryimage3 from "../assets/img/gallery/gallery3.png";
import galleryimage4 from "../assets/img/gallery/gallery4.png";
import galleryimage5 from "../assets/img/gallery/gallery5.png";
import galleryimage6 from "../assets/img/gallery/gallery6.png";
import videobg from '../assets/img/gallery/video-bg.png';

const Set_Nutrition = () => {
    const location = useLocation();
    const [dayName, setDayName] = useState('');
    const [breakfastItems, setBreakfastItems] = useState([{ food: '', quantity: 1 }]);
    const [lunchItems, setLunchItems] = useState([{ food: '', quantity: 1 }]);
    const [dinnerItems, setDinnerItems] = useState([{ food: '', quantity: 1 }]);
    const [foodOptions, setFoodOptions] = useState([]);

    useEffect(() => {
        // Fetch food options from the API
        const fetchFoodOptions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/foods');
                const data = await response.json();
                console.log('Fetched food options:', data); // Log the fetched data
                setFoodOptions(data);
            } catch (error) {
                console.error('Error fetching food options:', error);
            }
        };

        fetchFoodOptions();

        const query = new URLSearchParams(location.search);
        const day = query.get('day') || 'Unknown Day';
        setDayName(day);
    }, [location.search]);

    const createFoodSelection = (setItems) => {
        setItems(prevItems => [
            ...prevItems,
            { food: '', quantity: 1 }
        ]);
    };

    const removeFood = (index, setItems) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleChange = (index, value, setItems, field) => {
        setItems(prevItems =>
            prevItems.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Breakfast:', breakfastItems);
        console.log('Lunch:', lunchItems);
        console.log('Dinner:', dinnerItems);
    };

    const getFoodByCategory = (category) => {
        return foodOptions
            .filter(food => food.category === category)
            .map(food => food.food_name); // Use food_name instead of food.name
    };

    return (
        <div className="black-bg">
            <header>
                <div className="header-area nt-header header-transparent">
                    <div className="main-header header-sticky">
                        <div className="container-fluid">
                            <div className="menu-wrapper d-flex align-items-center justify-content-between">
                                {/* Logo */}
                                <div className="logo">
                                    <a href="index-2.html"><img src={logo} alt="logo" /></a>
                                </div>
                                {/* Main menu */}
                                <div className="main-menu f-right d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">
                                            <li><a href="index-2.html">Home</a></li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="courses.html">Courses</a></li>
                                            <li><a href="pricing.html">Pricing</a></li>
                                            <li><a href="gallery.html">Gallery</a></li>
                                            <li><a href="blog.html">Blog</a>
                                                <ul className="submenu">
                                                    <li><a href="blog.html">Blog</a></li>
                                                    <li><a href="blog_details.html">Blog Details</a></li>
                                                    <li><a href="elements.html">Elements</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* Header button */}
                                <div className="header-btns d-none d-lg-block f-right">
                                    <a href="contact.html" className="btn">Contact me</a>
                                </div>

                                {/* Mobile Menu */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section className="team-area fix mt-5">
                    <div className="container set-nt">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="text-center">Set Meals for <span id="dayName">{dayName}</span></h1>
                                <form onSubmit={handleSubmit} id="mealForm">
                                    {/* Breakfast */}
                                    <div className="meal-card">
                                        <h4>Breakfast</h4>
                                        <div id="breakfastContainer">
                                            {breakfastItems.map((item, index) => (
                                                <div className="food-selection" key={index}>
                                                    <select
                                                        className="form-select d-inline me-2 meal-select"
                                                        value={item.food}
                                                        onChange={(e) =>
                                                            handleChange(index, e.target.value, setBreakfastItems, 'food')
                                                        }
                                                    >
                                                        <option value="">Select Food</option>
                                                        {getFoodByCategory('breakfast').map((food) => (
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
                                                            handleChange(index, e.target.value, setBreakfastItems, 'quantity')
                                                        }
                                                        style={{ width: '70px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger remove-food"
                                                        onClick={() => removeFood(index, setBreakfastItems)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn st-meal-btn btn-primary mb-2"
                                            onClick={() => createFoodSelection(setBreakfastItems)}
                                        >
                                            Add Food
                                        </button>
                                    </div>

                                    {/* Lunch */}
                                    <div className="meal-card">
                                        <h4>Lunch</h4>
                                        <div id="lunchContainer">
                                            {lunchItems.map((item, index) => (
                                                <div className="food-selection" key={index}>
                                                    <select
                                                        className="form-select d-inline me-2 meal-select"
                                                        value={item.food}
                                                        onChange={(e) =>
                                                            handleChange(index, e.target.value, setLunchItems, 'food')
                                                        }
                                                    >
                                                        <option value="">Select Food</option>
                                                        {getFoodByCategory('lunch').map((food) => (
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
                                                            handleChange(index, e.target.value, setLunchItems, 'quantity')
                                                        }
                                                        style={{ width: '70px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger remove-food"
                                                        onClick={() => removeFood(index, setLunchItems)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn st-meal-btn btn-primary mb-2"
                                            onClick={() => createFoodSelection(setLunchItems)}
                                        >
                                            Add Food
                                        </button>
                                    </div>

                                    {/* Dinner */}
                                    <div className="meal-card">
                                        <h4>Dinner</h4>
                                        <div id="dinnerContainer">
                                            {dinnerItems.map((item, index) => (
                                                <div className="food-selection" key={index}>
                                                    <select
                                                        className="form-select d-inline me-2 meal-select"
                                                        value={item.food}
                                                        onChange={(e) =>
                                                            handleChange(index, e.target.value, setDinnerItems, 'food')
                                                        }
                                                    >
                                                        <option value="">Select Food</option>
                                                        {getFoodByCategory('dinner').map((food) => (
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
                                                            handleChange(index, e.target.value, setDinnerItems, 'quantity')
                                                        }
                                                        style={{ width: '70px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger remove-food"
                                                        onClick={() => removeFood(index, setDinnerItems)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn st-meal-btn btn-primary mb-2"
                                            onClick={() => createFoodSelection(setDinnerItems)}
                                        >
                                            Add Food
                                        </button>
                                    </div>

                                    <button type="submit" className="btn btn-success p-4">Submit Meals</button>
                                </form>
                            </div>
                            <div className="col-md-4">
                                <img src={setnut} alt="Nutrition" className="img-fluid mt-5" />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="gallery-area section-padding30 ">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage1})` }}
                                    ></div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage2})` }}
                                    ></div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage3})` }}
                                    ></div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage4})` }}
                                    ></div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage5})` }}
                                    ></div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <div className="box snake mb-30">
                                    <div className="gallery-img big-img"   style={{ backgroundImage: `url(${galleryimage6})` }}>
</div>
                                    <div className="overlay">
                                        <div className="overlay-content">
                                            <h3>Muscle gaining </h3>
                                            <a href="gallery.html"><i className="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <section className="home-blog-area pt-10 pb-50">
                    <div className="container">

                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-md-9 col-sm-10">
                                <div className="section-tittle text-center mb-100 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
                                    <h2>From Blog</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                    <div className="blog-img-cap">
                                        <div className="blog-img">
                                            <img src={blog1} alt="" />
                                        </div>
                                        <div className="blog-cap">
                                            <span>Gym & Fitness</span>
                                            <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="home-blog-single mb-30 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".6s">
                                    <div className="blog-img-cap">
                                        <div className="blog-img">
                                            <img src={blog2} alt="" />
                                        </div>
                                        <div className="blog-cap">
                                            <span>Gym & Fitness</span>
                                            <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div
      className="video-area section-bg2 d-flex align-items-center"
      data-background={videobg}
    >                    <div className="container">
                        <div className="video-wrap position-relative">
                            <div className="video-icon" >
                                <a className="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0"><i className="fas fa-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="services-area">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                                <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                                    <div className="features-icon">
                                        <img src="assets/img/icon/icon1.svg" alt="" />
                                    </div>
                                    <div className="features-caption">
                                        <h3>Location</h3>
                                        <p>You’ll look at graphs and charts in Task One, how to approach </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                <div className="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                    <div className="features-icon">
                                        <img src="assets/img/icon/icon2.svg" alt="" />
                                    </div>
                                    <div className="features-caption">
                                        <h3>Phone</h3>
                                        <p>(90) 277 278 2566</p>
                                        <p>  (78) 267 256 2578</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                <div className="single-services mb-40 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                                    <div className="features-icon">
                                        <img src="assets/img/icon/icon3.svg" alt="" />
                                    </div>
                                    <div className="features-caption">
                                        <h3>Email</h3>
                                        <p>jacson767@gmail.com</p>
                                        <p>contact56@zacsion.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>

                <div className="footer-area black-bg">
                    <div className="container">
                        <div className="footer-top footer-padding">

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="single-footer-caption mb-50 text-center">

                                        <div className="footer-logo wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                            <a href="index-2.html"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
                                        </div>

                                        <div className="header-area main-header2 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                                            <div className="main-header main-header2">
                                                <div className="menu-wrapper menu-wrapper2">
                                                    <div className="main-menu main-menu2 text-center">
                                                        <nav>
                                                            <ul>
                                                                <li><a href="index-2.html">Home</a></li>
                                                                <li><a href="about.html">About</a></li>
                                                                <li><a href="courses.html">Courses</a></li>
                                                                <li><a href="pricing.html">Pricing</a></li>
                                                                <li><a href="gallery.html">Gallery</a></li>
                                                                <li><a href="contact.html">Contact</a></li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="footer-social mt-30 wow fadeInUp" data-wow-duration="3s" data-wow-delay=".8s">
                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                            <a href="https://bit.ly/sai4ull"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-lg-12">
                                    <div className="footer-copy-right text-center">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="back-top" >
                <a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
            </div>
        </div>
    );
};

export default Set_Nutrition;
