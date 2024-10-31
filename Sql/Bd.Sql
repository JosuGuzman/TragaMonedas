CREATE TABLE Jugadores (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    Credito INT DEFAULT 1000,
    Nivel INT DEFAULT 1,
    FechaRegistro DATETIME DEFAULT GETDATE(),
    UltimoLogin DATETIME
);

CREATE TABLE Tragamonedas (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    MultiplicadorPremio DECIMAL(3, 2) DEFAULT 1.0,
    ProbabilidadGanancia DECIMAL(4, 3) DEFAULT 0.05,
    CostoPorJugada INT DEFAULT 10
);

CREATE TABLE Premios (
    Id INT PRIMARY KEY IDENTITY,
    Descripcion NVARCHAR(200),
    Multiplicador DECIMAL(3, 2)
);

CREATE TABLE HistorialJuegos (
    Id INT PRIMARY KEY IDENTITY,
    JugadorId INT FOREIGN KEY REFERENCES Jugadores(Id),
    TragamonedasId INT FOREIGN KEY REFERENCES Tragamonedas(Id),
    Resultado VARCHAR(50),
    Premio INT,
    Fecha DATETIME DEFAULT GETDATE()
);

CREATE TABLE Apuestas (
    Id INT PRIMARY KEY IDENTITY,
    JugadorId INT FOREIGN KEY REFERENCES Jugadores(Id),
    TragamonedasId INT FOREIGN KEY REFERENCES Tragamonedas(Id),
    MontoApostado INT,
    Resultado VARCHAR(50),
    Fecha DATETIME DEFAULT GETDATE()
);