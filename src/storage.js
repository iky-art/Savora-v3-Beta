const DATA_KEY = "savora-v3-data";

function loadData() {

  try {

    const raw = localStorage.getItem(DATA_KEY);

    if (raw) return JSON.parse(raw);

  } catch {
    /* abaikan, pakai default */
  }

  return { transactions: [], goals: [] };

}

function saveData(data) {

  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  } catch {
    /* localStorage tidak tersedia, abaikan */
  }

}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ==========================================
   TRANSACTIONS
========================================== */

export function getTransactions() {
  return loadData().transactions;
}

export function addTransaction({ title, amount, type, category }) {

  const data = loadData();

  data.transactions.unshift({
    id: generateId(),
    title,
    amount: Number(amount),
    type,
    category: category || "Lainnya",
    createdAt: new Date().toISOString()
  });

  saveData(data);

  return data.transactions;

}

export function removeTransaction(id) {

  const data = loadData();

  data.transactions = data.transactions.filter((t) => t.id !== id);

  saveData(data);

  return data.transactions;

}

export function getTransactionsByType(type) {
  return getTransactions().filter((t) => t.type === type);
}

export function calculateSummary() {

  const transactions = getTransactions();

  const summary = { income: 0, expense: 0, saving: 0 };

  transactions.forEach((t) => {
    if (summary[t.type] !== undefined) {
      summary[t.type] += Number(t.amount);
    }
  });

  summary.balance = summary.income - summary.expense;

  return summary;

}

/* ==========================================
   GOALS
========================================== */

export function getGoals() {
  return loadData().goals;
}

export function addGoal({ name, target }) {

  const data = loadData();

  data.goals.unshift({
    id: generateId(),
    name,
    target: Number(target),
    saved: 0,
    createdAt: new Date().toISOString()
  });

  saveData(data);

  return data.goals;

}

export function removeGoal(id) {

  const data = loadData();

  data.goals = data.goals.filter((g) => g.id !== id);

  saveData(data);

  return data.goals;

}

export function goalProgress(goal) {

  if (!goal.target) return 0;

  return Math.min(100, Math.round((goal.saved / goal.target) * 100));

}

/* ==========================================
   RESET
========================================== */

export function resetFinanceData() {
  saveData({ transactions: [], goals: [] });
}

export function formatCurrency(value) {

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value || 0);

}
