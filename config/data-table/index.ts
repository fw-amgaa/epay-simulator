import { Pickaxe } from "lucide-react";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  featureFlags: [
    {
      label: "Advanced table",
      value: "advancedTable" as const,
      icon: Pickaxe,
      tooltipTitle: "Нарийвчилсан хүснэгт",
      tooltipDescription: "Нарийвчилсан хайлт, эрэмбэлэлт",
    },
    // {
    //   label: "Floating bar",
    //   value: "floatingBar" as const,
    //   icon: SquareSquare,
    //   tooltipTitle: "Toggle floating bar",
    //   tooltipDescription: "A floating bar that sticks to the top of the table.",
    // },
  ],
  textOperators: [
    { label: "Агуулах", value: "iLike" as const },
    { label: "Агуулдаггүй", value: "notILike" as const },
    { label: "Тэнцүү", value: "eq" as const },
    { label: "Тэнцүү биш", value: "ne" as const },
    // { label: 'Is empty', value: 'isEmpty' as const },
    // { label: 'Is not empty', value: 'isNotEmpty' as const },
  ],
  numericOperators: [
    { label: "Тэнцүү", value: "eq" as const },
    { label: "Тэнцүү биш", value: "ne" as const },
    { label: "Is less than", value: "lt" as const },
    { label: "Is less than or equal to", value: "lte" as const },
    { label: "Is greater than", value: "gt" as const },
    { label: "Is greater than or equal to", value: "gte" as const },
    // { label: 'Is empty', value: 'isEmpty' as const },
    // { label: 'Is not empty', value: 'isNotEmpty' as const },
  ],
  dateOperators: [
    { label: "Тэнцүү", value: "eq" as const },
    { label: "Тэнцүү биш", value: "ne" as const },
    { label: ">", value: "lt" as const },
    { label: "<", value: "gt" as const },
    { label: ">=", value: "lte" as const },
    { label: "<=", value: "gte" as const },
    { label: "Хооронд", value: "isBetween" as const },
    // { label: "Is relative to today", value: "isRelativeToToday" as const },
    // { label: 'Is empty', value: 'isEmpty' as const },
    // { label: 'Is not empty', value: 'isNotEmpty' as const },
  ],
  selectOperators: [
    { label: "Тэнцүү", value: "eq" as const },
    { label: "Тэнцүү биш", value: "ne" as const },
    // { label: 'Is empty', value: 'isEmpty' as const },
    // { label: 'Тэнцүү биш empty', value: 'isNotEmpty' as const },
  ],
  booleanOperators: [
    { label: "Тэнцүү", value: "eq" as const },
    { label: "Тэнцүү биш", value: "ne" as const },
  ],
  joinOperators: [
    { label: "And", value: "and" as const },
    { label: "Or", value: "or" as const },
  ],
  sortOrders: [
    { label: "Өсөх", value: "asc" as const },
    { label: "Буурах", value: "desc" as const },
  ],
  columnTypes: [
    "text",
    "number",
    "date",
    "boolean",
    "select",
    "multi-select",
  ] as const,
  globalOperators: [
    "iLike",
    "notILike",
    "eq",
    "ne",
    // 'isEmpty',
    // 'isNotEmpty',
    "lt",
    "lte",
    "gt",
    "gte",
    "isBetween",
    "isRelativeToToday",
    "and",
    "or",
  ] as const,
};
