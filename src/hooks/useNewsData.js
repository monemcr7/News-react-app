import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        // Fetch articles from News API with category and search parameters
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=71f375db39e84154a171e7b16de6aaa5`;
        const categoryParam = category ? `&category=${category}` : "";
        const searchParam = searchTerm ? `&q=${searchTerm}` : "";
        const url = apiUrl + categoryParam + searchParam;
        const response = await fetch(url);
        const data = await response.json(); 

        // Fetch articles from GNews API with category and search parameters
        const apiUrl2 = `https://gnews.io/api/v4/top-headlines?token=2116c40d6a027b21e99875b1673dcc06`;
        const categoryParam2 = category ? `&topic=${category}` : "";
        const searchParam2 = searchTerm ? `&q=${searchTerm}` : "";
        const url2 = apiUrl2 + categoryParam2 + searchParam2;
        const response2 = await fetch(url2);
        const data2 = await response2.json();

        // Fetch articles from nytimes API
        const apiUrl3 = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=shRxwUZe1hqjLeLGHdawGdBqpRPSzYDo`;
        const response3 = await fetch(apiUrl3);
        const data3 = await response3.json();


        // Modify image key name for News API articles to match NewsAPI
        const modifiedNewsApiArticles = data.articles.map(article => ({
          ...article,
          image: article.urlToImage
        }));

        // Modify image key name for nytimes API articles to match NewsAPI
        const modifiednytimesApiArticles = data3.results.map(article => ({
          ...article,
          description: article.abstract,
          image: article.multimedia[0].url
        }));
        
        // Combine articles from 3 sources
        const combinedArticles = [...modifiedNewsApiArticles, ...data2.articles , ...modifiednytimesApiArticles];
        // console.log(combinedArticles) 
        setNewsData(combinedArticles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;
