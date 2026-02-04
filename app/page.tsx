import PokemonList from "@/component/PokemonList";
import ScrollTopButton from "@/component/ScrollTopButton";

export default function Home() {
  return (
    <>
      <main><PokemonList /></main>
      <ScrollTopButton />
    </>
  );
}
