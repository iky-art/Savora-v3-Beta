import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { PlusIcon, TrashIcon } from "../components/icons.jsx";
import {
  getTransactions,
  addTransaction,
  removeTransaction,
  formatCurrency
} from "../storage.js";

const TYPE_LABEL = {
  income: "Pemasukan",
  expense: "Pengeluaran",
  saving: "Tabungan"
};

export default function Transactions() {

  const [list, setList] = useState(getTransactions);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setList(getTransactions());
  }, []);

  function handleAdd(e) {

    e.preventDefault();

    if (!title || !amount) return;

    const updated = addTransaction({ title, amount, type, category });

    setList(updated);
    setTitle("");
    setAmount("");
    setCategory("");

  }

  function handleRemove(id) {
    setList(removeTransaction(id));
  }

  return (
    <div className="page">

      <PageHeader title="Transaksi" subtitle="Catat pemasukan & pengeluaranmu" />

      <form className="finance-form" onSubmit={handleAdd}>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul transaksi"
          className="task-input"
          required
        />

        <div className="form-row">

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Jumlah"
            className="task-input"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="task-input"
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
            <option value="saving">Tabungan</option>
          </select>

        </div>

        <div className="form-row">

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Kategori (opsional)"
            className="task-input"
          />

          <button type="submit" className="task-add-btn" aria-label="Tambah">
            <PlusIcon width={20} height={20} />
          </button>

        </div>

      </form>

      <div className="task-list">

        {list.length === 0 && (
          <p className="empty-state">Belum ada transaksi. Tambahkan di atas ✍️</p>
        )}

        {list.map((item) => (
          <div key={item.id} className="finance-item">

            <div className={`finance-tag finance-tag-${item.type}`}>
              {TYPE_LABEL[item.type]}
            </div>

            <div className="finance-item-body">
              <p className="finance-item-title">{item.title}</p>
              <span className="finance-item-category">{item.category}</span>
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
