const bankMap: Record<string, { name: string; color: string }> = {
  "0001": { name: "Монголбанк", color: "#FF33A8" },
  "0003": { name: "Капитал банк ЭХА", color: "#33FF57" },
  "0004": { name: "Худалдаа хөгжлийн банк", color: "#3366FF" },
  "0005": { name: "Хаан банк", color: "#16A085" },
  "0015": { name: "Голомт банк", color: "#8E44AD" },
  "0018": { name: "Хадгаламж банк ЭХА", color: "#FFC300" },
  "0019": { name: "Тээвэр хөгжлийн банк", color: "#3498DB" },
  "0021": { name: "Ариг банк", color: "#2ECC71" },
  "0024": { name: "Зоос банк", color: "#E74C3C" },
  "0025": { name: "Анод банк", color: "#F39C12" },
  "0029": { name: "Үндэсний хөрөнгө оруулалтын банк", color: "#16A085" },
  "0030": { name: "Капитрон банк", color: "#D35400" },
  "0032": { name: "Хас банк", color: "#E67E22" },
  "0033": { name: "Чингис хаан банк", color: "#27AE60" },
  "0034": { name: "Төрийн банк", color: "#2980B9" },
  "0036": { name: "Хөгжлийн банк", color: "#C0392B" },
  "0038": { name: "Богд банк", color: "#8E44AD" },
  "0039": { name: "М банк", color: "#F1C40F" },
  "0050": { name: "Мобифинанс ББСБ", color: "#7D3C98" },
  "0051": { name: "Хай пэймэнт солюшнс", color: "#34495E" },
  "0052": { name: "Ард кредит ББСБ", color: "#9B59B6" },
  "0053": { name: "Инвескор Хэтэвч ББСБ", color: "#1ABC9C" },
  "0054": { name: "Нэткапитал Финанс Корпораци ББСБ", color: "#E84393" },
  "0055": { name: "Дата бэйнк", color: "#2E4053" },
  "0056": { name: "360 Файнанс ББСБ", color: "#A569BD" },
  "0057": { name: "Супер ап хэтэвч", color: "#E74C3C" },
  "0058": { name: "Токи ББСБ", color: "#3498DB" },
  "0059": { name: "Сэнд Эм Эн ББСБ", color: "#F39C12" },
  "0090": { name: "Сангийн яам (Төрийн сан)", color: "#FF5733" },
  "0094": { name: "Монголын үнэт цаасны клирингийн төв", color: "#D35400" },
  "0095": { name: "Үнэт цаасны төвлөрсөн хадгаламжийн төв", color: "#7D3C98" },
  "0201": { name: "Бонум", color: "#27AE60" },
  "0202": { name: "KKTT", color: "#2980B9" },
};

// Get bank name by code
export const getBankName = (code: string): string =>
  bankMap[code]?.name || "Unknown";

// Get bank color by code
export const getBankColor = (code: string): string =>
  bankMap[code]?.color || "#BDC3C7"; // Default gray color if not found

// Bank options with color
export const bankOptions = Object.entries(bankMap).map(
  ([code, { name, color }]) => ({
    value: code,
    label: name,
    color,
  })
);
