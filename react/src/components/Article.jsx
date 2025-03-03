import React,{ useState, useEffect } from 'react';
import {useParams} from "react-router-dom"; 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import StaStandardImageList from './Suggest';
import "../style/Article.css" 


function Article(){

  const {articleId} = useParams();
  const [recArticle, setRecArticle] = useState(true);
  const [article, setArticle] = useState(null); 
  var variant = ""; 
  const cardClass = variant === "compact" ? "h-100" : "";
  
  useEffect(()=>{
    async function fetchArticle(){
      const url = `/api/articles/${articleId}`
      console.log(url)
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const Article = await response.json();
        console.log(Article)
        // console.log(Article)
        setArticle(Article) 
        setRecArticle(false); 

      }catch (error) {
        console.error(error.message);
      }
    }
    fetchArticle(); 
  }, [articleId])

  if(!recArticle){
  return(
        <Row className="g-4 article-font" >
          {/* Column for Article */}
          <Col xs={12} lg={8} >
            <Card className={`mb-3 ${cardClass}`}>
            <div className={cardClass}>
            {/* Wrapping the image in a “ratio” div to enforce aspect ratio */}
              <Card.Img variant="top" className="img-fluid" src={article.image}
                  alt={"Hello"}
                  style={{
                    width: "100%",
                    transition: "opacity 0.3s",
                    objectFit: "cover"
                  }}/>
              <Card.Body>
                <Card.Title>{article.content.slice(0,20)}</Card.Title>
                <Card.Text><span style={{ whiteSpace: 'pre-line' }}>{article.content}</span>;</Card.Text>
              </Card.Body>
            </div>
            </Card>
          </Col>
          {/* Column for Navigation Bar */}
          <Col xs={12} lg={4}>
            <StaStandardImageList/>
          </Col>
        </Row>
    )
  }
}

export default Article; 
