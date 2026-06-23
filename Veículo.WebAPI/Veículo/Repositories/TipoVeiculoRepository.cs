using Veículo.BdContextVeiculos;
using Veículo.Models;
using Veículo.Interfaces;

namespace Veículo.Repositories
{
    public class TipoVeiculoRepository : ITipoVeiculoRepository
    {
        private readonly VeiculosContext _context;

        public TipoVeiculoRepository(VeiculosContext context)
        {
            _context = context;
        }

        public void AtualizarIdCorpo(TipoVeiculo tipoVeiculoAtualizado)
        {
            try
            {
                TipoVeiculo tipoVeiculoBuscado = _context.TipoVeiculos.Find(tipoVeiculoAtualizado.IdTipoVeiculo)!;

                if (tipoVeiculoBuscado != null)
                {
                    tipoVeiculoBuscado.Titulo = tipoVeiculoAtualizado.Titulo;
                }

                _context.TipoVeiculos.Update(tipoVeiculoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AtualizarIdUrl(Guid id, TipoVeiculo tipoVeiculoAtualizado)
        {
            try
            {
                TipoVeiculo tipoVeiculoBuscado = _context.TipoVeiculos.Find(id)!;

                if (tipoVeiculoBuscado != null)
                {
                    tipoVeiculoBuscado.Titulo = tipoVeiculoAtualizado.Titulo;
                }

                _context.TipoVeiculos.Update(tipoVeiculoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public TipoVeiculo BuscarPorId(Guid id)
        {
            try
            {
                TipoVeiculo tipoVeiculoBuscado = _context.TipoVeiculos.Find(id)!;

                return tipoVeiculoBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(TipoVeiculo novoTipoVeiculo)
        {
            try
            {
                _context.TipoVeiculos.Add(novoTipoVeiculo);

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
                TipoVeiculo tipoVeiculoBuscado = _context.TipoVeiculos.Find(id)!;

                if (tipoVeiculoBuscado != null)
                {
                    _context.TipoVeiculos.Remove(tipoVeiculoBuscado);

                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<TipoVeiculo> Listar()
        {
            try
            {
                return _context.TipoVeiculos
                    .OrderBy(tv => tv.Titulo)
                    .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}