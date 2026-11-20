import { useState } from "react";
import PetDetails from "../components/PetDetails/PetDetailPage";
import Favourites from "../components/PetDetails/Favourite";
import { getFavoriteIds } from "../components/PetDetails/Favourites";

export default function PetDetailPage() {
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds);

  return (
    <>
      <PetDetails favoriteIds={favoriteIds} onFavoriteIdsChange={setFavoriteIds} />
      <Favourites favoriteIds={favoriteIds} onFavoriteIdsChange={setFavoriteIds} />
    </>
  );
}
