'use client'


import Footer from '@/components/footer';
import Header from '@/components/header/index';
import Cadastrar from '@/components/cadastrar/index';
import api from '@/services/services'
import Lista from '@/components/lista/index';
import { useState } from 'react';
import { useEffect } from 'react';


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

  const [showLoading, setShowLoading] = useState(false)
  const [valor, setValor] = useState("")
  const [imagem, setImagem] = useState<File | null>(null)
  const [editar, setEditar] = useState(false);
  const [itemEditar, setItemEditar] = useState<Veiculo | null>(null)
  const [listaTipoVeiculo, setListaTipoVeiculo] = useState<TipoVeiculo[]>([]);
  const [tipoVeiculoSelecionado, setTipoVeiculoSelecionado] = useState("")
  const [listaVeiculo, setListaVeiculo] = useState<Veiculo[]>([]);


  useEffect(() => {
    funcGet();
    funcGetTipo();
  }, []);




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
    try {

      if(!imagem)
        return
 

      const formData = new FormData()
     
      formData.append("Nome", valor)
      formData.append("idTipoVeiculo", tipoVeiculoSelecionado)
      formData.append("Imagem", imagem)


      console.log(formData)

      const response = await api.post('/Veiculo', formData)
      console.log(response)
      funcGet()
    }
    catch (error) {
      console.log(error)
    }
  }

  //PUT

  const funcPrePut = (item: any) => {
    console.log(item.nome)

    setItemEditar(item)
    setValor(item.nome)
    setEditar(true)
  }

  const funcPut = async() => {
    try{
      if(!imagem)
        return
  
      const formData = new FormData()

      formData.append("Nome", valor)
      formData.append("Imagem", imagem)
      formData.append("idTipoVeiculo", tipoVeiculoSelecionado)
        
      console.log(formData)

       
      if(!itemEditar)
        return
         
      setEditar(true)

      const response = await api.put(`/Veiculo/${itemEditar.idVeiculo}`, formData)
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

      const response = await api.delete(`/Veiculo/${item.idVeiculo}`)
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
      />
      <Footer />
    </>
  );
};

export default Veiculos;