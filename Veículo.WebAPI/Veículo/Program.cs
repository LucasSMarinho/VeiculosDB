using Azure.Core;
using Veículo.BdContextVeiculos;
using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Veículo.Interfaces;
using Veículo.Repositories;

var builder = WebApplication.CreateBuilder(args);

//adiciona o contexto do banco de dados (exemplo com SQL Server)

builder.Services.AddDbContext<VeiculosContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionContext")));

//adiciona o repositório ao container de injeção de dependencia

builder.Services.AddScoped<ITipoVeiculoRepository, TipoVeiculoRepository>();
builder.Services.AddScoped<IVeiculoRepository, VeiculoRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

//adiciona o ser viço de jwt Bearer (metodo de autenticação)

builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = "JwtBearer";
    options.DefaultAuthenticateScheme = "JwtBearer";
})
.AddJwtBearer("JwtBearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //valida quem está solucionando
        ValidateIssuer = true,
        //valida quem está solucionando
        ValidateAudience = true,
        //valida se o tempo de expiração será validado
        ValidateLifetime = true,
        //forma de criptografia e valida a chave de autenticação
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("filmes-chave-autenticacao-webapi-dev")),

        //valida o tempo de expiração do token
        ClockSkew = TimeSpan.FromMinutes(10),

        //nome do issuer (de onde está vindo)
        ValidIssuer = "api_filmes",

        //nome do audience (para onde ele está indo)
        ValidAudience = "api_filmes"

    };
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{

    options.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
    {
        Version = "v1",
        Title = "Veiculos API",
        Description = "Uma API com catálogo de veiculos",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new Microsoft.OpenApi.OpenApiContact
        {
            Name = "LucasSMarinho",
            Url = new Uri("https://github.com/LucasSMarinho")
        },
        License = new Microsoft.OpenApi.OpenApiLicense
        {
            Name = "Example License",
            Url = new Uri("https://example.com/license")
        }

    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {

        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Insira o token JWT"
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = Array.Empty<string>().ToList()
    });

});


builder.Services.AddCors(options =>
{
    options.AddPolicy("CarsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


//adiciona o serviço de Controllers

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options => { });
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseStaticFiles();
app.UseCors("CarsPolicy");
app.UseAuthentication();
app.UseAuthorization();

//adiciona o mapeamento de Controllers
app.MapControllers();

app.Run();
