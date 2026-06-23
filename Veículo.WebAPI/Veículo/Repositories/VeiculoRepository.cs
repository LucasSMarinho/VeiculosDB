using Veículo.Interfaces;
using Microsoft.EntityFrameworkCore;
using Veículo.Models;
using Veículo.BdContextVeiculos;

namespace Veículo.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        private readonly VeiculosContext _context;

        public VeiculoRepository(VeiculosContext context)
        {
            _context = context;
        }

        public void AtualizarIdCorpo(Veiculo veiculoAtualizado)
        {
            try
            {
                Veiculo veiculoBuscado = _context.Veiculos.Find(veiculoAtualizado.IdVeiculo)!;

                if (veiculoBuscado != null)
                {
                    veiculoBuscado.Nome = veiculoAtualizado.Nome;
                    veiculoBuscado.Imagem = veiculoAtualizado.Imagem;
                    veiculoBuscado.IdTipoVeiculo = veiculoAtualizado.IdTipoVeiculo;
                }

                _context.Veiculos.Update(veiculoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AtualizarIdUrl(Guid id, Veiculo veiculoAtualizado)
        {
            try
            {
                Veiculo veiculoBuscado = _context.Veiculos.Find(id)!;

                if (veiculoBuscado != null)
                {
                    veiculoBuscado.Nome = veiculoAtualizado.Nome;
                    veiculoBuscado.Imagem = veiculoAtualizado.Imagem;
                    veiculoBuscado.IdTipoVeiculo = veiculoAtualizado.IdTipoVeiculo;
                }

                _context.Veiculos.Update(veiculoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Veiculo BuscarPorId(Guid id)
        {
            try
            {
                Veiculo veiculoBuscado = _context.Veiculos.Find(id)!;

                return veiculoBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Veiculo novoVeiculo)
        {
            try
            {
                _context.Veiculos.Add(novoVeiculo);

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Veiculo veiculoBuscado = _context.Veiculos.Find(id)!;

                if (veiculoBuscado != null)
                {
                    _context.Veiculos.Remove(veiculoBuscado);

                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Veiculo> Listar()
        {
            try
            {
                List<Veiculo> listaVeiculos = _context.Veiculos
                    .Include(v => v.IdTipoVeiculoNavigation)
                    .OrderBy(v => v.IdTipoVeiculoNavigation!.Titulo)
                    .ToList();

                return listaVeiculos;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
