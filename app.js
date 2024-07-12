import { NodeType, parse } from "node-html-parser";
import GoldBarInfo from "./GoldBarInfo.js";

const getUrl = () => {
  const goldBarsPricesOnCurrentDayUrl = new URL(
    "index1.jsp",
    "https://www.nbkr.kg/"
  );

  goldBarsPricesOnCurrentDayUrl.searchParams.set("item", 2747);
  goldBarsPricesOnCurrentDayUrl.searchParams.set("lang", "RUS");

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  goldBarsPricesOnCurrentDayUrl.searchParams.set("begin_day", currentDay);
  goldBarsPricesOnCurrentDayUrl.searchParams.set("begin_month", currentMonth);
  goldBarsPricesOnCurrentDayUrl.searchParams.set("begin_year", currentYear);

  goldBarsPricesOnCurrentDayUrl.searchParams.set("end_day", currentDay);
  goldBarsPricesOnCurrentDayUrl.searchParams.set("end_month", currentMonth);
  goldBarsPricesOnCurrentDayUrl.searchParams.set("end_year", currentYear);

  return goldBarsPricesOnCurrentDayUrl.toString();
};

const formatToDisplay = (value) => value.trim();

const response = await fetch(getUrl());
const responseHtml = await response.text();

const htmlDom = parse(responseHtml);

const tableRows = htmlDom.querySelectorAll("table tr");
const goldBarsInfos = [];

for (const row of tableRows.slice(1)) {
  const columns = row.childNodes.filter(
    (node) => node.nodeType === NodeType.ELEMENT_NODE
  );

  goldBarsInfos.push(
    new GoldBarInfo(
      formatToDisplay(columns[1].innerText),
      formatToDisplay(columns[2].innerText),
      formatToDisplay(columns[3].innerText)
    )
  );
}

console.log(goldBarsInfos);
