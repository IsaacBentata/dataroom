"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <Download className="size-4" data-icon="inline-start" />
      Download all raw data
    </Button>
  );
}
