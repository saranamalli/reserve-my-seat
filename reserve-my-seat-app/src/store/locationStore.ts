import { create } from "zustand";

interface LocationDetails {
    latitude: number;
    longitude: number;
}

export interface PlaceDetails {
    city: string;
    region: string;
}

interface LocationState {
    location: LocationDetails | null;
    place: PlaceDetails | null;
    updateLocation: (data: LocationDetails) => void;
    updatePlace: (data: PlaceDetails) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    place: null,
    
    updateLocation(data) {
        set({ location: data });
    },

    updatePlace(data) {
        set({ place: data });
    },
}));