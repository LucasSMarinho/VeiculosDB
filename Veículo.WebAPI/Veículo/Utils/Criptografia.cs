using Microsoft.Identity.Client;

namespace Veículo.Utils;

public static class Criptografia
{
    public static string GerarHash(string senha)
    {
        return BCrypt.Net.BCrypt.HashPassword(senha);
    }

    public static bool compararHash(string senhaForm, string senhaBanco)
    {
        return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
    }

}
