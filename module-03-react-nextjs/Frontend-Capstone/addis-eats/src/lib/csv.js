// Day 47 — CSV export

export function toCsv(rows) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);

  const cell = (value) => {
    const text = String(value ?? "");

    return /[",\n]/.test(text)
      ? `"${text.replace(/"/g, '""')}"`
      : text;
  };

  return [
    headers.map(cell).join(","),
    ...rows.map((row) =>
      headers.map((key) => cell(row[key])).join(",")
    ),
  ].join("\n");
}

export function downloadCsv(text, filename) {
  const blob = new Blob([text], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}