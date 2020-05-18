import React, { ReactElement } from "react";
import { IBill, TYPE } from "./api/index";

interface IProps {
  list: IBill[];
  show: boolean;
}
function countAll(list: IBill[], type: TYPE): number {
  return list.reduce((total, current) => {
    if (current.type === type) {
      total += current.amount;
    }
    return total;
  }, 0);
}

export default function BillTotal(props: IProps): ReactElement | null {
  if (!props.show) {
    return null;
  }
  return (
    <tfoot>
      <tr>
        <th>收入总计</th>
        <td colSpan={3}></td>
        <td style={{textAlign: "right"}}>{countAll(props.list, TYPE.income)}</td>
      </tr>
      <tr>
        <th>支出总计</th>
        <td colSpan={3}></td>
        <td style={{textAlign: "right"}}>{countAll(props.list, TYPE.outcome)}</td>
      </tr>
    </tfoot>
  );
}