import {useEffect, useState} from "react";
import NewsCard  from "./NewsCard";
import {Row, Col} from "react-bootstrap"
import {useParams} from "react-router-dom"; 
// A function that simulates fetching more articles from an API


export default function StandardImageList() {
  const {articleId} = useParams(); 
  const [articles, setArticles] = useState(null); 
  const [loading, setLoading] = useState(false); 
  
  useEffect(()=>{
      async function fetchArticles(){
        const url = "/api/articles?batch_size=1"
      
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          var articles = await response.json();
          console.log("article:" + articles[0]._id)
          console.log("url:" + articleId)
          articles = articles.filter((article) => article._id !== articleId); 
          console.log(articles)
          setArticles(articles); 
          setLoading(true); 
          
        }catch (error) {
          console.error(error.message);
        }
      }
      fetchArticles(); 
      
    }, []);
  if(loading){
    return (
      <Col>
        {articles.map((article) => (
          <Row className="g-0" key={article._id}>
            <NewsCard
              id={article._id}
              title={article.content.slice(0,20)}
              excerpt={article.content}
              length={200}
              imageUrl={article.image}
              date={"24-2-2024"}
            />
          </Row>
        ))}
      </Col>
    ); 
  }
}


