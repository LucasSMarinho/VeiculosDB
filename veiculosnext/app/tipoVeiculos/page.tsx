'use client'
import Footer from '@/components/footer';
import Header from '@/components/header/index'
import api from '@/services/services'
import Cadastrar from '@/components/cadastrar/index'
import { useEffect, useState } from 'react';
import Lista from '@/components/lista';
import { error } from 'console';

type TipoVeiculo = {
  idtipoVeiculo: string;
  titulo: string
}

const TipoVeiculos = () => {

  const [listaTipoVeiculo, setListaTipoVeiculo] = useState<TipoVeiculo[]>([]);
  const [valor, setValor] = useState("");
  const [itemEditar, setItemEditar] = useState<TipoVeiculo | null>(null)
  const [editar, setEditar] = useState(false);


  useEffect(() => {
    funcGet();
  }, []);
  //GET

  const funcGet = async () => {
    try {
      const response = await api.get('/tipoVeiculo');

      console.log(response.data);

      setListaTipoVeiculo(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }

  //POST

  const funcPost = async () => {
    try {
      const novoTipoVeiculo = {
        titulo: valor
      }

      const response = await api.post('/tipoVeiculo', novoTipoVeiculo)
      console.log(response)
      funcGet()
    }
    catch (error) {
      console.log(error)
    }
  }

  //PUT

  const funcPrePut = (item: any) => {
    console.log(item.titulo)

    setItemEditar(item)
    setValor(item.titulo)
    setEditar(true)
  }

  const funcPut = async() => {
    try{
      const novoTipoVeiculo = {
        titulo: valor
      }

      if(!itemEditar)
        return
         
      setEditar(true)

      const response = await api.put(`/tipoVeiculo/${itemEditar.idtipoVeiculo}`, novoTipoVeiculo)
      console.log(response)
      funcGet()
    }
    catch(error){
      console.log(error)
    }
  }

  //DELETE

  const funcDelete = async(item: any) => {
    try{
      if(!item)
        return

      const response = await api.delete(`/tipoVeiculo/${item.idtipoVeiculo}`)
      console.log(response)
      funcGet()
    }
    catch(error){
      console.log(error)
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