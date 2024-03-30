export const BASE_URL = "https://pixabay.com/api/";
const API_KEY ="43131178-8f47b4cc11bf7557a74691bd4";

export const options = {
    params: {
        key: API_KEY,
        q: "",
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
    },
};