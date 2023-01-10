PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE utxos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  txid TEXT NOT NULL,
  vout INTEGER NOT NULL,
  height INTEGER NOT NULL,
  address TEXT NOT NULL,
  amount TEXT NOT NULL
);
INSERT INTO utxos VALUES(1,'54718de1f38ad748d02cf40c72c1c1dc09d5ef7c8637a50a55fd2cd669b4f889',0,1,'ybse6msf1tq1Fvas177BNRJwcXgDq9EBym','420000000');


DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('utxos',1);
CREATE UNIQUE INDEX idx_utxos_utxo ON utxos (txid, vout);
CREATE INDEX idx_utxos_adderss ON utxos (address);
COMMIT;
