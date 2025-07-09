import Header from "./components/Header.js";
import Shop from "./components/Shop.js";
import CartContextProvider from "./store/shopping-cart-context.js";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop />
    </CartContextProvider>
  );
}

export default App;
