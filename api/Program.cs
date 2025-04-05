//testing stuff
using System.Text.Json;

Person sarah = new Person(1,"Sarah", 19, "Female", new List<Person> { },"");
Person bob = new Person(2,"bob", 18, "male", new List<Person> { },"");
Person bill = new Person(3,"bill", 20, "male", new List<Person> { sarah },"");
Person abby = new Person(4,"abby", 26, "Female", new List<Person> { },"");
Person caleb = new Person(5,"caleb", 21, "male", new List<Person> { },"");
List<Person> children = new List<Person>();
children.Add(bob);
children.Add(bill);
Dictionary<int, Person> matches = new Dictionary<int, Person>();
matches.Add(sarah.id, sarah);
matches.Add(bob.id, bob);
matches.Add(bill.id, bill);
matches.Add(abby.id, abby);
matches.Add(caleb.id, caleb);
List<Parent> users = new List<Parent>();
users.Add(new Parent("agnis", children));

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.MapGet("/", () => "Hello World!");
app.MapGet("/user/{username}", (string username) =>
{
    foreach (var item in users)
    {
        if (item.name == username)
        {
            string json = JsonSerializer.Serialize(item);
            return json;
        }
    }
    return "fail";
});
app.MapGet("/matches", () =>
{

    string json = JsonSerializer.Serialize(matches);
    return json;
});

app.MapPost("/form/{name}", (string name)=>{
    Console.WriteLine("added user");
    users.Add(new Parent(name,new List<Person>{}));
});




app.MapPost("/upload", (IFormFile file) =>
{
    Console.WriteLine("got an upload");
    Console.WriteLine(file.FileName);
}).DisableAntiforgery();

app.Run();
