import AsyncStorage from "@react-native-async-storage/async-storage";

export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  tax: number;
  total: number;
  date: string;
};

const STORAGE_KEY = "@app:transactions";

let transactions: Transaction[] = [];

// 🔹 Garante que sempre que for chamado, os dados estejam atualizados
async function ensureTransactionsLoaded() {
  if (transactions.length === 0) {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    transactions = data ? JSON.parse(data) : [];
  }
}

export async function saveTransactionsToStorage() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function generateTransactionId() {
  return (
    "TX-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
}

export async function addTransaction(tx: Transaction) {
  await ensureTransactionsLoaded();
  transactions.push(tx);
  await saveTransactionsToStorage();
  return tx;
}

export async function getUserTransactions(username: string) {
  await ensureTransactionsLoaded(); // ✅ sempre carrega antes
  return transactions.filter(
    (tx) => tx.from === username || tx.to === username
  );
}

export async function clearTransactions() {
  transactions = [];
  await AsyncStorage.removeItem(STORAGE_KEY);
}
