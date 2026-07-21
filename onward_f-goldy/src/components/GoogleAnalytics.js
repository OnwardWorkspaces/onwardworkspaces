// src/components/GoogleAnalytics.js
import { useEffect } from "react";

export default function GoogleAnalytics() {
    useEffect(() => {

        const script = document.createElement("script");
        script.src =
            "https://www.googletagmanager.com/gtag/js?id=G-DYNKR2FGGM";
        script.async = true;

        script.onload = () => {
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                window.dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag("js", new Date());
            gtag("config", "G-DYNKR2FGGM");
            gtag("config", "AW-11144813402");
        };

        document.head.appendChild(script);

    }, []);

    return null;
}