import "./Botao.css"

interface BotaoProps {
  nomeDoBotao: string;
  tipoBotao: "button" | "submit" | "reset";
  funcBotao: () => void;
}


const Botao = ({nomeDoBotao, tipoBotao, funcBotao}: BotaoProps) => {
    return(

        <button className="botao" type={tipoBotao} onClick={ () => funcBotao()}> {nomeDoBotao} </button>

    )
}

export default Botao;