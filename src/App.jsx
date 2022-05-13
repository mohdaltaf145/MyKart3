import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";//nice

//Redirect change to Navigate in version 6 of react-router-dom

//using exact because whenever we paste localhost:3000/products is
//doesnot reach to products page intstead it recognizes / first and go to home with as homepage path is /

const App = () => {
  //if user is logged in we should see the login or register page to prevent this
  const user = useSelector((state) => state.user.currentUser); //means user is logged in
  // const user = null;
  return (
    <Router>
      {/* switch component looks through all of its child routes and it displays the first one whose path matches the current URL */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* for using localhost:3000/products/women or any other category*/}
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {/* <Route path="/logout">
          <Logout />
        </Route> */}
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
