import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Pagina de login do usuário',
}

function Home() {
  return (
      <div> 
        <h1>Página Home</h1>
      </div>
  );
}

export default Home;