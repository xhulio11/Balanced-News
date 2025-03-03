import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navbar.jsx";
import Article from "./Article.jsx"; 
import About from "./About.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsFeed from "./NewsFeed.jsx";
import Layout from "./Layout.jsx";
import '../style/App.css';
import ScrollToTop from './ScrollToTop';


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home"  element ={<NewsFeed/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/articles/:articleId" element={<Article />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
