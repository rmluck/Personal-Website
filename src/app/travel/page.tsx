"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { Map as LeafletMap, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { countries, cities } from "@/data/travel";

export default function Travel() {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));
    const [worldData, setWorldData] = useState<any | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    function filterFrancePolygons(feature: any) {
        if (feature.properties.adm0_a3 !== "FRA") return feature;

        // Continental France bounding box (approx)
        const minLat = 41;
        const maxLat = 51;
        const minLng = -5;
        const maxLng = 10;

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

    useEffect(() => {
        fetch("/data/countries.geo.json")
            .then((response) => response.json())
            .then((data) => {
                const filteredFeatures = data.features.map(filterFrancePolygons);
                setWorldData({ ...data, features: filteredFeatures })
            });
    }, []);

    if (!worldData) {
        return <div>Loading map...</div>;
    }

    // const visitedCountries = worldData.features.filter((feature: any) =>
    //     countries.some((country) => country.geoId === feature.properties.adm0_a3)
    // );

    // visitedCountries.forEach((feature: any) => {
    //     const countryData = countries.find((country) => country.geoId === feature.properties.adm0_a3);
    //     feature.properties.years = countryData?.years;
    //     feature.properties.blog = countryData?.blog;
    //     feature.properties.photos = countryData?.photos;
    // });

    const visitedMap = new Map(countries.map(country => [country.geoId, country]));

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

    function onEachCountry(feature: any, layer: any) {
        const country = visitedMap.get(feature.properties.adm0_a3);

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

        if (country) {
            layer.bindPopup(`
                <div class="popup-content">
                    <strong class="place-title">${feature.properties.name}</strong><br/>
                    ${country.years.length > 0 ? "Visited in " + country.years.join(", ") + "<br/>" : ""}<br />
                    <a href="${country.blog || "#"}" target="_blank">Blog posts</a><br/>
                    <a href="${country.photos || "#"}" target="_blank">Photos</a>
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

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar items={[]} />

            <main className="flex-1">
                <section className="px-6 sm:px-12 pt-16 pb-8 m-24 mb-0">
                    <div className="mb-10 mt-10">
                        <h2 className="text-5xl text-center text-pro900 dark:text-pro200 font-heading font-bold whitespace-nowrap">
                            TRAVEL
                        </h2>
                    </div>

                    <div className="w-full h-[80vh] border-4 border-pro400 dark:border-pro800 rounded-sm relative z-0">
                        <MapContainer
                            center={[20, 0] as LatLngExpression} // initial view: [lat, lng]
                            zoom={2}
                            style={{ height: "100%", width: "100%" }}
                            ref={mapRef}
                        >
                            <TileLayer key={isDark ? "dark" : "light"} url={isDark ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"} attribution="&copy; OpenStreetMap contributors" />
                            <GeoJSON
                                data={worldData}
                                style={countryStyle}
                                onEachFeature={onEachCountry}
                            />

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
                                    <Popup>
                                        <strong>{city.name}</strong><br />
                                        Visited: {city.years.join(", ")}<br />
                                        <a href={city.blog || "#"} target="_blank">Blog posts</a><br />
                                        <a href={city.photos || "#"} target="_blank">Photos</a>
                                    </Popup>
                                    <Tooltip direction="top" offset={[0, -8]} opacity={0.9} permanent={false} className="place-tooltip">
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