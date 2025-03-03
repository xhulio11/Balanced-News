// export default NewsCard;
import React, { useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from "react-router-dom";

function NewsCard ({ id, title, excerpt, imageUrl, date, length=200, variant = "default", }){
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Decide aspect ratio class for the image container based on variant
  // Bootstrap 5+ offers .ratio, .ratio-16x9, .ratio-4x3, etc.
  const ratioClass = variant === "compact" ? "ratio ratio-18x10" : "ratio ratio-16x9";

  // // You could also apply other classes if needed for a “compact” look, such as `h-100`.
  const cardClass = variant === "compact" ? "h-100" : "";
  // Simulate data fetching with useEffect (e.g., from an API)
  useEffect(() => {
    // Simulate a network request delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (           
    <Card className={`mb-3 ${cardClass}`}>
      {/* Wrapping the image in a “ratio” div to enforce aspect ratio */}
      <div className={`${ratioClass}`}>
        <Link to={`/articles/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Card.Img
                src={imageUrl}
                alt={title}
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.3s",
                  objectFit: "cover",
                  width:"100%",
                  height:"100%"
                }}
                onLoad={() => setImageLoaded(true)}
              />
        </Link>
      </div>
      <Card.Body>
      <>
          {/* You could place the date in a small text or in the subtitle area. */}
          <small className="text-muted d-block mb-2">{date}</small>
          <Link to={`/articles/${encodeURIComponent(id)}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Card.Title className="mb-2" style={{textDecorationLine:"underline"}}>
              {title}
            </Card.Title>
          </Link>
          <Card.Text>
            {excerpt.slice(0,length)}
          </Card.Text>
        </>
      </Card.Body>
    </Card>
  );

};

export default NewsCard;
