using Veículo.Models;

namespace Veículo.Interfaces;

public interface ITipoVeiculoRepository
{
    void Cadastrar(TipoVeiculo novoTipoVeiculo);

    void AtualizarIdCorpo(TipoVeiculo tipoVeiculoAtualizado);

    void AtualizarIdUrl(Guid id, TipoVeiculo tipoVeiculoAtualizado);

    List<TipoVeiculo> Listar();

    void Deletar(Guid id);

    TipoVeiculo BuscarPorId(Guid id);
}

