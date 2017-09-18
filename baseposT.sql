CREATE TABLE Users(
	id serial NOT NULL,
	username varchar(255),
        name varchar(255),
   	PRIMARY KEY (id)
);


CREATE TABLE Stories(
	id serial NOT NULL,
	user_id int NOT NULL,
        title varchar(255),
        description varchar(255),
        credits varchar(255),
        FOREIGN KEY (user_id) REFERENCES Users(id),
        PRIMARY KEY (id)
);

CREATE TABLE Imagens(
	id serial NOT NULL,
	stories_id int NOT NULL,
        src varchar(255),
        FOREIGN KEY (stories_id) REFERENCES Stories(id),
        PRIMARY KEY (id)
);

CREATE TABLE Audios(
	id serial NOT NULL,
	stories_id int NOT NULL,
        src varchar(255),
        FOREIGN KEY (stories_id) REFERENCES Stories(id),
        PRIMARY KEY (id)
);

CREATE TABLE Questions(
	id serial NOT NULL,
	stories_id int NOT NULL,
        question varchar(255),
        answer varchar(255),
        FOREIGN KEY (stories_id) REFERENCES Stories(id),
        PRIMARY KEY (id)
);

CREATE TABLE imagensQuestions(
	id serial NOT NULL,
	question_id int NOT NULL,
        src varchar(255),
        FOREIGN KEY (question_id) REFERENCES Questions(id),
        PRIMARY KEY (id)
);

INSERT INTO Users ( username,name) VALUES
('Yan','Yander');
INSERT INTO Users ( username,name) VALUES
('Kei','Keila');
INSERT INTO Users ( username,name) VALUES
('Wal','Walter');

INSERT INTO Stories ( user_id,title,description,credits) VALUES
(1,'Mi bella Genio','Romance','Gatitos');
INSERT INTO Stories ( user_id,title,description,credits) VALUES
(2,'El leon y el zorro','basado en hechos reales','Gatitos');
INSERT INTO Stories ( user_id,title,description,credits) VALUES
(3,'El zorro y el queso','un pajaro en busca de un amigo','Gatitos');


INSERT INTO Imagens(stories_id,src) VALUES
(1,'../imagenes/historias/0.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(1,'../imagenes/historias/b1.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(1,'../imagenes/historias/b2.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(1,'../imagenes/historias/b3.jpg');


INSERT INTO Audios(stories_id,src) VALUES
(1,'../imagenes/historias/g1.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(1,'../imagenes/historias/g2.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(1,'../imagenes/historias/g3.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(1,'../imagenes/historias/g4.mp3');


INSERT INTO Questions(stories_id,question,answer) VALUES
(1,'Donde besa Jennie al mayor Nelson?','2');

INSERT INTO imagensQuestions(question_id,src) VALUES
(1,'../imagenes/historias/b1.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(1,'../imagenes/historias/b2.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(1,'../imagenes/historias/b3.jpg');


INSERT INTO Imagens(stories_id,src) VALUES
(2,'../imagenes/historias/l1.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(2,'../imagenes/historias/l2.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(2,'../imagenes/historias/l3.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(2,'../imagenes/historias/l4.jpg');


INSERT INTO Audios(stories_id,src) VALUES
(2,'../imagenes/historias/al1.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(2,'../imagenes/historias/al2.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(2,'../imagenes/historias/al3.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(2,'../imagenes/historias/al4.mp3');


INSERT INTO Questions(stories_id,question,answer) VALUES
(2,'Donde atrapan al leon?','1');


INSERT INTO imagensQuestions(question_id,src) VALUES
(2,'../imagenes/historias/l2.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(2,'../imagenes/historias/l4.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(2,'../imagenes/historias/l5.jpg');

INSERT INTO Questions(stories_id,question,answer) VALUES
(2,'en cual el leon esta soñando?','1');


INSERT INTO imagensQuestions(question_id,src) VALUES
(3,'../imagenes/historias/l2.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(3,'../imagenes/historias/l1.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(3,'../imagenes/historias/l5.jpg');

INSERT INTO Imagens(stories_id,src) VALUES
(3,'../imagenes/historias/1.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(3,'../imagenes/historias/2.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(3,'../imagenes/historias/3.jpg');
INSERT INTO Imagens(stories_id,src) VALUES
(3,'../imagenes/historias/4.jpg');

INSERT INTO Audios(stories_id,src) VALUES
(3,'../imagenes/historias/1.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(3,'../imagenes/historias/2.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(3,'../imagenes/historias/7.mp3');
INSERT INTO Audios(stories_id,src) VALUES
(3,'../imagenes/historias/8.mp3');

INSERT INTO Questions(stories_id,question,answer) VALUES
(3,'Cual es el zorro?','2');

INSERT INTO imagensQuestions(question_id,src) VALUES
(4,'../imagenes/historias/1.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(4,'../imagenes/historias/3.jpg');
INSERT INTO imagensQuestions(question_id,src) VALUES
(4,'../imagenes/historias/4.jpg');