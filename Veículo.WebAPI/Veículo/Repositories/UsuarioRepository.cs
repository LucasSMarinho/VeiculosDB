using Microsoft.AspNetCore.Mvc.Filters;
using Veículo.BdContextVeiculos;
using Veículo.Interfaces;
using Veículo.Models;
using Veículo.Utils;
using Veículo.Repositories;

namespace Veículo.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly VeiculosContext _context;

        public UsuarioRepository(VeiculosContext context)
        {
            _context = context;
        }

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                Usuario usuarioBuscado = _context.Usuarios.FirstOrDefault(u => u.Email == email)!;

                if (usuarioBuscado != null)
                {
                    bool confere = Criptografia.compararHash(senha, usuarioBuscado.Senha!);

                    if (confere)
                    {
                        return usuarioBuscado;
                    }
                }

                return null!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                Usuario usuarioBuscado = _context.Usuarios.Find(id.ToString())!;

                if (usuarioBuscado != null)
                {
                    return usuarioBuscado;
                }

                return null!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            try
            {
                novoUsuario.IdUsuario = Guid.NewGuid().ToString();
                novoUsuario.Senha = Criptografia.GerarHash(novoUsuario.Senha)!;

                _context.Usuarios.Add(novoUsuario);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}