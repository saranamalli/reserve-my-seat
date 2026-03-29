import { useLocationStore } from "../store/locationStore";
import api from "./axios"
import getUserLocationCoords from "./get-location-coords";

export const getPlace = async () => {
    const { place, updatePlace } = useLocationStore.getState();
    if (place) return place;
    try {
        const response = await api.get("https://ipapi.co/json/");
        const placeGot = { city: response.data?.city, region: response.data?.region };
        console.info("Place got from IP", placeGot);
        updatePlace(placeGot);
        return placeGot;
    } catch (error) {
        console.error("Error fetching City from IP address", error);
        console.info("Trying from location!!");
        getPlaceFromGps();
    }
}

async function getPlaceFromGps() {
    const locationDetails = await getUserLocationCoords();
    const { updatePlace } = useLocationStore.getState();
    if (locationDetails) {
        const response = await api.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationDetails.latitude}&lon=${locationDetails.longitude}`);
            
        const city = response.data.address.state_district || 
                            response.data.address.city_district || 
                            response.data.address.county || 
            "Unknown Location";
        const state = response.data.address.state;
                updatePlace({city, region: state});
        console.info("City from Coords: ", city, state);
    }
}