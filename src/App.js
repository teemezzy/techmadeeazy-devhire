import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import { SideLayout } from "./components";
import { Home, Favorites } from "./pages";

import {
  fetchFreelancers,
  toggleFreelancer,
} from "./redux/slices/freelancerSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFreelancers());
  }, []);

  const toggleFavoriteFreelancer = (id) => {
    dispatch(toggleFreelancer(id));
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<SideLayout />}>
          <Route
            index
            element={
              <Home toggleFavoriteFreelancer={toggleFavoriteFreelancer} />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites toggleFavoriteFreelancer={toggleFavoriteFreelancer} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
