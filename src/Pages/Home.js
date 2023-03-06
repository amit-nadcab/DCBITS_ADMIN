import React from 'react'
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { Sidebar } from '../Components/Sidebar'


export const Home = () => {
  return (
    <>
    
    <Navbar/>
     {/* Banners Start */}
     <div className="banner" id="home" style={{backgroundImage: "url('assets/img/banner-bg.png')"}}>
        <img className="bg-sape" src="assets/img/banner-bg-2.png" alt=""/>
        <div className="hero-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-7 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <div className="banner-content">
                            <h3 className="subtitle">Cryptocurrency Made Easy</h3>
                            <h1 className="head">A Better Way To Do Money</h1>
                        </div>
                        {/* <form action="#">
                            <div className="form-group">
                                <input type="email" placeholder="Enter Your Email" className="form-control"/>
                                <button className="button-1">Get Started</button>
                            </div>
                        </form> */}
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Global Rates */}
    <div className="global-rates" id="about">
        <div className="dots">
            <img src="assets/img/dot-1.png" alt="" className="dot-1" data-paroller-factor="0.2"
                data-paroller-type="foreground" data-paroller-direction="vertical"/>
            <img src="assets/img/dot-2.png" alt="" className="dot-2"  data-paroller-factor="0.2"
            data-paroller-type="foreground" data-paroller-direction="vertical"/>
            <img src="assets/img/dot-3.png" alt="" className="dot-3 img-fluid" data-paroller-factor="0.2"
                data-paroller-type="foreground" data-paroller-direction="horizontal"/>
        </div>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-xl-6 d-none d-xl-block">
                    <div className="section-thumb wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <img src="assets/img/global-rate.png" alt="" className="global-img"/>
                    </div>
                </div>
                <div className="col-xl-6 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.3s">
                    <div className="section-head">
                        <h4 className="lasthead">One Account,</h4>
                        <h2 className="title">Global Rates</h2>
                        <p className="text">
                            Use DCBITS to spend your Bitcoin, Ethereum and other digital currencies the same way you’d
                            use cash. We’ll get you the best global exchange rate on every conversion
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Countger Start */}
    <div className="counter">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="page-counter">
                        <div className="counter-item">
                            <h2 className="title"><span className="count-num">36</span>M</h2>
                            <p className="text">Registered users</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="page-counter">
                        <div className="counter-item">
                            <h2 className="title"><span className="count-num">178</span></h2>
                            <p className="text">Countries supported</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.3s">
                    <div className="page-counter">
                        <div className="counter-item">
                            <h2 className="title">$<span className="count-num">10</span>M</h2>
                            <p className="text">Withdrawn each month</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-duration="0.6s" data-wow-delay="0.3s">
                    <div className="page-counter four">
                        <div className="counter-item">
                            <h2 className="title"><span className="count-num">18</span>k</h2>
                            <p className="text">Active investors daily</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Feature one Start */}
    <div className="feature one" id="features">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6 d-none d-xl-block wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="pic">
                        <img src="assets/img/feature-1.png" alt="" className="fimg-1"/>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <h4 className="lasthead">Instant Crypto</h4>
                        <h2 className="title">Buy bitcoin</h2>
                        <p className="text">
                            Link your bank account and have your bitcoin in minutes.
                        </p>

                        <ul className="list">
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Global Exchange Rates</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Zero deposit fee</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text"> Instant Transaction</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Make payments with Bank Transfer</p>
                            </li>
                        </ul>
                        <a href="#" className="button button-1 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">Start Now !</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Feature Two Start */}
    <div className="feature two">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <h4 className="lasthead">Quick and easy way to</h4>
                        <h2 className="title">Pay your friends</h2>
                        <p className="text">
                            Paying your friends bitcoin using DCBITS is a quick and easy way to settle your debts.
                        </p>

                        <ul className="list">
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Global Exchange Rates</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Zero deposit fee</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text"> Instant Transaction</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Make payments with Bank Transfer</p>
                            </li>
                        </ul>
                        <a href="#" className="button button-1 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">Start Now !</a>
                    </div>
                </div>
                <div className="col-xl-5 d-none d-xl-block">
                    <div className="pic">
                        <img src="assets/img/feature-2.png" alt="" className="fimg-1"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Feature Three Start */}
    <div className="feature three">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-5 d-none d-xl-block wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="pic">
                        <img src="assets/img/feature-3.png" alt="" className="fimg-1"/>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <h4 className="lasthead">Send your money</h4>
                        <h2 className="title">Globally</h2>
                        <p className="text">
                            With Goland, you can send your money globally, for free, without having to ask anyone for
                            permission.
                        </p>

                        <ul className="list">
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Global Exchange Rates</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Zero deposit fee</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Instant Transaction</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Make payments with Bank Transfer</p>
                            </li>
                        </ul>
                        <a href="#" className="button button-1 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">Start Now !</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Feature Four Start */}
    <div className="feature four">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-xl-6">
                    <div className="section-head wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                        <h4 className="lasthead">Bank-level security</h4>
                        <h2 className="title">Secure</h2>
                        <p className="text">
                            Bank-level security for your digital money with added protection against fraud and theft.
                        </p>

                        <ul className="list">
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Global Exchange Rates</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Zero deposit fee</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text"> Instant Transaction</p>
                            </li>
                            <li className="list-item wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                                <span className="check"><img src="assets/img/check.png" alt=""/></span>
                                <p className="text">Make payments with Bank Transfer</p>
                            </li>
                        </ul>
                        <a href="#" className="button button-1 wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">Start Now !</a>
                    </div>
                </div>
                <div className="col-xl-6 d-none d-xl-block wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s">
                    <div className="pic">
                        <img src="assets/img/feature-4.png" alt="" className="fimg-1"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}
