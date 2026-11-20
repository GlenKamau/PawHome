
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PetListPage from "./pages/PetListPage";
import PetCreatePage from "./pages/PetCreatePage";
import PetDetailPage from "./pages/PetDetailPage";
import PetEditPage from "./pages/PetEditPage";
import AdoptionPage from "./pages/AdoptionPage";

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route index element={<HomePage />} />

        {/* Pet listing */}
        <Route path="pets" element={<PetListPage />} />

        {/* Add a new pet */}
        <Route path="pets/new" element={<PetCreatePage />} />

        {/* Individual pet details */}
        <Route path="pets/:id" element={<PetDetailPage />} />

        {/* Edit pet */}
        <Route path="pets/:id/edit" element={<PetEditPage />} />

        {/* Adoption */}
        <Route path="adopt" element={<AdoptionPage />} />

        {/* Adopt a specific pet */}
        <Route path="pets/:id/adopt" element={<AdoptionPage />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>

    </Routes>
  );
}
