'use client'


import Footer from '@/components/footer';
import Header from '@/components/header/index';
import Cadastrar from '@/components/cadastrar/index';
import api from '@/services/services'
import Lista from '@/components/lista/index';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UsuarioContext } from '@/context/UsuarioContext';
import { useRouter } from 'next/navigation';
import { gerarResumo } from "@/services/IAServices";
import Swal from 'sweetalert2';

//Server Component x Client Component
// Um componente client e gerado no lado do cliente da tela
// enquanto um Server Component e gerado no lado do server
// para usar um Client Component use {'use client'} no inicio do texto


//Quando chega no lado client, já está renderizado

interface TipoVeiculo {
  idTipoVeiculo: string;
  titulo: string;
}

interface Veiculo {
  idVeiculo: string;
  nome: string;
  imagem: string | null;
  idTipoVeiculo: string;
  idTipoVeiculoNavigation: TipoVeiculo;
}

const Veiculos = () => {

  const { token, setToken } = useContext(UsuarioContext)
  const [showLoading, setShowLoading] = useState(false)
  const [valor, setValor] = useState("")
  const [imagem, setImagem] = useState<File | null>(null)
  const [editar, setEditar] = useState(false);
  const [itemEditar, setItemEditar] = useState<Veiculo | null>(null)
  const [listaTipoVeiculo, setListaTipoVeiculo] = useState<TipoVeiculo[]>([]);
  const [tipoVeiculoSelecionado, setTipoVeiculoSelecionado] = useState("")
  const [listaVeiculo, setListaVeiculo] = useState<Veiculo[]>([]);
  const [resumo, setResumo] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    funcGet();
    funcGetTipo();
  }, []);


  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);
  
  const liparCampos = () => {
    setValor("")
    setImagem(null)
    setTipoVeiculoSelecionado("")
  }

  //GET

  const funcGet = async () => {
    try {
      const response = await api.get('/Veiculo');

      console.log(response.data);

      setListaVeiculo(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const funcGetTipo = async () => {
    try {
      const response = await api.get('/TipoVeiculo');

      console.log(response.data);

      setListaTipoVeiculo(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  //POST

  const funcPost = async () => {
    if (valor.trim().length == 0) {
          Swal.fire({
            title: "Preencha os valores corretamente",
            text: "O veiculo deve ser preenchido antes de ser cadastrado!",
            icon: "warning",
            background: "#121826",
            confirmButtonText: "Ok",
            confirmButtonColor: "#ff751f",
            color: "white",
            iconColor: "#ff751f"
          })
    
          return false
    
        }

    try {

      if (!imagem)
        return


      const formData = new FormData()

      formData.append("Nome", valor)
      formData.append("idTipoVeiculo", tipoVeiculoSelecionado)
      formData.append("Imagem", imagem)


      console.log(formData)

      const response = await api.post('/Veiculo', formData)
      console.log(response)
      funcGet()

      Swal.fire({
        title: "Veiculo cadastrado com sucesso",
        text: "Veiculo cadaastrado!",
        icon: "success",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#0d9c00"
      })

      liparCampos()
    }
    catch (error) {
      console.log(error)
 
      Swal.fire({
              title: "Veiculo não editado",
              text: "Problemas para editar o veiculo!",
              icon: "error",
              background: "#121826",
              confirmButtonText: "Ok",
              confirmButtonColor: "#ff751f",
              color: "white",
              iconColor: "#d30000"
            })
    }
  }

  //PUT

  const funcPrePut = (item: any) => {
    console.log(item.nome)

    setItemEditar(item)
    setValor(item.nome)
    setEditar(true)
  }

  const funcPut = async () => {

    if (valor.trim().length == 0) {
          Swal.fire({
            title: "Preencha os valores corretamente",
            text: "O veiculo deve ser preenchido antes de ser editado!",
            icon: "warning",
            background: "#121826",
            confirmButtonText: "Ok",
            confirmButtonColor: "#ff751f",
            color: "white",
            iconColor: "#ff751f"
          })
    
          return false
    
        }

    try {
      if (!imagem)
        return

      const formData = new FormData()

      formData.append("Nome", valor)
      formData.append("Imagem", imagem)
      formData.append("idTipoVeiculo", tipoVeiculoSelecionado)

      console.log(formData)


      if (!itemEditar)
        return

      setEditar(true)

      const response = await api.put(`/Veiculo/${itemEditar.idVeiculo}`, formData)
      console.log(response)
      funcGet()

      Swal.fire({
        title: "Veiculo editado com sucesso",
        text: "Veiculo editado!",
        icon: "success",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#0d9c00"
      })

      liparCampos()
    }
    catch (error) {
      console.log(error)

      Swal.fire({
        title: "Veiculo não foi editado",
        text: "Problemas para editar o veiculo",
        icon: "success",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#d30000"
      })
    }
  }

  //DELETE

  const funcDelete = async (item: any) => {
    const result = await Swal.fire({
      title: "Tem certeza que você deseja excluir o item?",
      text: "Quer mesmo fazer isso?",
      icon: "question",
      background: "#121826",
      confirmButtonColor: "#ff751f",
      showCancelButton: true,
      color: "white",
      iconColor: "#525252",
      confirmButtonText: "Confirmar Exclusão",
      cancelButtonText: "Cancelar",
    })

    if (!result.isConfirmed) {
      return;
    }

    try {
      if (!item)
        return

      const response = await api.delete(`/Veiculo/${item.idVeiculo}`)
      console.log(response)
      funcGet()

      Swal.fire({
        title: "Veiculo deletado com sucesso",
        text: "Veiculo deletado!",
        icon: "success",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#0d9c00"
      })
    }
    catch (error) {
      console.log(error)

      Swal.fire({
        title: "Veiculo não foi deletado",
        text: "Problemas para deletar o veiculo",
        icon: "error",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#d30000"
      })
    }
  }


  const funcResumo = async (item : Veiculo) => {
    try {
        setLoading(true); 
        
        const nomeDoVeiculo = item.nome;
        const termoBusca = `Veiculo: ${nomeDoVeiculo}`; 
        
       
        const resumoIA = await gerarResumo(termoBusca);
        
        Swal.fire({
            title: `Resumo: ${nomeDoVeiculo}`,
            text: resumoIA,
            icon: "success",
            confirmButtonText: "Fechar",
            background: "#121826",
            confirmButtonColor: "#ff751f",
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Erro",
            text: "Não foi possível gerar o resumo do curso no momento.",
            icon: "error",
            confirmButtonText: "Fechar",
            background: "#121826",
            confirmButtonColor: "#ff751f",
        });
    } finally {
        setLoading(false); 
    }
};



  return (
    <>
      <Header />
      <Cadastrar

        funcCadastro={funcPost}
        funcCancelarEdicao={setEditar}
        funcEditar={funcPut}
        settipoVeiculoSelecionado={setTipoVeiculoSelecionado}
        setImagem={setImagem}

        setValor={setValor}
        tipoVeiculoSelecionado={tipoVeiculoSelecionado}

        tituloCadastro='Veiculos'
        placeholder='Tipo'
        visibilidade=''
        editar={editar}
        valor={valor}
        tipoLista='veiculo'
        lista={listaTipoVeiculo}
        tipoBotao='submit'
      />

      <Lista
        tituloLista='Veiculos'
        lista={listaVeiculo}
        tipoLista='veiculo'
        visibilidade=''
        funcEditar={funcPrePut}
        listaTipoVeiculo={listaTipoVeiculo}
        funcExcluir={funcDelete}
        funcResumo={funcResumo}
      />
      <Footer />
    </>
  );
};

export default Veiculos;