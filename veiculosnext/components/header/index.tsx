import Link from "next/link";
import './Header.css'
import Logovectra from "@/public/vectra.svg"
import Image from "next/image"; 
import imagemUsuario from "@/public/imagemUsuario.svg"
import imagemSair from "@/public/imagemSair.svg"
import { useContext } from "react";
import { UsuarioContext } from "@/context/UsuarioContext";
import Swal from "sweetalert2";

function Header() {
  
  const {usuario , setUsuario, setToken} = useContext(UsuarioContext)
  console.log(usuario)

  const funcSair = async() => {
   const result = await Swal.fire({
         title: "Tem certeza que você deseja sair?",
         text: "Quer mesmo fazer isso?",
         icon: "question",
         background: "#121826",
         confirmButtonColor: "#ff751f",
         showCancelButton: true,
         color: "white",
         iconColor: "#525252",
         confirmButtonText: "Sim",
         cancelButtonText: "Cancelar",
       })
   
       if(!result.isConfirmed)
       {
       return;
       }

       setUsuario("")
       localStorage.removeItem('token')
       setToken(null)
  } 

  return (
      <header> 
         <Image src={Logovectra} alt="Logo do Vectra" width={130} />
         <section>
        <nav>
          <Link href="/veiculos">Veiculos</Link>
          <Link href="/tipoVeiculos">Tipo Veiculo</Link>
        </nav>
        <div>
          <Image src={imagemUsuario} alt="Usuario" width={20} />
          <p>{usuario?.name}</p>
        </div>
          <button className='Butao_Sair' type="button" onClick={() => {funcSair()}}>
              <Image src={imagemSair} alt="Sair" width={20}/> <p>Sair</p>
          </button>
         </section>
      </header>
  );
}

export default Header;