import React from "react";

import { IBill, TYPE, ICategory } from "./api/index";

interface IProps extends IBill {
  index: number;
  categories: ICategory[]
}

export default function Bill({ index, type, time, category, amount, categories }: IProps) {
  return (
    <tr>
      <th>{index}</th>
      <td>{formatTime(time)}</td>
      <td>{formatType(type)}</td>
      <td>{formatCategory(categories, category)?.name}</td>
      <td style={{textAlign: "right"}}>{amount}</td>
    </tr>
  );
}

function formatTime(time: number) {
  return new Date(time).toISOString();
}

function formatType(type: TYPE) {
  if (type === TYPE.income) {
    return "收入";
  } else {
    return "支出";
  }
}
function formatCategory(categories: ICategory[], category: IBill["category"]): ICategory | undefined {
  return categories.find((item) => item.id === category);
}
