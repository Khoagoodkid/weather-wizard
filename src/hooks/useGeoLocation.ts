"use client"
import React, { useState, useEffect } from "react";

type LocationProps = {
    loaded:boolean,
    coordinates?: {
        lat:string,
        lng:string
    },
    error?: {
        code?: string,
        message:string
    }
}

const useGeoLocation = () => {
    const [location, setLocation] = useState<LocationProps>({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location:any) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error:any) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;