import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { TargetIcon, TrashIcon, PlusIcon } from "../components/icons.jsx";
import { getGoals, addGoal, removeGoal, goalProgress, formatCurrency } from "../storage.js";

export default function Goals() {

  const [goals, setGoals] = useState(getGoals);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  function handleAdd(e) {

    e.preventDefault();

    if (!name || !target) return;

    setGoals(addGoal({ name, target }));
    setName("");
    setTarget("");

  }

  function handleRemove(id) {
    setGoals(removeGoal(id));
  }

  return (
    <div className="page">

      <PageHeader title="Target Tabungan" subtitle="Capai tujuan finansialmu" />

      <form className="finance-form" onSubmit={handleAdd}>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama target, contoh: Beli Laptop"
          className="task-input"
          required
        />

        <div className="form-row">

          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target nominal"
            className="task-input"
            required
          />

          <button type="submit" className="task-add-btn" aria-label="Tambah">
            <PlusIcon width={20} height={20} />
          </button>

        </div>

      </form>

      <div className="task-list">

        {goals.length === 0 && (
          <p className="empty-state">Belum ada target. Yuk buat yang pertama 🎯</p>
        )}

        {goals.map((goal) => {

          const progress = goalProgress(goal);

          return (
            <div key={goal.id} className="goal-card">

              <div className="goal-card-head">

                <span className="settings-icon">
                  <TargetIcon width={18} height={18} />
                </span>

                <div className="goal-card-info">
                  <p className="finance-item-title">{goal.name}</p>
                  <span className="settings-hint">
                    {formatCurrency(goal.saved)} / {formatCurrency(goal.target)}
                  </span>
                </div>

                <button
                  type="button"
                  className="task-delete"
                  onClick={() => handleRemove(goal.id)}
                  aria-label="Hapus target"
                >
                  <TrashIcon width={16} height={16} />
                </button>

              </div>

              <div className="goal-progress-track">
                <div
                  className="goal-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="goal-progress-label">{progress}%</span>

            </div>
          );

        })}

      </div>

    </div>
  );

}
