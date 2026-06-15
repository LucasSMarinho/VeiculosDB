'use client'


import Footer from '@/components/footer';
import Header from '@/components/header/index';


//Server Component x Client Component
// Um componente client e gerado no lado do cliente da tela
// enquanto um Server Component e gerado no lado do server
// para usar um Client Component use {'use client'} no inicio do texto


//Quando chega no lado client, já está renderizado

interface CharProps{
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
}
interface ResponseProps {
  results: CharProps[];
}

const Veiculos = async() => {


  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data: ResponseProps = await response.json();

  console.log(data);

  return (
      <> 
        <Header/>
         {(data != null) ?
          data.results.map(r => {
            return(
               <li>
                <ul>{r.name}</ul>
               </li>
            ) })
          : <></>}
        <Footer />
      </>
  );
};

export default Veiculos;