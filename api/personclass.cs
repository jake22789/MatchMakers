using Microsoft.Net.Http.Headers;

record Person(int id,string name,int age,string gender,List<int>? likes ,List<string> url);