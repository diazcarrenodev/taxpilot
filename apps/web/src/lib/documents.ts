export type DocStatus = "pending" | "received" | "needs_review";

export type Profile = "employee" | "independent" | "mixed";

export type DocumentItem = {
  id: string;
  label: string;
  profiles?: Profile[]; // si no está, aplica a todos
};

export const BASE_DOCUMENTS: DocumentItem[] = [
  { id: "rut", label: "RUT" },
  { id: "income_withholding", label: "Certificado de ingresos y retenciones" },
  {
    id: "severance_fund",
    label: "Certificado fondo de cesantías (movimientos del año)",
    profiles: ["employee", "mixed"],
  },
  { id: "bank_certs", label: "Certificados bancarios (ahorros/corriente/inversiones/deuda)" },
  { id: "real_estate", label: "Bienes inmuebles / recibos predial" },
  { id: "vehicles_assets", label: "Vehículos u otros activos (con valor)" },
  { id: "ar_ap", label: "Cuentas por cobrar o por pagar a terceros" },
  { id: "prepaid_health", label: "Certificado de medicina prepagada" },
  { id: "afc", label: "Certificado cuentas AFC" },
  { id: "vol_pension", label: "Certificado aportes voluntarios de pensión" },
  {
    id: "ind_social_security",
    label: "Seguridad social pagada como independiente",
    profiles: ["independent", "mixed"],
  },
  { id: "mortgage_interest", label: "Certificado intereses de vivienda" },
  { id: "dependents", label: "Dependientes económicos (hijos/cónyuge/padres)" },
  { id: "prior_return", label: "Declaración de renta del año anterior" },
];