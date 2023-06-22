import React, { FC } from "react";
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { CreateMovie, Home, ManageMovies, ViewMovie } from "../../pages";
import PageLayout from "../layout";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies">
          <Route index element={<ManageMovies />} />
          <Route path="view/:id" element={<ViewMovie />} />
          <Route path="create" element={<CreateMovie />} />
        </Route>

        <Route
          path="*"
          element={
            <div>
              <h1>Sorry, page is not found.</h1>
              <Link to="/">Go to the home page</Link>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
