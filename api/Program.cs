//testing stuff
using System.Text.Json;

List<Parent> users = new List<Parent>();
Person sarah = new Person("Sarah",19,"Female", new List<Person>{});
Person bob = new Person("bob",18,"male", new List<Person>{});
Person bill = new Person("bill",20,"male", new List<Person>{sarah});
List<Person> children = new List<Person>();
children.Add(bob);
children.Add(bill);
users.Add(new Parent("agnis",children));


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.MapGet("/", () => "Hello World!");
app.MapGet("/user/{username}", (string username) =>
{
    foreach (var item in users)
    {
        if (item.name == username){
            string json = JsonSerializer.Serialize(item);
            return json;
        }
    }
    return "fail";
});





app.MapPost("/upload", (IFormFile file) =>
{
    Console.WriteLine("got an upload");
    Console.WriteLine(file.FileName);
}).DisableAntiforgery();

app.Run();
