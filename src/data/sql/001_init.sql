CREATE TABLE IF NOT EXISTS guilds (
  id TEXT PRIMARY KEY,
  guild_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  guild_id TEXT,
  FOREIGN KEY (guild_id) REFERENCES guilds(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  guild_id TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (guild_id)  REFERENCES guilds(id)
);

CREATE TABLE IF NOT EXISTS birthdays (
  id        INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  user_id   TEXT NOT NULL UNIQUE,
  date      DATE NOT NULL,
  guild_id  TEXT NOT NULL,
  FOREIGN KEY (user_id)  REFERENCES users(id),
  FOREIGN KEY (guild_id) REFERENCES guilds(id)
);
