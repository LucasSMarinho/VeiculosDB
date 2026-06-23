import api from "./services";

const API_KEY = "";

export const gerarResumo = async (nome = "") => {
  try {
    const resposta = await api.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: 180,
        messages: [
          {
            role: "user",
            content: `
              Faça um resumo simples do veiculo abaixo:

              Nome: ${nome}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return resposta.data.choices[0].message.content;
  } catch (erro) {
    console.error(erro);
    console.log("Resposta:", erro.response.data);
    console.log("Status:", erro.response.status);
    return "Erro ao gerar resumo.";
  }
};


//  Descrição:
// ${descricao}