CREATE DATABASE IF NOT EXISTS CognitoDB;

USE CognitoDB;

CREATE TABLE IF NOT EXISTS Paciente(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    observaciones TEXT
);

INSERT INTO Paciente(nombre, apellidos, fecha_nacimiento, sexo, observaciones) VALUES
('Juan', 'Perez', '1990-01-01', 'M', 'Sin observaciones'),
('Maria', 'Gonzalez', '1995-02-02', 'F', 'Sin observaciones'),
('Pedro', 'Lopez', '2000-03-03', 'M', 'Sin observaciones'),
('Ana', 'Martinez', '2005-04-04', 'F', 'Sin observaciones');

