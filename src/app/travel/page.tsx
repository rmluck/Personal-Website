"use client";

import "leaflet/dist/leaflet.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { Map as LeafletMap, LatLngExpression } from "leaflet";
import { countries, cities } from "@/data/travel";

export default function Travel() {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
    const [worldData, setWorldData] = useState<any | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const visitedMap = new Map(countries.map(country => [country.geoId, country]));

    // Function to filter out overseas territories of France
    function filterFrancePolygons(feature: any) {
        if (feature.properties.adm0_a3 !== "FRA") return feature;

        // Continental France bounding box (approx)
        const minLat = 41;
        const maxLat = 51;
        const minLng = -5;
        const maxLng = 10;

        // Filter out any polygons that are not within the bounding box
        const filteredCoordinates = feature.geometry.coordinates.filter((polygon: any) => {
            return polygon.some((ring: any) =>
                ring.some(([lng, lat]: [number, number]) =>
                    lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng
                )
            );
        });

        return {
            ...feature,
            geometry: {
                ...feature.geometry,
                coordinates: filteredCoordinates,
            },
        };
    }

    // Function to style countries based on visit status
    function countryStyle(feature: any) {
        const country = visitedMap.get(feature.properties.adm0_a3);
        return {
            fillColor: country ? `var(--color-accent)` : `var(--color-pro200)`,
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: country ? 0.5 : 0.2,
        }
    }

    // Function to handle events for each country
    function onEachCountry(feature: any, layer: any) {
        const country = visitedMap.get(feature.properties.adm0_a3);

        // Add event listeners
        layer.on({
            mouseover: (e: any) => {
                e.target.setStyle({ weight: 3, fillOpacity: 0.7 });
            },
            mouseout: (e: any) => {
                e.target.setStyle(countryStyle(feature));
            },
            click: (e: any) => {
                mapRef.current?.flyTo(e.latlng, 5, { animate: true });
            },
            popupclose: (e: any) => {
                mapRef.current?.flyTo([20, 0], 2, { animate: true });
            }
        });

        // Bind popup with country info
        if (country) {
            layer.bindPopup(`
                <div class="popup-content">
                    <strong class="place-title">${feature.properties.name}</strong><br/>
                    ${country.years.length > 0 ? "Visited in " + country.years.join(", ") + "<br/>" : ""}<br />
                </div>
            `, {
                className: "place-popup",
                closeButton: true,
                minWidth: 180,
            });
        } else {
            layer.bindPopup(`
                <div class="popup-content">
                    <strong>${feature.properties.name}</strong><br/>Not visited yet
                </div>
            `, {
                className: "place-popup",
                closeButton: true,
                minWidth: 180,
            });
        }
    }

    // Listen for changes in the dark mode class on the document element
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    // Fetch world GeoJSON data
    useEffect(() => {
        fetch("/data/countries.geo.json")
            .then((response) => response.json())
            .then((data) => {
                const filteredFeatures = data.features.map(filterFrancePolygons);
                setWorldData({ ...data, features: filteredFeatures })
            });
    }, []);

    // Show loading state while fetching data
    if (!worldData) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={[]} />

            <main className="flex-1">
                <section className="px-6 sm:px-12 py-8 mx-4 sm:mx-18 lg:mx-24 mt-0 mb-10">
                    {/* Header */}
                    <div className="mb-6 mt-10">
                        <h2
                            className={`
                                text-4xl sm:text-5xl text-pro900 dark:text-pro200
                                font-heading font-bold
                                text-center whitespace-nowrap
                            `}
                            style={{ textShadow: "-3px 3px 0 var(--accent)" }}
                        >
                            TRAVEL
                        </h2>
                    </div>

                    {/* Map */}
                    <div 
                        className={`
                            relative z-0
                            w-full h-[75vh] rounded-sm
                            border-4 border-pro400 dark:border-pro800
                        `}
                    >
                        <MapContainer
                            center={[20, 0] as LatLngExpression} // initial view: [lat, lng]
                            zoom={2}
                            style={{ height: "100%", width: "100%" }}
                            ref={mapRef}
                        >
                            {/* Base Tile Layer */}
                            <TileLayer
                                key={isDark ? "dark" : "light"}
                                url={isDark ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"}
                                attribution="&copy; OpenStreetMap contributors"
                            />

                            {/* Countries Layer */}
                            <GeoJSON
                                data={worldData}
                                style={countryStyle}
                                onEachFeature={onEachCountry}
                            />

                            {/* Cities Layer */}
                            {cities.map((city) => (
                                <CircleMarker
                                    key={city.name}
                                    center={[city.lat, city.lng]}
                                    radius={6}
                                    fillColor="var(--color-accent)"
                                    color="var(--color-accent)"
                                    weight={1}
                                    opacity={1}
                                    fillOpacity={0.9}
                                >
                                    {/* Popup and Tooltip for each city */}
                                    <Popup>
                                        <strong>{city.name}</strong><br />
                                        Visited: {city.years.join(", ")}<br />
                                        {/* <a href={city.blog || "#"} target="_blank">Blog posts</a><br />
                                        <a href={city.photos || "#"} target="_blank">Photos</a> */}
                                    </Popup>
                                    <Tooltip
                                        direction="top"
                                        offset={[0, -8]}
                                        opacity={0.9}
                                        permanent={false}
                                        className="place-tooltip"
                                    >
                                        {city.name}
                                    </Tooltip>
                                </CircleMarker>
                            ))}
                        </MapContainer>
                    </div>
                </section>

                <section className="mt-0">
                    <Footer />
                </section>
            </main>
        </div>
    );
}