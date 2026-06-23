using System.ComponentModel.DataAnnotations;

namespace Veículo.DTO
{
    public class TipoVeiculoDTO
    {
        [Required(ErrorMessage = "O Titulo do tipo veiculo é obrigatorio")]
        public string? Titulo { get; set; }
    }
}
