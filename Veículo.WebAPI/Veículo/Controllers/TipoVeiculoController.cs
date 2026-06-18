using Veículo.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Veículo.DTO;
using Veículo.Models;

namespace Veiculos.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]

public class TipoVeiculoController : ControllerBase
{
    private readonly ITipoVeiculoRepository _tipoVeiculoRepository;

    public TipoVeiculoController(ITipoVeiculoRepository tipoVeiculoRepository)
    {
        _tipoVeiculoRepository = tipoVeiculoRepository;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        try
        {
            return Ok(_tipoVeiculoRepository.BuscarPorId(id));
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
            return Ok(_tipoVeiculoRepository.Listar());
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPost]
    public IActionResult Post(TipoVeiculoDTO tipoVeiculo)
    {
        try
        {
            var novoTipoVeiculo = new TipoVeiculo
            {
                Titulo = tipoVeiculo.Titulo!
            };

            _tipoVeiculoRepository.Cadastrar(novoTipoVeiculo);

            return StatusCode(201);
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut("{id}")]
    public IActionResult Put(Guid id, TipoVeiculoDTO tipoVeiculo)
    {
        try
        {
            var tipoVeiculoAtualizado = new TipoVeiculo
            {
                Titulo = tipoVeiculo.Titulo!
            };

            _tipoVeiculoRepository.AtualizarIdUrl(id, tipoVeiculoAtualizado);

            return Ok();
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    [HttpPut]
    public IActionResult PutBody(TipoVeiculo tipoVeiculoAtualizado)
    {
        try
        {
            _tipoVeiculoRepository.AtualizarIdCorpo(tipoVeiculoAtualizado);

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
        try
        {
            _tipoVeiculoRepository.Deletar(id);

            return NoContent();
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }
}
