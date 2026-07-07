"use client";

type Props = {
  accept?: string;
  multiple?: boolean;
};

export function useFilePicker({
  accept = "*/*",
  multiple = false,
}: Props = {}) {
  function pickFile(): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = accept;
      input.multiple = multiple;
      input.style.display = "none";

      input.onchange = () => {
        const file = input.files?.[0] ?? null;

        input.remove();

        resolve(file);
      };

      input.oncancel = () => {
        input.remove();

        resolve(null);
      };

      document.body.appendChild(input);

      input.click();
    });
  }

  function pickFiles(): Promise<File[]> {
    return new Promise((resolve) => {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = accept;
      input.multiple = true;
      input.style.display = "none";

      input.onchange = () => {
        const files = Array.from(input.files ?? []);

        input.remove();

        resolve(files);
      };

      input.oncancel = () => {
        input.remove();

        resolve([]);
      };

      document.body.appendChild(input);

      input.click();
    });
  }

  return {
    pickFile,
    pickFiles,
  };
}
