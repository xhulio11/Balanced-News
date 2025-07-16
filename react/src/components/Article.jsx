// import React,{ useState, useEffect } from 'react';
// import {useParams} from "react-router-dom"; 
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Card from 'react-bootstrap/Card'
// import StaStandardImageList from './Suggest';
// import "../style/Article.css" 
// import LabelChips from './Sources'
// import PublicIcon from '@mui/icons-material/Public';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm      from 'remark-gfm';     // tables, strikethrough, autolinks …
// import rehypeRaw      from 'rehype-raw';     // allow raw HTML inside MD

// const sources = [
//   { label: 'CNN',      icon: <PublicIcon />,   url: 'https://www.cnn.com' },
//   { label: 'BBC News', icon: <PublicIcon />,  url: 'https://www.bbc.com' },
//   { label: 'Reuters',  icon: <PublicIcon />,   url: 'https://www.reuters.com' },
//   // etc...
// ];

// function Article(){

//   // togle buttons 
//   const [checked, setChecked] = useState(false);
//   const [radioValue, setRadioValue] = useState('1');

//   const radios = [
//     { name: 'Llama', value: '1' },
//     { name: 'Mistral', value: '2' }
//   ];

//   const {articleId} = useParams();
//   const [recArticle, setRecArticle] = useState(true);
//   const [article, setArticle] = useState(null); 
//   var variant = ""; 
//   const cardClass = variant === "compact" ? "h-100" : "";
  
//   useEffect(()=>{
//     async function fetchArticle(){
//       const url = `/api/articles/${articleId}`
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Response status: ${response.status}`);
//         }
//         const Article = await response.json();
//         // console.log(Article)
//         setArticle(Article) 
//         setRecArticle(false); 

//       }catch (error) {
//         console.error(error.message);
//       }
//     }
//     fetchArticle(); 
//   }, [articleId])

//   if(!recArticle){
//   return(
//         <Row className="g-4 article-font" >
//           {/* Column for Article */}
//           <Col xs={12} lg={8} >
//             <Card className={`mb-3 ${cardClass}`}>
//             <div className={cardClass}>
//             {/* Wrapping the image in a “ratio” div to enforce aspect ratio */}
//               <Card.Img variant="top" className="img-fluid" src={article.image}
//                   alt={"Hello"}
//                   style={{
//                     width: "100%",
//                     transition: "opacity 0.3s",
//                     objectFit: "cover"
//                   }}/>
//               <Card.Body>
//                 <div className="d-flex justify-content-end gap-2 mb-2">
//                 <ButtonGroup>
//                   {radios.map((radio, idx) => (
//                     <ToggleButton
//                       key={idx}
//                       id={`radio-${idx}`}
//                       type="radio"
//                       variant={idx % 2 ? 'outline-warning' : 'outline-primary'}
//                       name="radio"
//                       value={radio.value}
//                       checked={radioValue === radio.value}
//                       onChange={(e) => setRadioValue(e.currentTarget.value)}
//                     >
//                       {radio.name}
//                     </ToggleButton>
//                   ))}
//                 </ButtonGroup>
//               </div>
//                 <Card.Title>{article.title}</Card.Title>
//                 {/* <Card.Text><span style={{ whiteSpace: 'pre-line' }}>{article.model.llama.content}</span>;</Card.Text> */}
//                 <Card.Text as="div">
//               <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeRaw]}
//                 components={{
//                   p:   ({ node, ...props }) => <p className="mb-3" {...props} />,
//                   h2:  ({ node, ...props }) => <h2 className="h5 fw-bold" {...props} />,
//                   img: ({ node, ...props }) => <img className="img-fluid rounded" {...props} />,
//                 }}
//               >
//                 {activeModelText}
//               </ReactMarkdown>
//             </Card.Text>
//                 <LabelChips sources={sources} />
//               </Card.Body>
//             </div>
//             </Card>
//           </Col>
//           {/* Column for Navigation Bar */}
//           <Col xs={12} lg={4}>
//             <StaStandardImageList/>
//           </Col>
//         </Row>
//     )
//   }
// }

// export default Article; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import StaStandardImageList from './Suggest';
import '../style/Article.css';
import LabelChips from './Sources';
import PublicIcon from '@mui/icons-material/Public';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';     // GitHub-flavoured Markdown (tables, task-lists…)
import rehypeRaw from 'rehype-raw';     // allow raw HTML inside Markdown

const sources = [
  { label: 'CNN',      icon: <PublicIcon />, url: 'https://www.cnn.com' },
  { label: 'BBC News', icon: <PublicIcon />, url: 'https://www.bbc.com' },
  { label: 'Reuters',  icon: <PublicIcon />, url: 'https://www.reuters.com' },
];

function Article() {
  /* ───────────── state & routing ───────────── */
  const { articleId } = useParams();

  const [radioValue, setRadioValue] = useState('1');   // 1 = Llama, 2 = Mistral
  const radios = [
    { name: 'Llama',   value: '1' },
    { name: 'Mistral', value: '2' },
  ];

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  /* ───────────── fetch article once ───────────── */
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${articleId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [articleId]);

  if (loading || !article) return null;            // or a spinner / placeholder

  const activeTitleText = 
      radioValue === '1'
      ? article.model.llama.title
      : article.model.mistral.title;

  const activeModelText =
    radioValue === '1'
      ? article.model.llama.content
      : article.model.mistral.content;

  /* ───────────── presentation ───────────── */
  return (
    <Row className="g-4 article-font">
      {/* ── Article column ── */}
      <Col xs={12} lg={8}>
        <Card className="mb-3">
          <Card.Img
            variant="top"
            className="img-fluid"
            src={article.image}
            alt={article.title}
            style={{ width: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
          />

          <Card.Body>
            {/* model-switch buttons */}
            <div className="d-flex justify-content-end gap-2 mb-2">
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-warning' : 'outline-primary'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>

            <Card.Title as="h2" className="display-5 fw-bold">
              {activeTitleText}
            </Card.Title>

            {/* rich Markdown rendering */}
            <Card.Text as="div">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  p:   ({ node, ...props }) => <p className="mb-3 fs-4" {...props} />,
                  h2:  ({ node, ...props }) => <h2 className="h5 fw-bold" {...props} />,
                  img: ({ node, ...props }) => <img className="img-fluid rounded" {...props} />,
                }}
              >
                {activeModelText}
              </ReactMarkdown>
            </Card.Text>

            <LabelChips sources={sources} />
          </Card.Body>
        </Card>
      </Col>

      {/* ── Side column (suggested images, etc.) ── */}
      <Col xs={12} lg={4}>
        <StaStandardImageList />
      </Col>
    </Row>
  );
}

export default Article;
