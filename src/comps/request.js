export const key = "f475978b891ab0d743852f451a6183e8";

const req = {
    trending : `/trending/all/week?api_key=${key}&adult=false`,
    
    discover: `discover/movie?api_key=${key}&language=en-US
    &sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    
    //movie genres
    action: `/discover/movie?api_key=${key}&with_genres=28&include_adult=false`,
    adventure: `/discover/movie?api_key=${key}&with_genres=12&include_adult=false`,
    comedy: `/discover/movie?api_key=${key}&with_genres=35&include_adult=false`,
    horror: `/discover/movie?api_key=${key}&with_genres=27&include_adult=false`,
    romance: `/discover/movie?api_key=${key}&with_genres=10749&include_adult=false`,
    scifi: `/discover/movie?api_key=${key}&with_genres=878&include_adult=false`,
    thriller: `/discover/movie?api_key=${key}&with_genres=53&include_adult=false`,
    mystery: `/discover/movie?api_key=${key}&with_genres=9648&include_adult=false`,
    drama: `/discover/movie?api_key=${key}&with_genres=18&include_adult=false`,
    fantasy: `/discover/movie?api_key=${key}&with_genres=14&include_adult=false`,
    animation: `/discover/movie?api_key=${key}&with_genres=16&include_adult=false`,
    //tv genres
    actiontv: `/discover/tv?api_key=${key}&with_genres=10759&include_adult=false`,
    comedytv: `/discover/tv?api_key=${key}&with_genres=35&include_adult=false`,
    mysterytv: `/discover/tv?api_key=${key}&with_genres=9648&include_adult=false`,
    dramatv: `/discover/tv?api_key=${key}&with_genres=18&include_adult=false`,
    kidstv: `/discover/tv?api_key=${key}&with_genres=10762&include_adult=false`,
    scifi_fantv: `/discover/tv?api_key=${key}&with_genres=10765&include_adult=false`,
}

export default req;