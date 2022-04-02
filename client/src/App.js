import "./App.css";
import Footer from "./component/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./component/Nav";
import AuthContextProvider from "./context/authContext";
import ProductContextProvider from "./context/productContext";
import CartContextProvider from "./context/cartContext";
import Order from "./pages/Order";

function App() {
  return (
    <>
      <ProductContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <Router>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Product} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/cart" component={Cart} />
              </Switch>
              <Route exact path="/product/:id" component={ProductDetail} />
            </Router>
            <Footer />
          </CartContextProvider>
        </AuthContextProvider>
      </ProductContextProvider>
    </>
  );
}

export default App;
