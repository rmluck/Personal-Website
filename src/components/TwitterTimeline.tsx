"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: () => void;
            };
        };
    }
}

export default function TwitterTimeline() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);

        script.onload = () => {
            if (window.twttr) {
                window.twttr.widgets.load();
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full">
            <a
                className="twitter-timeline"
                href="https://twitter.com/rohandm99?ref_src=twsrc%Etfw"
                data-height="600"
                data-theme="auto"
                data-chrome="noheader nofooter noborders transparent"
            >
                Tweets by rohandm99
            </a>
        </div>
    );
}