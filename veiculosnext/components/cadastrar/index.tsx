import './cadastrar.css'
import Botao from "../botao/index";

interface CadastroProps {
  tituloCadastro: string;
  placeholder: string;
  valor: string;

  setImagem: (arquivo: File | null) => void;

  tipoLista: string;
  visibilidade: string;

  editar: boolean;

  lista: any[];

  tipoVeiculoSelecionado: string;

  setValor: (valor: string) => void;
  settipoVeiculoSelecionado: (id: string) => void;

  funcCancelarEdicao: (any: boolean) => void;
  funcEditar: () => void;
  funcCadastro: () => void;

  tipoBotao: "button" | "submit" | "reset";
}


// Destructuring nas props:
// const Cadastro = ({ 
//     cadastro, tituloCadastro, valor, setValor, estilo, 
//     valorSelect, setValorSelect, listatipoVeiculos 
//   }) => {}

const Cadastro = (props : CadastroProps) => {
     
    return (
        <section className={`section_cadastro`}>
            <form className={`layout_grid form_cadastro`}>
                <h1>{props.tituloCadastro}</h1>
                <hr />
                <div className="campos_cadastro">
                    <div className={`campo_cad_nome`}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" placeholder={`Digite o nome do ${props.placeholder}`} 
                        //O valor do input vem de props (estado do componente pai)
                        value={props.valor}
                        // Atualiza o estado do pai ao digitar
                        onChange={(e) => props.setValor(e.target.value)}
                        />
                    </div>
                    <div className={`campo_cad_tipoVeiculo`} style={{ display: props.visibilidade }}>
                        <label htmlFor="tipoVeiculo">Tipo</label>
                        <select value={props.tipoVeiculoSelecionado} onChange={(e) => props.settipoVeiculoSelecionado(e.target.value)}>
                            <option value="" disabled>Selecione</option>
                            {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item : any) => (
                            <option key={item.idTipoVeiculo} className="opcoes-tipoVeiculos" value={item.idTipoVeiculo}>{item.titulo}</option>
                             ) ) ) : (<></>) }
                        </select>
                    </div>
                    <div className={`campo_cad_tipoVeiculo`} style={{ display: props.visibilidade }}>
                        <label htmlFor="imagem" className={`label_image`}> Selecionar Imagem </label>
                        <input className={`input_image`} type="file" id="imagem" onChange={(e) => props.setImagem(e.target.files?.[0] ?? null)} style={ {display: "none"} }/>
                    </div>
                    <Botao tipoBotao="button" nomeDoBotao={(props.editar) == false ? "Cadastrar" : "Editar"} funcBotao={() => (props.editar) == false ? props.funcCadastro() : props.funcEditar()} />
                    <button className="botao_cancelar" type="button" onClick={() => {props.funcCancelarEdicao(false)}} style={(props.editar == false) ? {display: "none"} : {display: "block" }}>Cancelar</button>
                </div>
            </form>
        </section>
    )
}

export default Cadastro;