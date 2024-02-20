import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { API_KEY } from "./API";

const MainHome = () => {
    const [blogs, setBlogs] = useState(null);

    const url = 'https://spaceflight-news2.p.rapidapi.com/v3/articles?_sort=title&_limit=10';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'spaceflight-news2.p.rapidapi.com'
        }
    };
    const newsArray = [];
    async function fetchResult() {
    
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const finalResult = JSON.parse(result);
            console.log(finalResult.articles);
            finalResult.forEach((item, index) => {
                if (index <10) {
                    newsArray.push({
                        title: item.title,
                        snippet: item.summary,
                        publisher: item.newsSite,
                        newsUrl: item.url,
                        picture: item.imageUrl,
                        id: index
                    });
                }
            });
            setBlogs(newsArray);
            console.log(newsArray);
            console.log(blogs);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchResult();
    }, []);


    



    return ( 
        <main className="MainHome">
            {blogs && <BlogList blogs={blogs}/>}
        </main>
     );
}
 
export default MainHome;