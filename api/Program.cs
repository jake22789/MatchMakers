//testing stuff
using System.Globalization;
using System.Text.Json;

//"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400"
Person sarah = new Person(1, "Sarah", 19, "Female", new List<int> { },new List<string> {""});
Person bob = new Person(2, "bob", 18, "male", new List<int> { }, new List<string> {""});
Person bill = new Person(3, "bill", 20, "male", new List<int> { 1 }, new List<string> {""});
Person abby = new Person(4, "abby", 26, "Female", new List<int> { }, new List<string> {""});
Person caleb = new Person(5, "caleb", 21, "male", new List<int> { }, new List<string> {""});
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

app.MapPost("/form/{name}", (string name) =>
{
    Console.WriteLine("added user");
    users.Add(new Parent(name, new List<Person> { }));
});
app.MapPost("/form/{name}/{age}/{gender}/{username}", (string name, int age, string gender, string username) =>
{
    Console.WriteLine("added user");
    int num = matches.Count + 1;
    Person person = new Person(num, name, age, gender, new List<int> { }, new List<string> {""});
    foreach (Parent user in users)
    {
        if (user.name == username)
        {
            user.children.Add(person);
        }
    }
    matches.Add(person.id, person);
});
app.MapPost("/match/{index}/{child}", (int index, string child) =>
{
    for (int i = 1; i < matches.Count; i++)
    {
        if (matches[i].name == child)
        {
            matches[i].likes?.Add(i);
        }
    }
});
app.MapGet("/child/{name}", (string name) =>
{
    for (int i = 1; i < matches.Count; i++)
    {
        if (matches[i].name == name)
        {
            string json = JsonSerializer.Serialize(matches[i]);
            return json;
        }
    }
    return "fail";
});

app.MapPost("/upload/{id}", async (IFormFile file,int id) =>
{
    Console.WriteLine("got an upload");
    Console.WriteLine(file.FileName);
    string filePath = "./images/"+file.FileName;
    matches[id].url.Add(file.FileName);
    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
    {
        await file.CopyToAsync(fileStream);
    }
}).DisableAntiforgery();
app.MapGet("/images/{imageName}",(string imageName)=>{
    string filePath = "./images/"+ imageName;
    byte[] bytes = System.IO.File.ReadAllBytes(filePath);
    return Results.File(bytes);
});
app.Run();
