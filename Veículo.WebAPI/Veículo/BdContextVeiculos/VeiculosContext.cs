using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Veículo.Models;

namespace Veículo.BdContextVeiculos;

public partial class VeiculosContext : DbContext
{
    public VeiculosContext()
    {
    }

    public VeiculosContext(DbContextOptions<VeiculosContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TipoVeiculo> TipoVeiculos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<Veiculo> Veiculos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Veiculos;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TipoVeiculo>(entity =>
        {
            entity.HasKey(e => e.IdTipoVeiculo).HasName("PK__TipoVeic__14D60C48C6D8F83D");

            entity.Property(e => e.IdTipoVeiculo).HasDefaultValueSql("(newid())");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF976C7609F8");
        });

        modelBuilder.Entity<Veiculo>(entity =>
        {
            entity.HasKey(e => e.IdVeiculo).HasName("PK__Veiculo__CAC4F346093B679C");

            entity.Property(e => e.IdVeiculo).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.IdTipoVeiculoNavigation).WithMany(p => p.Veiculos).HasConstraintName("FK__Veiculo__IdTipoV__6D0D32F4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
