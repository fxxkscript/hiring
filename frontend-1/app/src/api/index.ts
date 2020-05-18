import bill from "../data/bill.json";
import categories from "../data/categories.json";

export enum TYPE {
  income = 1,
  outcome = 0,
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

export function getBillList(month = "", category = ""): IBill[] {
  return bill
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
}

export function getCategories(): ICategory[] {
  return categories;
}

function pad(n: number): string | number {
  return n < 10 ? "0" + n : n;
}
