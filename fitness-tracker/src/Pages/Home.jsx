import React from 'react'
import blog1 from "../assets/img/gallery/blog1.png";
import blog2 from "../assets/img/gallery/blog2.png";
import team1 from "../assets/img/gallery/team1.png";
import team2 from "../assets/img/gallery/team2.png";
import team3 from "../assets/img/gallery/team3.png";
import galleryimage1 from "../assets/img/gallery/gallery1.png";
import galleryimage2 from "../assets/img/gallery/gallery2.png";
import galleryimage3 from "../assets/img/gallery/gallery3.png";
import galleryimage4 from "../assets/img/gallery/gallery4.png";
import galleryimage5 from "../assets/img/gallery/gallery5.png";
import galleryimage6 from "../assets/img/gallery/gallery6.png";
import aboutpic from "../assets/img/gallery/about.png";

import loader from "../assets/img/logo/loder.png";
import videobg from '../assets/img/gallery/video-bg.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='black-bg'>

      {/* jhjy8u[] */}
      <header>

        <div class="header-area header-transparent">
          <div class="main-header header-sticky">
            <div class="container-fluid">
              <div class="menu-wrapper d-flex align-items-center justify-content-between">
                <div class="logo">
                  <a href="index-2.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                </div>
                <div class="main-menu f-right d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li><a href="index-2.html">Home</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="courses.html">Courses</a></li>
                      <li><a href="pricing.html">Pricing</a></li>
                      <li><a href="gallery.html">Gallery</a></li>
                      <li><a href="blog.html">Blog</a>
                        <ul class="submenu">
                          <li><a href="blog.html">Blog</a></li>
                          <li><a href="blog_details.html">Blog Details</a></li>
                          <li><a href="elements.html">Elements</a></li>
                        </ul>
                      </li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </nav>
                </div>
                <div class="header-btns d-none d-lg-block f-right">
                  <a href="contact.html" class="btn">Contact me</a>
                </div>
                <div class="col-12">
                  <div class="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="slider-area position-relative">
          <div class="slider-active">

            <div class="single-slider slider-height d-flex align-items-center">
              <div class="container">
                <div class="row">
                  <div class="col-xl-9 col-lg-9 col-md-10">
                    <div class="hero__caption">
                      <span data-animation="fadeInLeft" data-delay="0.1s">Hi This is  Zacson</span>
                      <h1 data-animation="fadeInLeft" data-delay="0.4s">Gym Trainer</h1>
                      <a href="courses.html" class="border-btn hero-btn" data-animation="fadeInLeft" data-delay="0.8s">My Courses</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="traning-categories black-bg">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-6 col-lg-6">
                <div class="single-topic text-center mb-30">
                  <div class="topic-img">
                    <img src="https://static.vecteezy.com/system/resources/previews/033/741/039/non_2x/various-types-of-food-on-a-dark-background-ai-generated-photo.jpg" alt="" />
                    <div class="topic-content-box">
                      <div class="topic-content">
                        <h3>Nutrition</h3>
                        <p>Nutrition is the process of providing or obtaining the essential food  and nutrients <br/> necessary for health, growth, and energy.</p>
                        <Link to={"/nutrition"} class="border-btn">Track Nutrition</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="single-topic text-center mb-30">
                  <div class="topic-img">
                    <img src="https://st3.depositphotos.com/1835273/15480/i/450/depositphotos_154803348-stock-photo-muscular-bodybuilder-guy-doing-exercises.jpg" alt="" />
                    <div class="topic-content-box">
                      <div class="topic-content">
                        <h3>Excercise</h3>
                        <p>Exercise is any physical activity that enhances overall fitness by strengthening  <br/> muscles, improving cardiovascular function</p>
                        <a href="courses.html" class="border-btn">Plan Workout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="team-area fix">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="section-tittle text-center mb-55 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                  <h2 >What I Offer</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-6">
                <div class="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s" >
                  <div class="cat-icon">
                    <img src={team1} alt="" />
                  </div>
                  <div class="cat-cap">
                    <h5><a href="services.html">Body Building</a></h5>
                    <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                  <div class="cat-icon">
                    <img src={team2} alt="" />
                  </div>
                  <div class="cat-cap">
                    <h5><a href="services.html">Muscle Gain</a></h5>
                    <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="single-cat text-center mb-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".6s">
                  <div class="cat-icon">
                    <img src={team3} alt="" />
                  </div>
                  <div class="cat-cap">
                    <h5><a href="services.html">Weight Loss</a></h5>
                    <p>You’ll look at graphs and charts in Task One, how to approach the task </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="gallery-area section-padding30 ">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className="box snake mb-30">
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage1})` }}
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
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage2})` }}
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
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage3})` }}
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
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage4})` }}
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
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage5})` }}
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
                  <div className="gallery-img big-img" style={{ backgroundImage: `url(${galleryimage6})` }}>
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


        <section class="about-area2 fix pb-padding pt-50 pb-80">
          <div class="support-wrapper align-items-center">
            <div class="right-content2">

              <div class="right-img wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                <img src={aboutpic} alt="" />
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
                      <img src="assets/img/gallery/blog1.png" alt="" />
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
                      <img src="assets/img/gallery/blog2.png" alt="" />
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

        <div class="video-area section-bg2 d-flex align-items-center" data-background="assets/img/gallery/video-bg.png">
          <div class="container">
            <div class="video-wrap position-relative">
              <div class="video-icon" >
                <a class="popup-video btn-icon" href="https://www.youtube.com/watch?v=up68UAfH0d0"><i class="fas fa-play"></i></a>
              </div>
            </div>
          </div>
        </div>

        <section class="services-area">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                <div class="single-services mb-40 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".1s">
                  <div class="features-icon">
                    <img src="assets/img/icon/icon1.svg" alt="" />
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
                    <img src="assets/img/icon/icon2.svg" alt="" />
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
                    <img src="assets/img/icon/icon3.svg" alt="" />
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

        <div class="footer-area black-bg">
          <div class="container">
            <div class="footer-top footer-padding">

              <div class="row">
                <div class="col-xl-12">
                  <div class="single-footer-caption mb-50 text-center">

                    <div class="footer-logo wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">
                      <a href="index-2.html"><img src="assets/img/logo/logo2_footer.png" alt=""/></a>
                    </div>

                    <div class="header-area main-header2 wow fadeInUp" data-wow-duration="2s" data-wow-delay=".4s">
                      <div class="main-header main-header2">
                        <div class="menu-wrapper menu-wrapper2">

                          <div class="main-menu main-menu2 text-center">
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

                    <div class="footer-social mt-30 wow fadeInUp" data-wow-duration="3s" data-wow-delay=".8s">
                      <a href="#"><i class="fab fa-twitter"></i></a>
                      <a href="https://bit.ly/sai4ull"><i class="fab fa-facebook-f"></i></a>
                      <a href="#"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="footer-bottom">
              <div class="row d-flex align-items-center">
                <div class="col-lg-12">
                  <div class="footer-copy-right text-center">
                    <p>
                      Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com/" target="_blank">Colorlib</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>

      <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
      </div>
    </div>
  )
}

export default Home