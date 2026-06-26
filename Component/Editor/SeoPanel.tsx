export default function SeoPanel() {
  return (
    <details className="mt-8">
      <summary>SEO Settings</summary>

      <div className="mt-4 space-y-4">
        <input placeholder="Meta Title" className="w-full border p-3 rounded" />

        <textarea
          placeholder="Meta Description"
          className="w-full border p-3 rounded"
        />
      </div>
    </details>
  );
}
