import React, { useLayoutEffect, useRef, useState } from 'react';

const BlogList = ({blogs}) => {
    const [rowSpans, setRowSpans] = useState([]);
    const itemsRef = useRef([]);

    useLayoutEffect(() => {
        const calculateRowSpans = () => {
          const newRowSpans = itemsRef.current.map(item => {
            const height = item.clientHeight;
            console.log(Math.ceil(height / 100), height, item);
            return Math.ceil(height / 100); // Adjust this factor based on your design
          });
          setRowSpans(newRowSpans);
        };
    
        calculateRowSpans();
    
        const handleResize = () => {
          calculateRowSpans();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [blogs]); // Run effect whenever yourItems changes






    return ( 
        <div className="appBlogs">
            {blogs.map((blog, index) => (
                <article 
                className="blogPreview" 
                key={index}
                ref={el => (itemsRef.current[index] = el)}
                style={{ gridRow: `span ${rowSpans[index] || 1}` }}
                >
                    <a href={blog.newsUrl} target="_blank"><h2>{blog.title}</h2></a>
                     <div className="previewContent">
                        <div className="imgContainer">
                            <img src={blog.picture} alt={blog.title} />
                        </div>
                        <div className="containDescription">
                            <p>Publisher: <span>{blog.publisher}</span></p>
                            <p className="shortDescription">{blog.snippet} <a href={blog.newsUrl} className="readMore">Read More</a></p>
                        </div>
                     </div>
                </article>
            ))}
        </div>
     );
}
 
export default BlogList;