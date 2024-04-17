DROP DATABASE if EXISTS rampoint;

CREATE DATABASE rampoint;
USE rampoint;


create table peca(

idPeca int primary key auto_increment not null,
modelo varchar (60) not null, 
nome varchar (45) not null,
marca varchar (20) not null,
estado_fisico varchar (4) not null,
pontos int not null


);

insert into peca (idPeca, modelo, nome, marca, estado_fisico, pontos) value
(2, "RTX 4090","Placa de video","Nvidia","Bom", 190);


insert into peca (idPeca, modelo, nome, marca, estado_fisico, pontos) value
(3, "RTX 4090","Placa de video","Nvidia","Bom", 190);


insert into peca (idPeca, modelo, nome, marca, estado_fisico, pontos) value
(4, "RTX 4090","Placa de video","Nvidia","Bom", 190);

/*select idPeca, modelo, nome, marca, estado_fisico, pontos from peca;*/
select idPeca, modelo, nome, marca, estado_fisico, pontos from peca where idPeca = 4;





CREATE TABLE usuario_login(
	
idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
email varchar (100) not null,
senha varchar (100) not null,
nome varchar (100) not null,
cep char (8) not null,
telefone varchar (15),
data_nasci date not null,
estado char (2),
foto_perfil varchar (600),
idPeca int not null,
constraint Pontos_usuario foreign key (idPeca)
	references peca (idPeca)
);


CREATE TABLE adm_login(

idAdm INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
email varchar (100) not null,
senha varchar (100) not null,
nome varchar (100) not null,
cep char (8) not null,
telefone varchar (15),
data_nasci date not null,
estado char (2),
foto_perfil varchar (6000) 
);




