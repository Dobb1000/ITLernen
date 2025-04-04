PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Players (
    player_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    join_date TEXT NOT NULL
);
INSERT INTO Players VALUES(1,'xXProPvPXx','2022-03-01');
INSERT INTO Players VALUES(2,'BuilderBob','2023-01-15');
INSERT INTO Players VALUES(3,'CreeperQueen','2021-07-20');
CREATE TABLE Games (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    max_players INTEGER NOT NULL
);
INSERT INTO Games VALUES(1,'BedWars',8);
INSERT INTO Games VALUES(2,'SkyWars',12);
INSERT INTO Games VALUES(3,'QuickSG',24);
CREATE TABLE Matches (
    match_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    date TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);
INSERT INTO Matches VALUES(1,1,'2024-01-01',15);
INSERT INTO Matches VALUES(2,1,'2024-01-02',12);
INSERT INTO Matches VALUES(3,2,'2024-01-03',10);
INSERT INTO Matches VALUES(4,3,'2024-01-04',5);
CREATE TABLE Stats (
    stat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    match_id INTEGER,
    kills INTEGER,
    deaths INTEGER,
    won BOOLEAN,
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (match_id) REFERENCES Matches(match_id)
);
INSERT INTO Stats VALUES(1,1,1,5,2,1);
INSERT INTO Stats VALUES(2,2,1,2,4,0);
INSERT INTO Stats VALUES(3,3,2,3,1,1);
INSERT INTO Stats VALUES(4,1,2,6,3,1);
INSERT INTO Stats VALUES(5,2,3,0,2,0);
INSERT INTO Stats VALUES(6,3,4,2,2,1);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Players',3);
INSERT INTO sqlite_sequence VALUES('Games',3);
INSERT INTO sqlite_sequence VALUES('Matches',4);
INSERT INTO sqlite_sequence VALUES('Stats',6);
COMMIT;
