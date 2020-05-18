import bill from "../data/bill.json";
import categories from "../data/categories.json";

export enum TYPE {
  income = 1,
  outcome = 0,
}

export enum ORDER {
  desc = 1,
  asc = 2,
  default = 0
}

export interface IBill {
  type: TYPE;
  time: number;
  category: ICategory["id"];
  amount: number;
}

export interface ICategory {
  id: string;
  type: TYPE;
  name: string;
}

export function getBillList(month = "", category: ICategory["id"] = "", order: ORDER): IBill[] {
  const list = bill
    .filter((i) => {
      if (!month) {
        return true;
      }
      const time = new Date(i.time);
      if (`${time.getFullYear()}-${pad(time.getMonth())}` === month) {
        return true;
      } else {
        return false;
      }
    })
    .filter((item) => {
      if (!category) {
        return true;
      }
      return item.category === category;
    });

  if (order !== ORDER.default) {
    return list.sort((a, b) => {
      if (order === ORDER.desc) {
        return getAmount(a) - getAmount(b);
      } else {
        return getAmount(b) - getAmount(a);
      }
    });
  } else {
    return list;
  }

}

function getAmount(bill: IBill) {
  if (bill.type === TYPE.income) {
    return bill.amount;
  } else {
    return -bill.amount;
  }
}
export function getCategories(): ICategory[] {
  return categories;
}

function pad(n: number): string | number {
  return n < 10 ? "0" + n : n;
}
