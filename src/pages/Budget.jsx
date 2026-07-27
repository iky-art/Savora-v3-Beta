import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { BudgetIcon, TrashIcon, PlusIcon } from "../components/icons.jsx";
import {
  getBudgets,
  addBudget,
  removeBudget,
  budgetSpent,
  formatCurrency
} from "../storage.js";

export default function Budget() {

  const [budgets, setBudgets] = useState(getBudgets);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    setBudgets(getBudgets());
  }, []);

  function handleAdd(e) {

    e.preventDefault();

    if (!category || !limit) return;

    setBudgets(addBudget({ category, limit }));
    setCategory("");
    setLimit("");

  }

  function handleRemove(id) {
    setBudgets(removeBudget(id));
  }

  return (
    <div className="page">

      <PageHeader title="Anggaran" subtitle="Batasi pengeluaran per kategori" />

      <form className="finance-form" onSubmit={handleAdd}>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori, contoh: Makanan"
          className="task-input"
          required
        />

        <div className="form-row">

          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Batas anggaran"
            className="task-input"
            required
          />

          <button type="submit" className="task-add-btn" aria-label="Tambah">
            <PlusIcon width={20} height={20} />
          </button>

        </div>

      </form>

      <div className="task-list">

        {budgets.length === 0 && (
          <p className="empty-state">
            Belum ada anggaran. Atur batas pengeluaranmu di sini 📊
          </p>
        )}

        {budgets.map((budget) => {

          const spent = budgetSpent(budget.category);
          const percent = Math.min(100, Math.round((spent / budget.limit) * 100));
          const over = spent > budget.limit;

          return (
            <div key={budget.id} className="goal-card">

              <div className="goal-card-head">

                <span className="settings-icon">
                  <BudgetIcon width={18} height={18} />
                </span>

                <div className="goal-card-info">
                  <p className="finance-item-title">{budget.category}</p>
                  <span className="settings-hint">
                    {formatCurrency(spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>

                <button
                  type="button"
                  className="task-delete"
                  onClick={() => handleRemove(budget.id)}
                  aria-label="Hapus anggaran"
                >
                  <TrashIcon width={16} height={16} />
                </button>

              </div>

              <div className="goal-progress-track">
                <div
                  className="goal-progress-bar"
                  style={{
                    width: `${percent}%`,
                    background: over ? "var(--danger)" : undefined
                  }}
                />
              </div>

              <span className={`goal-progress-label ${over ? "budget-over" : ""}`}>
                {over ? "Melebihi anggaran!" : `${percent}%`}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );

}
