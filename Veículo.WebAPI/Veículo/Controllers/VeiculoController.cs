using Veículo.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Veículo.DTO;
using Veículo.Models;

namespace Veículo.Controllers;

[Route("api/[controller]")]
[ApiController]

public class VeiculoController : ControllerBase
{
    private readonly IVeiculoRepository _veiculoRepository;

    public VeiculoController(IVeiculoRepository veiculoRepository)
    {
        _veiculoRepository = veiculoRepository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        try
        {
            return Ok(_veiculoRepository.BuscarPorId(id));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            return Ok(_veiculoRepository.Listar());
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] VeiculoDTO veiculo)
    {
        if (string.IsNullOrEmpty(veiculo.Nome))
            return BadRequest("É obrigatório informar o nome do veículo");

        Veiculo novoVeiculo = new Veiculo();

        if (veiculo.Imagem != null && veiculo.Imagem.Length != 0)
        {
            var extensao = Path.GetExtension(veiculo.Imagem.FileName);

            var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

            var pastaRelativa = "wwwroot/imagens";
            var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

            if (!Directory.Exists(caminhoPasta))
                Directory.CreateDirectory(caminhoPasta);

            var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await veiculo.Imagem.CopyToAsync(stream);
            }

            novoVeiculo.Imagem = nomeArquivo;
        }

        novoVeiculo.Nome = veiculo.Nome;
        novoVeiculo.IdTipoVeiculo = veiculo.IdTipoVeiculo;

        try
        {
            _veiculoRepository.Cadastrar(novoVeiculo);
            return StatusCode(201);
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, VeiculoDTO veiculoAtualizado)
    {
        var veiculoBuscado = _veiculoRepository.BuscarPorId(id);

        if (veiculoBuscado == null)
            return NotFound("Veículo não encontrado");

        if (!string.IsNullOrEmpty(veiculoAtualizado.Nome))
            veiculoBuscado.Nome = veiculoAtualizado.Nome;

        if (veiculoAtualizado.IdTipoVeiculo != Guid.Empty)
            veiculoBuscado.IdTipoVeiculo = veiculoAtualizado.IdTipoVeiculo;

        if (veiculoAtualizado.Imagem != null && veiculoAtualizado.Imagem.Length != 0)
        {
            var pastaRelativa = "wwwroot/imagens";
            var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

            if (!string.IsNullOrEmpty(veiculoBuscado.Imagem))
            {
                var caminhoAntigo = Path.Combine(caminhoPasta, veiculoBuscado.Imagem);

                if (System.IO.File.Exists(caminhoAntigo))
                    System.IO.File.Delete(caminhoAntigo);
            }

            var extensao = Path.GetExtension(veiculoAtualizado.Imagem.FileName);
            var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

            if (!Directory.Exists(caminhoPasta))
                Directory.CreateDirectory(caminhoPasta);

            var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await veiculoAtualizado.Imagem.CopyToAsync(stream);
            }

            veiculoBuscado.Imagem = nomeArquivo;
        }

        try
        {
            _veiculoRepository.AtualizarIdUrl(id, veiculoBuscado);
            return Ok();
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut]
    public IActionResult PutBody(Veiculo veiculoAtualizado)
    {
        try
        {
            _veiculoRepository.AtualizarIdCorpo(veiculoAtualizado);
            return Ok();
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var veiculoBuscado = _veiculoRepository.BuscarPorId(id);

        if (veiculoBuscado == null)
            return NotFound("Veículo não encontrado");

        var pastaRelativa = "wwwroot/imagens";
        var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

        if (!string.IsNullOrEmpty(veiculoBuscado.Imagem))
        {
            var caminho = Path.Combine(caminhoPasta, veiculoBuscado.Imagem);

            if (System.IO.File.Exists(caminho))
                System.IO.File.Delete(caminho);
        }

        try
        {
            _veiculoRepository.Deletar(id);
            return NoContent();
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }
}
