import React, { ReactElement, useState, useEffect, useCallback } from "react";
import {
  getBillList,
  getCategories,
  IBill,
  ICategory,
  ORDER,
} from "./api/index";
import Bill from "./Bill";
import BillTotal from "./BillTotal";
import BillAdd from "./BillAdd";
let categories = getCategories();

function BillTable(): ReactElement {
  const [list, setList] = useState<IBill[]>([]);
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState<ICategory["id"]>("");
  const [order, setOrder] = useState<ORDER>(ORDER.default);

  const updateCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  useEffect(() => {
    const list = getBillList(month, category, order);
    setList(list);
  }, [month, category, order]);

  const addBill = useCallback((bill: IBill) => {
    setList((prevList) => [...prevList, bill]);
  }, []);

  const changeMonth = useCallback((e) => {
    setMonth(e.target.value);
  }, []);

  const clearFilter = useCallback((e) => {
    setMonth("");
    setCategory("");
    setOrder(ORDER.default);
  }, []);

  return (
    <div>
      <BillAdd onAdd={addBill} categories={categories} />

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          过滤月份：
          <input
            name="month"
            type="month"
            value={month}
            onChange={changeMonth}
          />
        </label>
        <label>
          分类:
          <select value={category} onChange={updateCategory}>
            <option value="">所有</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={clearFilter}>清除</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>账单时间</th>
            <th>账单类型</th>
            <th>账单分类</th>
            <th>
              账单金额{" "}
              <button onClick={() => setOrder(ORDER.desc)}>
                降序
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((i, index) => (
            <Bill
              key={i.type + i.time + i.category + i.amount}
              index={index}
              categories={categories}
              type={i.type}
              time={i.time}
              category={i.category}
              amount={i.amount}
            />
          ))}
        </tbody>
        <BillTotal list={list} show={!!month || !!category} />
      </table>
    </div>
  );
}

export default BillTable;
