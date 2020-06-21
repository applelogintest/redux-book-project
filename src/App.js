import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from './components/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import News from './components/News'
import RecommendBook from './components/RecommendBook'
import './App.css';
import {Provider} from "react-redux";
import store from "./store/store";
import BookDetail from "./components/BookDetail";

import BookFind from "./components/BookFind";

function App() {
  return (
      <Provider store={store}>
          <Router>
            <Header/>
              <Switch>
                  <Route exact path={"/"} component={Home}/> {/* exact는 root에만 줘라 */}
                  <Route path={"/news"} component={News}/>
                  <Route path={"/recommend"} component={RecommendBook}/>
                  <Route path={"/bookDetail/:no"} component={BookDetail}/>
                  <Route path={"/bookFind/:fd"} component={Home}/>
              </Switch>
            <Footer/>
          </Router>
      </Provider>
  );
}

export default App;
