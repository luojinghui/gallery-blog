/**
 * Description
 * @authors Luo-jinghui (luojinghui424@gmail.com)
 * @date  2019-06-17 17:55:17
 */

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = lazy(() => import('../app/index'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="container">
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    </Suspense>  
  );
}

function About() {
  return <h2 className="about">About</h2>;
}

function Header() {
  return (
    <ul className="header">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}

export default App;