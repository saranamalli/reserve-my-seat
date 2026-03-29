import { useLocationStore } from "../store/locationStore";

async function getUserLocationCoords() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by the browser");
        return;
    }

    // Hooks can't be called outside FCs / other hooks. Use getState for non-component files.
    const { location, updateLocation } = useLocationStore.getState();
    
    if (location) return location;

    try {
        // Wrap navigator.geolocation.getCurrentPosition(successCB, failureCB) in a Promise to handle it synchronously.
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve, reject
            );
        });
    
        const { latitude, longitude } = position.coords;
        updateLocation(({ latitude, longitude }));
        console.info("longitude", longitude, "latitude", latitude);
        
        return { latitude, longitude };
    } catch (error: unknown) {
        // Handle Denial or Network error
        if (error && typeof error === "object" && "code" in error && (error as { code: number }).code === 1) {
            console.error("User denied location access.");
        } else if (error instanceof Error) {
            console.error("Location Error:", error.message);
        } else {
            console.error("Location Error:", error);
        }
    }
}

export default getUserLocationCoords;