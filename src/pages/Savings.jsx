import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { PiggyIcon, TrashIcon } from "../components/icons.jsx";
import {
  getTransactionsByType,
  addTransaction,
  removeTransaction,
  formatCurrency
} from "../storage.js";

export default function Savings() {

  const [list, setList] = useState(() => getTransactionsByType("saving"));
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setList(getTransactionsByType("saving"));
  }, []);

  const total = list.reduce((sum, item) => sum + Number(item.amount), 0);

  function handleAdd(e) {

    e.preventDefault();

    if (!name || !amount) return;

    addTransaction({
      title: name,
      amount,
      type: "saving",
      category: "Tabungan"
    });

    setList(getTransactionsByType("saving"));
    setName("");
    setAmount("");

  }

  function handleRemove(id) {
    removeTransaction(id);
    setList(getTransactionsByType("saving"));
  }

  return (
    <div className="page">

      <PageHeader title="Tabungan" subtitle="Pantau semua tabunganmu" />

      <div className="savings-summary">

        <span className="savings-summary-icon">
          <PiggyIcon width={26} height={26} />
        </span>

        <div>
          <p className="savings-summary-label">Total Tabungan</p>
          <h2 className="savings-summary-value">{formatCurrency(total)}</h2>
          <span className="settings-hint">{list.length} setoran</span>
        </div>

      </div>

      <form className="finance-form" onSubmit={handleAdd}>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama tabungan, contoh: Dana Darurat"
          className="task-input"
          required
        />

        <div className="form-row">

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Jumlah setoran"
            className="task-input"
            required
          />

          <button type="submit" className="btn btn-primary">
            Simpan
          </button>

        </div>

      </form>

      <div className="task-list">

        {list.length === 0 && (
          <p className="empty-state">Belum ada tabungan. Mulai dari sekarang 💜</p>
        )}

        {list.map((item) => (
          <div key={item.id} className="finance-item">

            <div className="finance-tag finance-tag-saving">Tabungan</div>

            <div className="finance-item-body">
              <p className="finance-item-title">{item.title}</p>
            </div>

            <div className="finance-item-right">
              <strong>{formatCurrency(item.amount)}</strong>

              <button
                type="button"
                className="task-delete"
                onClick={() => handleRemove(item.id)}
                aria-label="Hapus"
              >
                <TrashIcon width={16} height={16} />
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );

}
