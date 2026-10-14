export function SiteFooter() {
  return (
    <footer className="border-border/70 text-muted-foreground border-t px-4 py-6 text-sm sm:px-6 lg:px-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-heading text-brand-navy font-semibold">Prevalencia</span> · Consumo
          de tabaco y vapeo en Colombia
        </p>
        <p>
          Datos: <abbr title="Encuesta Nacional de Consumo de Sustancias Psicoactivas">ENCSPA</abbr>
        </p>
      </div>
    </footer>
  );
}
