import React, { ReactElement, useState, useCallback } from "react";
import { TYPE, ICategory, IBill } from "./api/index";

interface IProps {
  categories: ICategory[];
  onAdd(bill: IBill): void;
}

export default function BillAdd({ categories, onAdd }: IProps): ReactElement {
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [type, setType] = useState<TYPE>(TYPE.income);
  const [category, setCategory] = useState<ICategory["id"]>(categories[0]?.id);
  const [amount, setAmount] = useState<string>("");

  const updateTime = useCallback((e) => {
    setTime(e.target.value);
  }, []);

  const updateType = useCallback((e) => {
    setType(+e.target.value);
  }, []);

  const updateAmount = useCallback((e) => {
    setAmount(e.target.value);
  }, []);

  const updateCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const submit = useCallback(
    (e) => {
      e.preventDefault();

      if (!time || amount === "") {
        return;
      }

      onAdd({
        time: Date.parse(time + 'Z'),
        amount: +amount,
        type,
        category,
      });
    },
    [category, amount, type, time, onAdd]
  );

  return (
    <form onSubmit={submit} style={{ marginBottom: "20px" }}>
      <fieldset>
        <legend>添加账单</legend>

        <label>
          日期：
          <input type="datetime-local" value={time} onChange={updateTime} />
        </label>
        <label>
          类型：
          <select value={type} onChange={updateType}>
            <option value={TYPE.outcome}>支出</option>
            <option value={TYPE.income}>收入</option>
          </select>
        </label>
        <label>
          分类:
          <select value={category} onChange={updateCategory}>
            {categories
              .filter((item) => item.type === type)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          金额: <input type="number" value={amount} onChange={updateAmount} />
        </label>
        <button type="submit">添加</button>
      </fieldset>
    </form>
  );
}
