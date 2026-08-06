-- Migration number: 0002
-- Create memories table for D1OS Memory System

CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    message TEXT NOT NULL,

    title TEXT,

    tag TEXT,

    tags TEXT,

    category TEXT,

    priority INTEGER DEFAULT 0,

    favorite INTEGER DEFAULT 0,

    summary TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
