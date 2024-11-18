-- Tabla de Usuaris
CREATE TABLE Usuaris (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_usuari VARCHAR(50) UNIQUE NOT NULL,
    correu_electronic VARCHAR(100) UNIQUE NOT NULL,
    contrasenya VARCHAR(255) NOT NULL,
    punts_actuals INT DEFAULT 0,
    data_registre DATETIME DEFAULT CURRENT_TIMESTAMP --FALTA FECHA DE NACIMIENTO 
);

-- Tabla de Jocs
CREATE TABLE Jocs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    descripcio TEXT,
    min_apuesta INT NOT NULL,
    max_apuesta INT NOT NULL
);

-- Tabla de Partides
CREATE TABLE Partides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    juego_id INT,
    puntos_apostados INT NOT NULL,
    data_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuaris(id),
    FOREIGN KEY (juego_id) REFERENCES Jocs(id)
);

-- Tabla de Resultats
CREATE TABLE Resultats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partida_id INT,
    puntos_ganados INT NOT NULL,
    FOREIGN KEY (partida_id) REFERENCES Partides(id)
);

-- Tabla de Transaccions de Punts 
CREATE TABLE Transaccions_Punts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    cantidad INT NOT NULL,
    tipo ENUM('acumulacion', 'canje') NOT NULL,
    fecha_transaccion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuaris(id)
);

-- Tabla de Premios Canjeables
CREATE TABLE Premios_Canjeables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo_puntos INT NOT NULL,
    stock INT NOT NULL
);

-- Tabla de Canjes de Premios
CREATE TABLE Canjes_Premios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    premio_id INT,
    fecha_canje DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuaris(id),
    FOREIGN KEY (premio_id) REFERENCES Premios_Canjeables(id)
);