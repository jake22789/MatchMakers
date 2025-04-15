FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /App

# Copy everything
COPY ./api ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -o out

WORKDIR /App/out
ENTRYPOINT ["dotnet", "api.dll"]