import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryHeader from "./components/categories/CategoryHeader";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import AddressesPage from "./pages/AddressesPage";
import FavouritesPage from "./pages/FavouritesPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import PersonalInformationPage from "./pages/PersonalInformationPage";
import WalletPage from "./pages/WalletPage";

const CategoriesPage = React.lazy(() => import("./pages/CategoriesPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const BasketPage = React.lazy(() => import("./pages/BasketPage"));
const ProductsList = React.lazy(() => import("./pages/ProductsList"));

function App() {

  return (
    <div className="App">
      <CategoryHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:categoryslug" element={<CategoriesPage />} />
          <Route
            path="/:categoryslug/:subcategoryslug"
            element={<ProductsList />}
          />
          <Route
            path="/:categoryslug/:subcategoryslug/:productslug"
            element={<ProductDetailPage />}
          />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/myOrders" element={<MyOrdersPage />} />
          <Route path="/personalInformation" element={<PersonalInformationPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
