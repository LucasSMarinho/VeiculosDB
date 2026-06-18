using System.ComponentModel.DataAnnotations;

namespace Veículo.DTO;

public class VeiculoDTO
{
    [Required(ErrorMessage = "A Nome do veiculo é obrigatorio")]
    public string? Nome { get; set; }

    public IFormFile? Imagem { get; set; }

    [Required(ErrorMessage = "O genero do veiculo é obrigatorio")]
    public Guid IdTipoVeiculo { get; set; }
}