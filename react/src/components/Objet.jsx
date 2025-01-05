export default function Objet({ objet }) {
    return (
        <>
            <div class="bg-white shadow-md  overflow-hidden w-[300px]">
                <img src={objet.image} alt="Item Image" class="w-full h-64 object-cover" />
                <div class="p-4">
                    <h3 class="font-semibold text-lg">{objet.titre}</h3>
                    <p class="text-gray-500 mt-2">{objet.description}</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="font-bold text-xl">{objet.prixActuel}$</span>
                        <button class="bg-white text-black py-2 px-4  border border-black rounded hover:bg-black hover:text-white">Start a Bid</button>
                    </div>
                </div>
            </div>
        </>
    )
}