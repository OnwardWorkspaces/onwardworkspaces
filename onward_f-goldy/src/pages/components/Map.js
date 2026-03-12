import React from 'react';

const MapComponent = ({ lat, long }) => {
    const mapUrl = `https://www.google.com/maps/embed/v1/view?center=${lat},${long}&zoom=15`;

    return (
        <div>
            <iframe
                // src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.12741408157993!2d${long}!3d${lat}`}
                width="100%"
                height="600"
                style={{ border: 'none' }}
                allowfullscreen=""
                loading="lazy"
                src={mapUrl}
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            {/* <iframe
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
            ></iframe> */}
        </div>
    );
};

export default MapComponent;