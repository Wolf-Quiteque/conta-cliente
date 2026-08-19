import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import contiksLogo from "@/public/contiks-logo.png";

export const metadata: Metadata = {
  title: "Contabilidade que impulsiona o seu negócio",
  description:
    "Consultoria em contabilidade, fiscalidade e recursos humanos para empresas em Angola.",
};

const services = [
  {
    icon: BookOpenCheck,
    number: "01",
    title: "Contabilidade",
    description:
      "Registos contabilísticos, fechos de conta, balanços, demonstrações de resultados e fluxos de caixa.",
  },
  {
    icon: Landmark,
    number: "02",
    title: "Fiscalidade",
    description:
      "Cálculo e apuramento mensal de impostos, com a contabilidade alinhada à realidade fiscal da empresa.",
  },
  {
    icon: UsersRound,
    number: "03",
    title: "Recursos humanos",
    description:
      "Processamento salarial cuidado e apoio na organização dos processos administrativos da sua equipa.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Processos internos",
    description:
      "Melhoria de procedimentos e controlos internos, desenhada à medida das necessidades do seu negócio.",
  },
];

const pricing = [
  { volume: "200.000 — 500.000 Kz", price: "45.000 Kz" },
  { volume: "501.000 — 1.000.000 Kz", price: "80.000 Kz" },
  { volume: "1.001.000 — 1.500.000 Kz", price: "150.000 Kz" },
  { volume: "1.501.000 — 2.000.000 Kz", price: "200.000 Kz" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbf8] text-[#10291d]">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-40 -top-52 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(21,155,73,0.16),rgba(21,155,73,0)_68%)]" />
          <div className="absolute left-[8%] top-32 h-2 w-2 rounded-full bg-[#f28c28]" />
          <div className="absolute left-[46%] top-24 h-1.5 w-1.5 rounded-full bg-[#1aab55]" />
        </div>

        <header className="relative z-20 border-b border-[#dce9df]/80 bg-white/75 backdrop-blur-xl">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
            <Link
              href="/"
              aria-label="Contiks Digital — página inicial"
              className="shrink-0"
            >
              <Image
                src={contiksLogo}
                alt="Contiks Digital"
                className="h-auto w-[148px] sm:w-[164px]"
                priority
              />
            </Link>

            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-8 text-sm font-medium text-[#426052] md:flex"
            >
              <a
                href="#servicos"
                className="transition-colors hover:text-[#07833b]"
              >
                Serviços
              </a>
              <a
                href="#como-funciona"
                className="transition-colors hover:text-[#07833b]"
              >
                Como funciona
              </a>
              <a
                href="#precos"
                className="transition-colors hover:text-[#07833b]"
              >
                Preços
              </a>
              <a
                href="#sobre"
                className="transition-colors hover:text-[#07833b]"
              >
                Sobre nós
              </a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/entrar"
                className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-[#116d37] transition-colors hover:bg-[#eaf7ee] sm:inline-flex"
              >
                Entrar
              </Link>
              <Link
                href="/registar"
                className="group inline-flex items-center gap-2 rounded-full bg-[#087c39] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,124,57,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#066d32] sm:px-5"
              >
                Criar conta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 px-5 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <div className="max-w-2xl animate-fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cde8d5] bg-white/90 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#087c39] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#f28c28]" />
                Consultoria que simplifica
              </div>
              <h1 className="text-balance text-[clamp(2.8rem,6.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c2b1b]">
                Contas certas.
                <span className="mt-1 block text-[#119447]">
                  Decisões melhores.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#52695d] sm:text-xl">
                Cuidamos da contabilidade, fiscalidade e recursos humanos para
                que possa dedicar tempo ao que faz o seu negócio crescer.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/registar"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#087c39] px-7 text-base font-bold text-white shadow-[0_16px_36px_rgba(8,124,57,0.24)] transition-all hover:-translate-y-1 hover:bg-[#066d32]"
                >
                  Cria a tua conta agora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#servicos"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#cfe0d4] bg-white px-6 text-sm font-bold text-[#174d2d] transition-all hover:border-[#89bd99] hover:bg-[#f1faf4]"
                >
                  Conhecer os serviços
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#567063]">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[#13a24e]" />
                  Acompanhamento próximo
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[#13a24e]" />
                  Processos seguros
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[590px] lg:mx-0 lg:ml-auto">
              <div
                className="absolute -left-10 top-16 h-48 w-48 rounded-full bg-[#f7a23b]/15 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-[#19a854]/20 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative rotate-[1.2deg] rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_30px_80px_rgba(17,73,40,0.16)] sm:p-4">
                <div className="overflow-hidden rounded-[1.45rem] border border-[#e2eee5] bg-[#f7faf8]">
                  <div className="flex items-center justify-between border-b border-[#e2eee5] bg-white px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f6eb] text-[#087c39]">
                        <WalletCards className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#7a8e82]">
                          Visão financeira
                        </p>
                        <p className="text-sm font-bold text-[#153b25]">
                          O seu negócio, num relance
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-[#e5f7eb] px-3 py-1.5 text-[11px] font-bold text-[#087c39]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#11a54d]" />
                      Em dia
                    </span>
                  </div>

                  <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
                    <div className="rounded-2xl bg-[#087c39] p-5 text-white shadow-[0_16px_28px_rgba(8,124,57,0.18)] sm:col-span-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium text-white/70">
                            Conformidade fiscal
                          </p>
                          <p className="mt-1 text-2xl font-semibold">
                            Tudo sob controlo
                          </p>
                        </div>
                        <ShieldCheck className="h-7 w-7 text-[#87e5a8]" />
                      </div>
                      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/15">
                        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#8ce6aa] to-[#f6a13b]" />
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] text-white/70">
                        <span>Documentação processada</span>
                        <span>92%</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#e0ece3] bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef8f1] text-[#0b8b40]">
                          <ReceiptText className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-[11px] font-bold text-[#11a34c]">
                          Organizado
                        </span>
                      </div>
                      <p className="mt-4 text-xs text-[#7a8e82]">Documentos</p>
                      <p className="mt-0.5 text-lg font-bold text-[#173b27]">
                        Prontos a consultar
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#e0ece3] bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff3e4] text-[#e47c15]">
                          <FileCheck2 className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-[11px] font-bold text-[#e47c15]">
                          Acompanhado
                        </span>
                      </div>
                      <p className="mt-4 text-xs text-[#7a8e82]">Obrigações</p>
                      <p className="mt-0.5 text-lg font-bold text-[#173b27]">
                        Sem surpresas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-3 flex max-w-[210px] -rotate-2 items-center gap-3 rounded-2xl border border-white bg-white p-3.5 shadow-[0_18px_44px_rgba(20,65,37,0.16)] sm:-left-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0de] text-[#ee851d]">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] text-[#788a80]">
                    Foco no essencial
                  </p>
                  <p className="text-sm font-bold text-[#163b26]">
                    Crescer com clareza
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-y border-[#deebe1] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#e1ece4] px-5 sm:px-8 md:grid-cols-4 md:divide-y-0 lg:px-10">
          {[
            ["Contabilidade", "Organizada e atual"],
            ["Fiscalidade", "Sem complicações"],
            ["Salários", "Processados a tempo"],
            ["Consultoria", "Feita à sua medida"],
          ].map(([title, caption]) => (
            <div
              key={title}
              className="px-4 py-7 text-center sm:px-6"
            >
              <p className="text-sm font-bold text-[#194c2f] sm:text-base">
                {title}
              </p>
              <p className="mt-1 text-xs text-[#789083] sm:text-sm">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="servicos"
        className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#eb861f]">
                O que fazemos
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#0e2f1e] sm:text-5xl">
                A base certa para crescer.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#5c7366] lg:justify-self-end">
              Informação financeira rigorosa, obrigações fiscais acompanhadas e
              processos internos mais simples — com uma equipa que fala a sua
              língua.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16">
            {services.map(
              ({ icon: Icon, number, title, description }, index) => (
                <article
                  key={title}
                  className={`group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(25,77,47,0.1)] sm:p-9 ${
                    index === 0
                      ? "border-[#087c39] bg-[#087c39] text-white"
                      : "border-[#dce9df] bg-white text-[#123824]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        index === 0
                          ? "bg-white/12 text-[#9ef0b8]"
                          : "bg-[#eaf7ee] text-[#0b8d40]"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        index === 0 ? "text-white/45" : "text-[#b2c2b8]"
                      }`}
                    >
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md leading-7 ${
                      index === 0 ? "text-white/72" : "text-[#61776a]"
                    }`}
                  >
                    {description}
                  </p>
                  <div
                    className={`absolute -bottom-16 -right-12 h-36 w-36 rounded-full transition-transform duration-500 group-hover:scale-125 ${
                      index === 0 ? "bg-white/5" : "bg-[#eaf7ee]/60"
                    }`}
                  />
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="scroll-mt-20 bg-[#0b3822] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#0f4b2c] p-7 sm:p-10">
            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[70px] border-[#22a956]/25" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#f28c28]/15 blur-2xl" />
            <div className="relative flex h-full min-h-[350px] flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9ee5b5]">
                  Contiks, Lda.
                </span>
                <BriefcaseBusiness className="h-7 w-7 text-[#f4a34d]" />
              </div>
              <div>
                <p className="max-w-md text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                  “Transformamos números em clareza para o seu negócio.”
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#f28c28]" />
                  <span className="text-sm text-white/60">
                    Rigor, proximidade e confiança
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f2a14b]">
              Sobre a Contiks
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Mais do que contas. Uma parceria.
            </h2>
            <p className="mt-7 text-lg leading-8 text-white/68">
              Somos uma prestadora de serviços de consultoria em contabilidade,
              fiscalidade e recursos humanos. Trabalhamos lado a lado com cada
              cliente para tornar a gestão mais simples, rigorosa e útil.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                "Informação financeira clara",
                "Cumprimento fiscal acompanhado",
                "Decisões apoiadas em dados",
                "Soluções adaptadas ao cliente",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-white/85"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#28ae5d]/20 text-[#8fe5aa]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="scroll-mt-20 bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e98118]">
              Simples desde o primeiro dia
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#0e2f1e] sm:text-5xl">
              Começar é fácil.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#60766a]">
              Três passos para colocar as suas contas em boas mãos.
            </p>
          </div>
          <div className="relative mt-16 grid gap-5 md:grid-cols-3">
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-[#b8dbc3] via-[#f0a24b] to-[#b8dbc3] md:block" />
            {[
              [
                "01",
                "Crie a sua conta",
                "Registe a empresa e partilhe os dados essenciais em poucos minutos.",
              ],
              [
                "02",
                "Envie os documentos",
                "Centralize recibos e informação para a nossa equipa acompanhar.",
              ],
              [
                "03",
                "Acompanhe com clareza",
                "Receba orientação e mantenha as obrigações do negócio organizadas.",
              ],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="relative rounded-[1.75rem] border border-[#dfebe2] bg-[#f9fcfa] p-7 text-center sm:p-8"
              >
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-8 border-white bg-[#e4f5e9] text-sm font-extrabold text-[#087c39] shadow-sm">
                  {number}
                </span>
                <h3 className="mt-6 text-xl font-bold text-[#143a26]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#667c70]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="precos"
        className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e98118]">
              Investimento transparente
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#0e2f1e] sm:text-5xl">
              Um plano à medida do seu volume.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#60766a]">
              O pacote de contabilidade e fiscalidade acompanha o crescimento
              da sua empresa. Comece com o nível certo e evolua quando precisar.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#eaf7ee] px-4 py-3 text-sm font-semibold text-[#176538]">
              <ShieldCheck className="h-5 w-5" />
              Retenção aplicável incluída no enquadramento
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#dce9df] bg-white shadow-[0_24px_70px_rgba(26,83,49,0.09)]">
            <div className="flex items-center justify-between gap-4 bg-[#087c39] px-6 py-5 text-white sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                  Pacote mensal
                </p>
                <p className="mt-1 text-xl font-bold">
                  Contabilidade e fiscalidade
                </p>
              </div>
              <ReceiptText className="h-7 w-7 text-[#93e5ad]" />
            </div>
            <div className="divide-y divide-[#e4eee7]">
              <div className="grid grid-cols-[1fr_auto] gap-4 bg-[#f5faf7] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#7a8f82] sm:px-8">
                <span>Volume mensal</span>
                <span>Honorário</span>
              </div>
              {pricing.map(({ volume, price }) => (
                <div
                  key={volume}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 transition-colors hover:bg-[#f8fcf9] sm:px-8"
                >
                  <span className="text-sm font-medium text-[#536c5e] sm:text-base">
                    {volume}
                  </span>
                  <span className="text-base font-bold text-[#0c7c39] sm:text-lg">
                    {price}
                  </span>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_auto] items-center gap-4 bg-[#fff9f1] px-6 py-5 sm:px-8">
                <div>
                  <p className="text-sm font-bold text-[#49331f] sm:text-base">
                    Acima de 2.001.000 Kz
                  </p>
                  <p className="mt-1 text-xs text-[#806b58]">
                    Valor final ajustado ao volume e complexidade
                  </p>
                </div>
                <span className="text-right text-sm font-bold text-[#e17a13] sm:text-base">
                  Desde 375.000 Kz
                </span>
              </div>
            </div>
            <div className="border-t border-[#e4eee7] px-6 py-4 sm:px-8">
              <p className="text-xs leading-5 text-[#829087]">
                Valores indicativos. O enquadramento final é confirmado após
                análise da atividade e das necessidades da empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0d3e26] px-6 py-14 text-center text-white sm:px-10 sm:py-16 lg:px-20 lg:py-20">
          <div className="absolute -left-20 -top-32 h-80 w-80 rounded-full border-[64px] border-[#1da654]/20" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#f18a22]/15 blur-2xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#94e5ae]">
              Vamos começar?
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              As suas contas merecem clareza.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/68">
              Crie a conta da sua empresa e dê hoje o primeiro passo para uma
              gestão mais simples.
            </p>
            <Link
              href="/registar"
              className="group mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#f28c28] px-7 text-base font-bold text-white shadow-[0_16px_34px_rgba(242,140,40,0.24)] transition-all hover:-translate-y-1 hover:bg-[#e67e18]"
            >
              Cria a tua conta agora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfeae2] bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 sm:flex-row">
          <Image
            src={contiksLogo}
            alt="Contiks Digital"
            className="h-auto w-[142px]"
          />
          <p className="text-center text-sm text-[#708378]">
            Contabilidade · Fiscalidade · Recursos Humanos
          </p>
          <p className="text-sm text-[#8a998f]">
            © {new Date().getFullYear()} Contiks, Lda.
          </p>
        </div>
      </footer>
    </main>
  );
}
