import Link from "next/link";
import './Header.css'
import Logovectra from "@/public/vectra.svg"
import Image from "next/image"; 

function Header() {
  return (
      <header> 
         <Image src={Logovectra} alt="Logo do Vectra" width={130} />
        <nav>
          <Link href="/veiculos">Veiculos</Link>
          <Link href="/tipoVeiculos">Tipo Veiculo</Link>
        </nav>
      </header>
  );
}

export default Header;