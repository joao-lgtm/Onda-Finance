import AsyncStorage from "@react-native-async-storage/async-storage";

const DB_STORAGE_KEY = "@app:mockdb:v1";


export type UserRow = {
  id: number;
  name: string;
  username: string;
  password: string;
  balanceUsd: number;
  hasBiometrics?: boolean; 
};

const DEFAULT_ROWS: UserRow[] = [
  { id: 1, name: "Alice", username: "alice", password: "1234", balanceUsd: 1500 },
  { id: 2, name: "Bruno", username: "bruno", password: "abcd", balanceUsd: 3200 },
  { id: 3, name: "Carla", username: "carla", password: "senha", balanceUsd: 750 },
  { id: 4, name: "Daniel", username: "daniel", password: "q1w2e3", balanceUsd: 4200 },
];


async function loadDb(): Promise<UserRow[]> {
  const raw = await AsyncStorage.getItem(DB_STORAGE_KEY);


  if (!raw) {
    await AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(DEFAULT_ROWS));
    return [...DEFAULT_ROWS];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as UserRow[];
  } catch {}


  await AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(DEFAULT_ROWS));
  return [...DEFAULT_ROWS];
}

async function persistDb(rows: UserRow[]) {
  await AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(rows));
}

export async function getAllUsers(): Promise<UserRow[]> {
  return loadDb();
}

export async function findUserById(id: number): Promise<UserRow | undefined> {
  const rows = await loadDb();
  return rows.find((r) => r.id === id);
}

export async function findUserByUsername(username: string): Promise<UserRow | undefined> {
  const rows = await loadDb();
  return rows.find((r) => r.username.toLowerCase() === username.toLowerCase());
}


export async function authenticate(username: string, password: string): Promise<UserRow | null> {
  const rows = await loadDb();
  const user = rows.find(
    (r) => r.username.toLowerCase() === username.toLowerCase() && r.password === password
  );
  return user ?? null;
}

export async function updateUser(updated: Partial<UserRow> & { id: number }): Promise<UserRow | undefined> {
  const rows = await loadDb();
  const idx = rows.findIndex((r) => r.id === updated.id);
  if (idx === -1) return undefined;

  const merged = { ...rows[idx], ...updated };
  rows[idx] = merged;

  await persistDb(rows);
  return merged;
}


export async function updateBalance(id: number, newBalanceUsd: number): Promise<UserRow | undefined> {
  return updateUser({ id, balanceUsd: newBalanceUsd });
}


export async function incrementBalance(id: number, delta: number): Promise<UserRow | undefined> {
  const rows = await loadDb();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;

  rows[idx] = { ...rows[idx], balanceUsd: Math.max(rows[idx].balanceUsd + delta, 0) };
  await persistDb(rows);
  return rows[idx];
}


export async function createUser(user: Omit<UserRow, "id">): Promise<UserRow> {
  const rows = await loadDb();
  const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;

  const newRow: UserRow = {
    ...user,
    id: nextId,
    balanceUsd: user.balanceUsd ?? 1000, 
  };

  rows.push(newRow);
  await persistDb(rows);
  return newRow;
}


export async function transferBalance(fromId: number, toUsername: string, amount: number, taxRate = 0.01) {
  const rows = await loadDb();

  const senderIdx = rows.findIndex((r) => r.id === fromId);
  const receiverIdx = rows.findIndex((r) => r.username.toLowerCase() === toUsername.toLowerCase());

  if (senderIdx === -1) throw new Error("Remetente não encontrado");
  if (receiverIdx === -1) throw new Error("Destinatário não encontrado");
  if (senderIdx === receiverIdx) throw new Error("Não é possível transferir para si mesmo");

  const sender = rows[senderIdx];
  const receiver = rows[receiverIdx];

  const tax = amount * taxRate;
  const total = amount + tax;

  if (sender.balanceUsd < total) throw new Error("Saldo insuficiente");

  sender.balanceUsd -= total;
  receiver.balanceUsd += amount;

  rows[senderIdx] = sender;
  rows[receiverIdx] = receiver;

  await persistDb(rows);

  return {
    sender,
    receiver,
    tax,
    total,
  };
}

export async function resetDbToDefaults(): Promise<void> {
  await persistDb([...DEFAULT_ROWS]);
}
