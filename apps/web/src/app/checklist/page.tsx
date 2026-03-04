"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { BASE_DOCUMENTS } from "@/lib/documents";
import type { DocStatus, DocumentItem, Profile } from "@/lib/documents";

import {
  loadChecklist,
  saveChecklist,
  loadProfile,
  saveProfile,
  type ChecklistState,
} from "@/lib/storage";

function statusLabel(s: DocStatus) {
  if (s === "received") return "Recibido";
  if (s === "needs_review") return "Ilegible / Revisar";
  return "Pendiente";
}

export default function ChecklistPage() {
  const [state, setState] = useState<ChecklistState>({});
  const [profile, setProfile] = useState<Profile>("employee");

  useEffect(() => {
    setState(loadChecklist());
  }, []);

  useEffect(() => {
  setProfile(loadProfile());
}, []);

useEffect(() => {
  saveProfile(profile);
}, [profile]);

  useEffect(() => {
    saveChecklist(state);
  }, [state]);
  
  const visibleDocuments = useMemo(() => {
    return BASE_DOCUMENTS.filter((d) => !d.profiles || d.profiles.includes(profile));
  }, [profile]);

  const stats = useMemo(() => {
    let received = 0, pending = 0, review = 0;
    for (const d of visibleDocuments) {
      const s = state[d.id] ?? "pending";
      if (s === "received") received++;
      else if (s === "needs_review") review++;
      else pending++;
    }
    return { received, pending, review, total: visibleDocuments.length };
  }, [state, visibleDocuments]);

  function setStatus(id: string, s: DocStatus) {
    setState((prev) => ({ ...prev, [id]: s }));
  }

  function reset() {
    setState({});
    setProfile("employee");
  }

  return (
  <div className="min-h-screen bg-white text-zinc-900">
    <div className="mx-auto max-w-3xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">TaxPilot — Checklist (Renta PN)</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Marca el estado de cada documento. Se guarda automáticamente en tu navegador.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-zinc-600">Perfil:</span>
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as Profile)}
              className="rounded-xl border px-3 py-2 text-sm"
            >
              <option value="employee">Empleado</option>
              <option value="independent">Independiente</option>
              <option value="mixed">Mixto</option>
            </select>
          </div>
        </div>

        <button
          onClick={reset}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50"
        >
          Reset
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-3 rounded-2xl border p-4">
        <div className="col-span-4 text-sm text-zinc-600">Progreso</div>

        <div className="rounded-xl bg-zinc-50 p-3">
          <div className="text-xs text-zinc-600">Recibidos</div>
          <div className="text-xl font-semibold">{stats.received}</div>
        </div>

        <div className="rounded-xl bg-zinc-50 p-3">
          <div className="text-xs text-zinc-600">Pendientes</div>
          <div className="text-xl font-semibold">{stats.pending}</div>
        </div>

        <div className="rounded-xl bg-zinc-50 p-3">
          <div className="text-xs text-zinc-600">Revisar</div>
          <div className="text-xl font-semibold">{stats.review}</div>
        </div>

        <div className="rounded-xl bg-zinc-50 p-3">
          <div className="text-xs text-zinc-600">Total</div>
          <div className="text-xl font-semibold">{stats.total}</div>
        </div>
      </div>

      {/* List */}
      <ul className="mt-6 space-y-3">
        {visibleDocuments.map((doc: DocumentItem) => {
          const s = state[doc.id] ?? "pending";
          return (
            <li key={doc.id} className="rounded-2xl border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{doc.label}</div>
                  <div className="mt-1 text-xs text-zinc-600">
                    Estado: <span className="font-medium">{statusLabel(s)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStatus(doc.id, "pending")}
                    className={`rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50 ${
                      s === "pending" ? "border-zinc-900" : ""
                    }`}
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={() => setStatus(doc.id, "received")}
                    className={`rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50 ${
                      s === "received" ? "border-zinc-900" : ""
                    }`}
                  >
                    Recibido
                  </button>
                  <button
                    onClick={() => setStatus(doc.id, "needs_review")}
                    className={`rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50 ${
                      s === "needs_review" ? "border-zinc-900" : ""
                    }`}
                  >
                    Revisar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Back */}
      <div className="mt-8 text-sm text-zinc-600">
        <Link className="underline" href="/">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  </div>
);
}