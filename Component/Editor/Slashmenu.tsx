"use client";

interface Props {
  command: (type: string) => void;
}

export default function SlashMenu({ command }: Props) {
  return (
    <div
      className="
        rounded-lg
        border
        bg-white
        shadow-lg
        p-2
        w-64
      "
    >
      <button
        className="block w-full text-left p-2"
        onClick={() => command("h1")}
      >
        Heading 1
      </button>

      <button
        className="block w-full text-left p-2"
        onClick={() => command("h2")}
      >
        Heading 2
      </button>

      <button
        className="block w-full text-left p-2"
        onClick={() => command("h3")}
      >
        Heading 3
      </button>

      <button
        className="block w-full text-left p-2"
        onClick={() => command("ul")}
      >
        Bullet List
      </button>

      <button
        className="block w-full text-left p-2"
        onClick={() => command("ol")}
      >
        Ordered List
      </button>

      <button
        className="block w-full text-left p-2"
        onClick={() => command("image")}
      >
        Image
      </button>
    </div>
  );
}
