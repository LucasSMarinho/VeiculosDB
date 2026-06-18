using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Veículo.Models;

[Table("Veiculo")]
public partial class Veiculo
{
    [Key]
    public Guid IdVeiculo { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string? Imagem { get; set; }

    public Guid? IdTipoVeiculo { get; set; }

    [ForeignKey("IdTipoVeiculo")]
    [InverseProperty("Veiculos")]
    public virtual TipoVeiculo? IdTipoVeiculoNavigation { get; set; }
}
