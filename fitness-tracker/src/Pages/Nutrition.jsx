import React from 'react';
import { Link } from 'react-router-dom'; // Only if you're using React Router
import logo from '../assets/img/logo/logo.png';
import blog1 from "../assets/img/gallery/blog1.png";
import blog2 from "../assets/img/gallery/blog2.png";
import aboutpic from "../assets/img/gallery/about.png";


const Nutrition = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
    <>
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

                {/* Main */}
                <main>
                    <section className="team-area fix mt-5">
                        <div className="container n-table">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Day</th>
                                        <th scope="col">Breakfast</th>
                                        <th scope="col">Lunch</th>
                                        <th scope="col">Dinner</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((day) => (
                                        <tr key={day}>
                                            <th scope="row">{day}</th>
                                            <td>---</td>
                                            <td>---</td>
                                            <td>---</td>
                                            <td>
                                                {/* If using React Router */}
                                                <Link to={`/set_nutriton?day=${day}`} className="btn btn-danger">Set</Link>
                                                {/* If not using React Router, uncomment the following: */}
                                                {/* <a href={`Set_Meal.html?day=${day}`} className="btn btn-danger">Set</a> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section class="about-area2 pb-padding pt-50 pb-80">
                        <div class="support-wrapper align-items-center">
                            <div class="right-content2">
                               
                                <div class="right-img wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                                    <img src={aboutpic} alt=""/>
                                </div>
                            </div>
                            <div class="left-content2">
                              
                                <div class="section-tittle2 mb-20 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                    <div class="front-text">
                                        <h2 class="">About Me</h2>
                                        <p>You’ll look at graphs and charts in Task One, how to approach the task and the language needed
                                            for a successful answer. You’ll examine Task Two questions and learn how to plan, write and
                                            check academic essays.</p>
                                        <p class="mb-40">Task One, how to approach the task and the language needed for a successful answer. You’ll
                                            examine Task Two questions and learn how to plan, write and check academic essays.</p>
                                        <a href="courses.html" class="border-btn">My Courses</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                   
                    <section class="home-blog-area pt-10 pb-50">
                        <div class="container">
                          
                            <div class="row justify-content-center">
                                <div class="col-lg-7 col-md-9 col-sm-10">
                                    <div class="section-tittle text-center mb-100 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
                                        <h2>From Blog</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="home-blog-single mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                        <div class="blog-img-cap">
                                            <div class="blog-img">
                                                <img src={blog1} alt=""/>
                                            </div>
                                            <div class="blog-cap">
                                                <span>Gym & Fitness</span>
                                                <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6">
                                    <div class="home-blog-single mb-30 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".6s">
                                        <div class="blog-img-cap">
                                            <div class="blog-img">
                                                <img src={blog2} alt=""/>
                                            </div>
                                            <div class="blog-cap">
                                                <span>Gym & Fitness</span>
                                                <h3><a href="blog_details.html">Your Antibiotic One Day To 10 Day Options</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="services-area">
                        <div class="container">
                            <div class="row justify-content-between">
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                                    <div class="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                                        <div class="features-icon">
                                            <img src="assets/img/icon/icon1.svg" alt=""/>
                                        </div>
                                        <div class="features-caption">
                                            <h3>Location</h3>
                                            <p>You’ll look at graphs and charts in Task One, how to approach </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div class="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                                        <div class="features-icon">
                                            <img src="assets/img/icon/icon2.svg" alt=""/>
                                        </div>
                                        <div class="features-caption">
                                            <h3>Phone</h3>
                                            <p>(90) 277 278 2566</p>
                                            <p>  (78) 267 256 2578</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                    <div class="single-services mb-40 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                                        <div class="features-icon">
                                            <img src="assets/img/icon/icon3.svg" alt=""/>
                                        </div>
                                        <div class="features-caption">
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
           
            </>
            );
};

            export default Nutrition;
