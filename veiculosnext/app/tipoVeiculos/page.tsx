'use client'
import Footer from '@/components/footer';
import Header from '@/components/header/index'
import api from '@/services/services'
import Cadastrar from '@/components/cadastrar/index'
import { useContext, useEffect, useState } from 'react';
import Lista from '@/components/lista';
import { error } from 'console';
import { UsuarioContext } from '@/context/UsuarioContext';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

type TipoVeiculo = {
  idTipoVeiculo: string;
  titulo: string
}

const TipoVeiculos = () => {

  const { token } = useContext(UsuarioContext)
  const [listaTipoVeiculo, setListaTipoVeiculo] = useState<TipoVeiculo[]>([]);
  const [valor, setValor] = useState("");
  const [itemEditar, setItemEditar] = useState<TipoVeiculo | null>(null)
  const [editar, setEditar] = useState(false);
  const router = useRouter()

  useEffect(() => {
    funcGet();
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  const liparCampos = () => {
    setValor("")
  }
  //GET

  const funcGet = async () => {
    try {
      const response = await api.get('/TipoVeiculo');

      setListaTipoVeiculo(response.data)
    }
    catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro na chamada da API",
        text: "Lista de tipo de veiculos não encontrada!",
        icon: "error",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#d30000"
      })
    }
  }

  //POST

  const funcPost = async () => {

    if (valor.trim().length == 0) {
      Swal.fire({
        title: "Preencha os valores corretamente",
        text: "O tipo de veiculo deve ser preenchido antes de cadastrar!",
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


      const novoTipoVeiculo = {
        titulo: valor
      }

      await api.post('/TipoVeiculo', novoTipoVeiculo)
      funcGet()

      Swal.fire({
        title: "Tipo de veiculo cadastrado com sucesso",
        text: "Tipo de veiculo cadastrado!",
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
        title: "Tipo de veiculo não cadastrado",
        text: "Problemas para cadastrar o tipo de veiculo!",
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
    console.log(item.titulo)

    setItemEditar(item)
    setValor(item.titulo)
    setEditar(true)
  }

  const funcPut = async () => {

    if (valor.trim().length == 0) {
      Swal.fire({
        title: "Preencha os valores corretamente",
        text: "O tipo de veiculo deve ser preenchido antes de ser editado!",
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


      const novoTipoVeiculo = {
        titulo: valor
      }

      if (!itemEditar)
        return

      setEditar(true)

      console.log(novoTipoVeiculo)
      console.log(itemEditar)


      await api.put(`/TipoVeiculo/${itemEditar.idTipoVeiculo}`, novoTipoVeiculo)
      setEditar(false)

      funcGet()

      Swal.fire({
        title: "Tipo de veiculo editado com sucesso",
        text: "Tipo de veiculo editado!",
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
        title: "Tipo de veiculo não editado",
        text: "Problemas para editar o tipo de veiculo!",
        icon: "error",
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

    if (!item)
      return

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

    if(!result.isConfirmed)
    {
    return;
    }

    try {


      const response = await api.delete(`/TipoVeiculo/${item.idTipoVeiculo}`)
      console.log(response)
      funcGet()

      Swal.fire({
        title: "Tipo de veiculo excluido com sucesso",
        text: "Tipo de veiculo excluido!",
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
        title: "Tipo de veiculo não excluido",
        text: "Problemas para excluir o tipo de veiculo!",
        icon: "error",
        background: "#121826",
        confirmButtonText: "Ok",
        confirmButtonColor: "#ff751f",
        color: "white",
        iconColor: "#d30000"
      })
    }
  }


  const funcVazia = () => {
    console.log("aaa")
  }

  return (
    <>
      <Header />

      <Cadastrar
        funcCadastro={funcPost}
        funcCancelarEdicao={setEditar}
        funcEditar={funcPut}
        settipoVeiculoSelecionado={funcVazia}
        setImagem={funcVazia}

        setValor={setValor}
        tipoVeiculoSelecionado='nenhum'

        tituloCadastro='Tipos de veiculos'
        placeholder='Tipo'
        visibilidade='none'
        editar={editar}
        valor={valor}
        tipoLista='veiculos'
        lista={listaTipoVeiculo}
        tipoBotao='submit'
      />

      <Lista
        tituloLista='Tipos de veiculos'
        lista={listaTipoVeiculo}
        tipoLista='tipoVeiculo'
        visibilidade='none'
        funcEditar={funcPrePut}
        funcExcluir={funcDelete}
      />
      <Footer />
    </>
  );
};

export default TipoVeiculos;