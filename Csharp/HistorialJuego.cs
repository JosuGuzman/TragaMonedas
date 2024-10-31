namespace et12alumno.Escritorio.Tragamonedas.Csharp
{
    public class HistorialJuego
    {
    public int Id { get; set; }
    public int IdJugador { get; set; }
    public int IdTragamonedas { get; set; }
    public string Resultado { get; set; }
    public int Premio { get; set; }
    public DateTime Fecha { get; set; }
    }
}