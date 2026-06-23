using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Veículo.Models;

[Table("TipoVeiculo")]
public partial class TipoVeiculo
{
    [Key]
    public Guid IdTipoVeiculo { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Titulo { get; set; } = null!;

    [InverseProperty("IdTipoVeiculoNavigation")]
    [JsonIgnore]

    public virtual ICollection<Veiculo> Veiculos { get; set; } = new List<Veiculo>();
}
