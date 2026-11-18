

import PetCard from "./PetCard";

function PetList() {

  const pets = [
    ["Bosco", "Friendly and playful.", "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"],
    ["Max", "Energetic and intelligent.", "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600"],
    ["Bella", "Gentle and affectionate.", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"],
    ["Charlie", "Cheerful and loving.", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600"],
    ["Lucy", "Sweet and playful.", "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600"],
    ["Rocky", "Adventurous and loyal.", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600"],
    ["Daisy", "Playful and gentle.", "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600"],
    ["Buddy", "Sociable and fun-loving.", "https://images.unsplash.com/photo-1555169062-013468b47731?w=600"],
    ["Milo", "Loving and curious.", "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600"]
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        Pets Available for Adoption
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {pets.map((pet, index) => (
          <PetCard
            key={index}
            name={pet[0]}
            description={pet[1]}
            image={pet[2]}
          />
        ))}

      </div>
    </div>
  );
}

export default PetList;
