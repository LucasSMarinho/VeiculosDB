import "./Lista.css";

// Importação de imagens:
import Editar from "../../public/pen-to-square-solid.svg";
import Excluir from "../../public/trash-can-regular.svg";
import faltadecartaz from "../../public/faltadecartaz.jpg"
import Visualizar from "../../public/Eye.svg"
import Image from "next/image";

interface ListaProps {
  tituloLista: string;
  lista: any[];
  tipoLista: string;
  visibilidade: string;

  funcEditar: (item : any) => void;
  funcExcluir: (item : any) => void;
  funcResumo?: (item : any) => void;

  listaTipoVeiculo?: any[];
}

const Lista = (props : ListaProps) => {
    return (
        <section className="layout_grid">
            <div className={`listagem`}>

                <h1>{props.tituloLista}</h1>
                <hr />
                
                {props.tipoLista == "tipoVeiculo" ? 
                (

                <div className="tabela tabela-tipoveiculos">
                    <table >
                        {/* cabeçalho da tabela: */}
                        <thead>
                            {/* tr => table row */}
                            <tr className="table_cabecalho">
                                {/* th => table head */}
                                {props.lista && props.lista.length > 0 ? 
                                (
                                <>
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Tipo</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                                </>
                            )
                                 : (<></>)}
                            </tr>
                        </thead>
                            <tbody className={props.lista && props.lista.length > 0 ? "" : "centralizar"}>
                        {/* tbody => corpo da tabela */}
                            {/* Verifica se a lista existe e tem itens */}
                            {props.lista && props.lista.length > 0 ? (
                                // Se houver itens, faz um map (laço) para renderizar cada item da lista
                                props.lista.map((item : any) => (
                                        <tr className="item_lista" key={(props.tipoLista == "veiculo") ? item.idVeiculo : item.idTipoVeiculo}>
                                        {/* {console.log(index)} */}
                                        {/* {console.log(item.idtipoVeiculo)} */}
                                        <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                            {/* Segunda célula: mostra o nome do gênero caso o tipo da lista seja "veiculo".*/}
                                            {/* adicionar essa linha depois de fazer o metd de lista veiculo: */}
                                            <img className="img_cartaz" src={(`https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/` || `https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/null` || `https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/undefined`) ? faltadecartaz.src : `https://localhost:7033/imagens/${item.imagem}` } alt="" />
                                        </td>
                                        <td data-cell="Nome">
                                            {/* Primeira célula da linha: mostra o nome (se for gênero) ou título (se for veiculo) */}
                                            {/* titulo == veiculo */}
                                            {props.tipoLista === "tipoVeiculo" ? item.titulo : item.nome}
                                        </td>
                                        <td data-cell="Tipo" style={{ display: props.visibilidade }}>
                                            {/* Segunda célula: mostra o nome do gênero caso o tipo da lista seja "veiculo".*/}
                                            {/* adicionar essa linha depois de fazer o metd de lista veiculo: */}
                                            {props.tipoLista === "veiculo" ? (item.idTipoVeiculoNavigation?.titulo || '-') : '-'}
                                        </td>
                                        <td data-cell="Editar">
                                            <button className="icon" onClick={() => props.funcEditar(item)}>
                                                <Image src={Editar} alt="Caneta" width={40}/>
                                            </button>
                                        </td>
                                        <td data-cell="Excluir">
                                            <button className="icon" onClick={() => props.funcExcluir(item)}>
                                                <Image src={Excluir} alt="Lixeira" width={40}/>
                                            </button>
                                        </td>
                                    </tr>
                    
                                ))
                            ) : (
                                // Caso a lista esteja vazia ou não exista, mostra uma linha dizendo que não há registros
                                <tr key="nenhum-cadastro">
                                    <td>Nenhum registro encontrado.</td>
                                </tr>
                            )
                            }


                        </tbody>
                    </table>
                </div>
                ) 
                : 
                (
                <div className="tabela tabela-cards">
                    <table>
                        {/* tbody => corpo da tabela */}
                        
                            {/* Verifica se a lista existe e tem itens */}

                            {props.listaTipoVeiculo && props.listaTipoVeiculo.length > 0 && props.lista && props.lista.length > 0 ? (
                                props.listaTipoVeiculo.map((tipo: any) => {
                                    const itensDoTipo = props.lista.filter((item) => item.idTipoVeiculo === tipo.idTipoVeiculo);

                                    if (!itensDoTipo.length) {
                                        return null;
                                    }

                                    return (
                                        <tbody key={tipo.idTipoVeiculo} className="lista_cards">
                                            {itensDoTipo.map((item: any) => (
                                                <tr className="card_lista" key={(props.tipoLista == "veiculo") ? item.idVeiculo : item.idTipoVeiculo}>
                                                    <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                                        <img className="img_cartaz" src={(`https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/` || `https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/null` || `https://localhost:7033/imagens/${item.imagem}` == `https://localhost:7033/imagens/undefined`) ? faltadecartaz.src : `https://localhost:7033/imagens/${item.imagem}` } alt="" />
                                                    </td>
                                                
                                                    <td data-cell="Nome">
                                                        {props.tipoLista === "tipoVeiculo" ? item.titulo : item.nome}
                                                    </td>
                                                    <td data-cell="Tipo" style={{ display: props.visibilidade }}>
                                                        {props.tipoLista === "veiculo" ? (item.idTipoVeiculoNavigation?.titulo || '-') : '-'}
                                                    </td>
                                                    <td data-cell="Editar">
                                                        <button className="icon" onClick={() => props.funcEditar(item)}>
                                                            Editar
                                                        </button>
                                                    </td>
                                                    {props.funcResumo && (
                                                     <td data-cell="Visualizar">
                                                     <button className="icon" onClick={() => (props.funcResumo?.(item))}>
                                                       <Image src={Visualizar} alt="Olho" width={50}/>
                                                    </button>
                                                   </td>
                                                    )}
                                                    <td data-cell="Excluir">
                                                        <button className="icon" onClick={() => props.funcExcluir(item)}>
                                                             Excluir
                                                        </button>
                                                    </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    );
                                })
                            ) : (
                                <tbody className="centralizar">
                                    <tr key="nenhum-cadastro">
                                        <td>Nenhum registro encontrado.</td>
                                    </tr>
                                </tbody>
                            )
                            }


                        
                    </table>
                </div>
            )}

            </div>
        </section>
    )
}

export default Lista;