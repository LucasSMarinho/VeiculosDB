using Veículo.Models;

namespace Veículo.Interfaces
{
    public interface IVeiculoRepository
    {
        List<Veiculo> Listar();

        Veiculo BuscarPorId(Guid id);

        void Cadastrar(Veiculo veiculo);

        void AtualizarIdCorpo(Veiculo veiculoAtualizado);

        void AtualizarIdUrl(Guid id, Veiculo veiculoAtualizado);

        void Deletar(Guid id);
    }
}