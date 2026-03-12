import React from 'react'

export default function ListingPage() {
    return (
        <>
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='listing' />
                <div className='inner-banner-content'>
                    <h1>Listing page</h1>
                    {/* <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Listing Page</li>
                        </ol>
                    </nav> */}
                </div>
            </section>
            <section className='onward-workspaces-offerings top bottom padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h2 className='heading text-center workspaces'>Coworking Space in Ahmedabad</h2>
                        <p className='paragraph'>Welcome to Pune, where business meets innovation! Discover WeWork's inspiring coworking spaces in Pune, providing collaborative environments for brainstorming and networking. With private offices, dedicated desks, and essential amenities like high-speed internet, printing facilities, and more, WeWork Pune offers the perfect coworking space to grow your business. Book a Day Pass today or find your ideal long-term coworking solution and tap into Pune's entrepreneurial spirit.</p>
                    </div>

                </div>
            </section>
        </>
    )
}
