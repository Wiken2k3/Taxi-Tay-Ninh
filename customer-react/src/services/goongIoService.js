import goongApi from "../api/goong";

const fetchPlaceSuggestions = async (query) => {
    try {
        const response = await goongApi.get('/Place/AutoComplete', {
            params: {
                input: query,
                api_key: process.env.REACT_APP_API_KEY_GOONGIO,
            },
        });
        return response.data.predictions || [];
    } catch (error) {
        return [];
    }
}

const fetchPlaceDetails = async (placeId) => {
    try {
        const response = await goongApi.get('/Place/Detail', {
            params: {
                place_id: placeId,
                api_key: process.env.REACT_APP_API_KEY_GOONGIO,
            },
        });
        const result = response.data.result || {};
        const location = result.geometry ? result.geometry.location : {};
        return {
            lat: location.lat || null,
            lng: location.lng || null,
        };
    } catch (error) {
        console.error('Error fetching place details', error);
        return {
            lat: null,
            lng: null,
        };
    }
}

const fetchDistanceMatrix = async (origins, destinations) => {
    try {
        const response = await goongApi.get('/DistanceMatrix', {
            params: {
                origins: origins.join('|'),
                destinations: destinations.join('|'),
                vehicle: 'car',
                api_key: process.env.REACT_APP_API_KEY_GOONGIO, // Thay thế bằng API Key của bạn
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching distance matrix', error);
        return null;
    }
}

const fetchDirections = async (origin, destination) => {
    try {
        const response = await goongApi.get('/Direction', {
            params: {
                origin: origin,
                destination: destination,
                vehicle: 'car',
                api_key: process.env.REACT_APP_API_KEY_GOONGIO,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching directions', error);
        return null;
    }
}


export default {
    fetchPlaceSuggestions,
    fetchPlaceDetails,
    fetchDistanceMatrix,
    fetchDirections
   
};