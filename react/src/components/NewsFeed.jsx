import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewsCard from "./NewsCard";
import Spinner from "react-bootstrap/Spinner";


const NewsFeed = () => {
  // Initial 6 articles
  const [articles, setArticles] = useState(null); 
  const [loading, setLoading] = useState(true);
  async function fetchMoreArticles(lastArticleId){
    const url = `/api/articles?prev_id=${lastArticleId._id}`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const moreArticles = await response.json();
      setArticles(articles => [...articles, ...moreArticles]);
      setLoading(false); 
  
    }catch (error) {
      console.error(error.message);
    }
  } 

  useEffect(()=>{
    async function fetchArticles(){
      const url = "/api/articles"
    
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const articles = await response.json();
        setArticles(articles); 
        setLoading(false); 
    
      }catch (error) {
        console.error(error.message);
      }
    }
    fetchArticles(); 
    
  }, []); 

  if(!loading){
  return (
    // <Container fluid className="py-4 mx-sm-1 mx-1"> 
      <InfiniteScroll
        dataLength={articles.length} // This is important field to render the next data
        next={()=>fetchMoreArticles(articles[articles.length - 1])}              // Function to load more items
        hasMore={true}            // Boolean to control if there's more to load
        loader={
          <div className="text-center my-3">
            <Spinner animation="border" role="status" variant="secondary">
              <span className="visually-hidden">...</span>
            </Spinner>
          </div>
        }
        style={{ overflow: "visible" }} 
      >
        <Row xs={1} md={2} lg={3} className="g-4 mx-sm-3">
          {articles.map((article) => (
          <Col key={article._id}>
              <NewsCard 
                id = {article._id}
                title={article.content.slice(0,20)}
                excerpt={article.content}
                length={200}
                imageUrl={article.image}
                date={"24-2-2024"}
              />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
  );
}
};

export default NewsFeed;