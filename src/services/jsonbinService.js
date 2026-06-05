// JSONBin Cloud Storage Service
// Data lives at jsonbin.io — persists forever, visible to all users globally.

const API_KEY = '$2a$10$Qk/LZznDcd.SCu2kaquIOO/wNO4ArZDHBpjcoOgy94fihyUOzKf5a';
const BASE    = 'https://api.jsonbin.io/v3/b';

// Map filenames → JSONBin bin IDs
const BIN_IDS = {
  'events.json':           '6a22e464da38895dfe8cda09',
  'stories.json':          '6a22e465da38895dfe8cda0a',
  'whatsapp-groups.json':  '6a22e465da38895dfe8cda0b',
  'opportunities.json':    '6a22e465da38895dfe8cda0c',
  'settings.json':         '6a22e465f5f4af5e29be6005',
};

const HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key': API_KEY,
};

/** Fetch the latest data from a bin */
export async function readBin(filename) {
  const id  = BIN_IDS[filename];
  if (!id) throw new Error(`No bin ID for ${filename}`);
  const res = await fetch(`${BASE}/${id}/latest`, { headers: HEADERS });
  if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`);
  const json = await res.json();
  return json.record; // actual data is inside .record
}

/** Overwrite a bin with new data */
export async function writeBin(filename, data) {
  const id  = BIN_IDS[filename];
  if (!id) throw new Error(`No bin ID for ${filename}`);
  const res = await fetch(`${BASE}/${id}`, {
    method:  'PUT',
    headers: HEADERS,
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`);
  return await res.json();
}
