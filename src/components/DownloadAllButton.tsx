"use client";

interface DataSet {
  name: string;
  data: Record<string, string | number>[];
}

interface DownloadAllButtonProps {
  datasets: DataSet[];
  filename?: string;
}

function datasetToCSV(data: Record<string, string | number>[]): string {
  if (!data.length) return "";
  const keys = Object.keys(data[0]);
  return [
    keys.join(","),
    ...data.map((row) => keys.map((k) => {
      const val = row[k];
      const str = String(val);
      return str.includes(",") ? `"${str}"` : str;
    }).join(",")),
  ].join("\n");
}

export default function DownloadAllButton({ datasets, filename = "data-export" }: DownloadAllButtonProps) {
  const handleDownload = () => {
    // Combine all datasets into one CSV with section headers
    const sections = datasets.map((ds) => {
      return `# ${ds.name}\n${datasetToCSV(ds.data)}`;
    });
    const combined = sections.join("\n\n");
    const blob = new Blob([combined], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-foreground-secondary hover:text-foreground border border-border rounded-lg hover:bg-surface transition-colors cursor-pointer"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
      Download all raw data
    </button>
  );
}
