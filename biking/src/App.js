import React from "react";
import { BrowserRouter,  Route } from "react-router-dom";
import Home from "./routes/Home";
import Graph from "./routes/Graph";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import "./App.css";

import test_page from "./routes/test_page";

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/Graph" component={Graph} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/test-page" component={test_page} />
    </BrowserRouter>
  );
}

export default App;