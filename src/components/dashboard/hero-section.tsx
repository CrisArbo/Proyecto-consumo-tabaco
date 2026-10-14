import Link from "next/link";
import { ArrowDown, BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CloudMark } from "@/components/layout/brand";

export function HeroSection() {
  return (
    <section
      id="resumen"
      aria-labelledby="titulo-principal"
      className="scroll-mt-20 px-4 pt-6 sm:px-6 lg:px-10 lg:pt-8"
    >
      <div className="from-brand-navy via-brand-navy to-brand-navy-deep relative isolate overflow-hidden rounded-3xl bg-linear-to-br px-6 py-12 text-white shadow-[0_30px_80px_-30px_rgb(30_58_95/0.6)] sm:px-10 lg:px-14 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-brand-peach/20 absolute -top-20 right-[-10%] size-[28rem] rounded-full blur-3xl" />
          <div className="absolute bottom-[-40%] left-[-10%] size-[30rem] rounded-full bg-[#4f7cac]/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent)] bg-size-[22px_22px]" />
          <CloudMark
            sun={false}
            className="animate-drift absolute top-10 right-[8%] w-56 text-white/10"
          />
          <CloudMark
            sun={false}
            className="animate-drift-slow absolute right-[30%] bottom-6 w-32 text-white/[0.07]"
          />
          <CloudMark
            sun={false}
            className="animate-drift-slow text-brand-peach/20 absolute top-1/2 right-[2%] w-24"
          />
        </div>

        <header className="max-w-2xl">
          <Badge className="mb-6 h-7 gap-2 rounded-full bg-white/10 px-3 text-white ring-1 ring-white/20 backdrop-blur">
            <MapPin data-icon="inline-start" className="text-brand-peach" />
            Colombia · Encuesta nacional
          </Badge>
          <h1
            id="titulo-principal"
            className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            ¿Qué tan presente está el <em className="text-brand-peach not-italic">humo</em> en
            nuestros hogares?
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg">
            Prevalencia reúne las respuestas de miles de personas en Colombia para entender el
            consumo de tabaco y de cigarrillos electrónicos: quiénes respondieron, cuántos han
            fumado y cómo se compara con el vapeo.
          </p>
        </header>

        <nav aria-label="Acciones principales" className="mt-10 flex flex-wrap gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#indicadores" />}
            className="bg-brand-peach text-brand-navy hover:bg-brand-peach/90 h-11 rounded-xl px-5"
          >
            Explorar los datos
            <ArrowDown data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/api-docs" />}
            className="h-11 rounded-xl border-white/20 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
          >
            <BookOpen data-icon="inline-start" />
            Ver la API
          </Button>
        </nav>
      </div>
    </section>
  );
}
