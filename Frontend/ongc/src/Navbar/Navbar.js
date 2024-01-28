import React from 'react'
// import { useNavigate } from 'react-router-dom';

function Navbar() {
    // const navigate = useNavigate();
    return (
        <div>
            <div class="bg-light">
                <div class="container-fluid">
                    <div class='d-flex justify-content-between align-items-center'>
                        <div class="p-2"><a class="navbar-brand" href="#"> <img class="imgs imgsL" src="./Images/ONGC_3.jpg" alt="ONGC Logo" /></a></div>
                        <div class="p-2 text-end">
                            <div class="d-inline-block mx-3 compact align-middle">
                                <span class="fs-3 fontStyle1">Call Us Today</span><br />
                                <span class="fs-5 fontStyle2">1-800-324-1234</span>
                            </div>
                            <div class="d-inline-block mx-3 d-none d-lg-inline-block d-md-inline-block d-sm-inline-block">
                                <button class="btn btn-outline-danger pt-2 px-4 compact">
                                    <span class="fontStyle1 fs-3"><i class="fas fa-pen-alt"></i> FREE</span><br />
                                    ESTIMATE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-danger fontStyle2">
                <button type="button" data-bs-toggle="collapse" data-bs-target="#bottomNavbar" class="btn btn-danger w-100 d-lg-none d-md-none d-sm-block d-xs-block rounded-0 p-2"><i class="fas fa-bars me-2"></i> Menu</button>
                <div class="collapse navbar-collapse px-2" id="bottomNavbar">
                    <div class="container-fluid">
                        <div class="d-flex justify-content-between align-items-center" id="removeFlex">
                            <div class="flex-grow-1">
                                <a href="#" class="active d-inline-block customNav">Home</a>
                                <a href="#" class="d-inline-block customNav">Services</a>
                                <a href="#" class="d-inline-block customNav">Pricing</a>
                                <a href="#" class="d-inline-block customNav">About Us</a>
                                <a href="#" class="d-inline-block customNav">Partners</a>
                                <a href="#" class="d-inline-block customNav">Blog</a>
                                <a href="#" class="d-inline-block customNav">Contact Us</a>
                            </div>
                            <div class="m-3">
                                <i class="fas fa-search text-white fs-6"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row align-items-center">
                    <div class="col">
                        <div class="p-4">
                            <h1 class="fontStyle1 text-uppercase display-2">custom collapsible <span class="text-danger">Navbar bottom</span></h1>
                            <p class="fs-5 text-secondary my-3">
                                A custom style navbar bottom collapsible at <code>md</code> breakpoint. Overridden collapse class.
                            </p>
                            <div class="mt-4 mb-3"><button class="btn btn-outline-danger w-50 btn-lg">Get Started</button></div>
                            <div class="mt-3"><small class="text-muted">Images taken from unspash.com</small></div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-4 text-center">
                            <img class="imgs shadow-lg" src="./Images/ONGC_1.png" alt="ONGC Logo" height="480"/> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 text-center" style="background:#000">
                <h2 class="fontStyle1 my-5 text-white">Ready to monetize your website?</h2>
                <div class="my-4">
                    <a href="https://www.ezoic.com/?tap_a=66665-b8dba7&tap_s=3092903-a576ca" target="_BLANK" rel="nofollow"><img src="https://static.tapfiliate.com/5e6adcf5b838c.jpg?a=66665-b8dba7&s=3092903-a576ca" border="0"/></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
