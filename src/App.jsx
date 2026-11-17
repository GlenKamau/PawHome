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
        <Route path="pets" element={<PetListPage />} />
        <Route path="pets/new" element={<PetCreatePage />} />
        <Route path="pets/:id" element={<PetDetailPage />} />
        <Route path="pets/:id/edit" element={<PetEditPage />} />
        <Route path="adopt" element={<AdoptionPage />} />
        <Route path="pets/:id/adopt" element={<AdoptionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
