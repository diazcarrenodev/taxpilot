import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">TaxPilot</h1>
      <p className="mt-2 text-zinc-600">
        MVP para organizar documentos y preparar Renta PN.
      </p>

      <div className="mt-6">
        <Link
          href="/checklist"
          className="inline-flex rounded-xl border px-4 py-2 hover:bg-zinc-50"
        >
          Ir al Checklist
        </Link>
      </div>
    </main>
  );
}