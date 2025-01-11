import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { UserRepos } from "../Pages/UserRepos";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:username" element={<UserRepos />} />
    </Routes>
  );
};
