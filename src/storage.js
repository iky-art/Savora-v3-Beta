const DATA_KEY = "savora-v3-data";

function loadData() {

  try {

    const raw = localStorage.getItem(DATA_KEY);

    if (raw) {

      const parsed = JSON.parse(raw);

      return {
        transactions: parsed.transactions || [],
        goals: parsed.goals || [],
        budgets: parsed.budgets || []
      };

    }

  } catch {
    /* abaikan, pakai default */
  }

  return { transactions: [], goals: [], budgets: [] };

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
  saveData({ transactions: [], goals: [], budgets: [] });
}

export function formatCurrency(value) {

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value || 0);

}

/* ==========================================
   BUDGETS
========================================== */

export function getBudgets() {
  return loadData().budgets;
}

export function addBudget({ category, limit }) {

  const data = loadData();

  const exists = data.budgets.find(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );

  if (exists) {

    exists.limit = Number(limit);

  } else {

    data.budgets.unshift({
      id: generateId(),
      category,
      limit: Number(limit)
    });

  }

  saveData(data);

  return data.budgets;

}

export function removeBudget(id) {

  const data = loadData();

  data.budgets = data.budgets.filter((b) => b.id !== id);

  saveData(data);

  return data.budgets;

}

export function budgetSpent(category) {

  return getTransactionsByType("expense")
    .filter((t) => t.category?.toLowerCase() === category.toLowerCase())
    .reduce((sum, t) => sum + Number(t.amount), 0);

}

/* ==========================================
   EXPORT / IMPORT DATA
========================================== */

export function exportData() {
  return JSON.stringify(loadData(), null, 2);
}

export function importData(jsonString) {

  try {

    const parsed = JSON.parse(jsonString);

    const safe = {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
      budgets: Array.isArray(parsed.budgets) ? parsed.budgets : []
    };

    saveData(safe);

    return { ok: true };

  } catch {

    return { ok: false, message: "File tidak valid." };

  }

}

/* ==========================================
   ANNOUNCEMENT (Admin)
========================================== */

const ANNOUNCEMENT_KEY = "savora-v3-announcement";

export function getAnnouncement() {

  try {
    return localStorage.getItem(ANNOUNCEMENT_KEY) || "";
  } catch {
    return "";
  }

}

export function setAnnouncement(text) {

  try {

    if (text) {
      localStorage.setItem(ANNOUNCEMENT_KEY, text);
    } else {
      localStorage.removeItem(ANNOUNCEMENT_KEY);
    }

  } catch {
    /* abaikan */
  }

}

/* ==========================================
   APP STATS (Admin)
========================================== */

export function getAppStats() {

  const data = loadData();

  const storageSize = (() => {

    try {

      const raw = localStorage.getItem(DATA_KEY) || "";

      return new Blob([raw]).size;

    } catch {

      return 0;

    }

  })();

  return {
    totalTransactions: data.transactions.length,
    totalGoals: data.goals.length,
    totalBudgets: data.budgets.length,
    totalSavedInGoals: data.goals.reduce((sum, g) => sum + Number(g.saved || 0), 0),
    storageSizeKB: (storageSize / 1024).toFixed(2)
  };

}
