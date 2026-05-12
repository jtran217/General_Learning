-- Minimal schema for practicing storing raw audio in SQLite (BLOB).

CREATE TABLE IF NOT EXISTS recordings (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  mime_type  TEXT NOT NULL,
  audio      BLOB NOT NULL
);
