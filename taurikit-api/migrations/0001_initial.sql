CREATE TABLE IF NOT EXISTS licenses (
  id         TEXT PRIMARY KEY,
  email      TEXT NOT NULL,
  key        TEXT NOT NULL UNIQUE,
  plan       TEXT NOT NULL DEFAULT 'standard',
  active     INTEGER NOT NULL DEFAULT 1,
  stripe_customer_id   TEXT,
  stripe_payment_id    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_used  TEXT
);

CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key);
CREATE INDEX IF NOT EXISTS idx_licenses_email ON licenses(email);
