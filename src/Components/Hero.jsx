import { ArrowDown, ArrowUpRight, Clock3, MapPin, Star } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <section className="hero-section relative isolate flex min-h-[710px] items-center overflow-hidden sm:min-h-[780px]" id="home">
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=2200"
        alt="Warmly lit heritage café with intimate dining tables"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="hero-scrim absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(90deg,rgba(20,14,9,.6)_1px,transparent_1px),linear-gradient(rgba(20,14,9,.6)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="mx-auto grid w-full max-w-[1440px] items-end gap-8 px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:px-14 lg:pt-32">
        <div className="max-w-4xl">
          <div className="mb-5 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[.24em] text-[#e9c895] sm:mb-7 sm:text-xs">
            <span className="h-px w-8 bg-[#c5a36a] sm:w-10" />
            A heritage bungalow in Satyanagar
          </div>
          <h1 className="max-w-4xl font-serif text-[clamp(3rem,9vw,8rem)] font-medium leading-[.9] tracking-[-.055em] text-[#fffaf2] drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
            Come in for
            <br />
            <span className="italic text-[#d6b47c]">a little while.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#e5ded4] sm:mt-7 sm:text-base sm:leading-8">
            A table beneath the old trees. Coffee made slowly. The kind of evening you wish would last a little longer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <button
              type="button"
              onClick={() => setActiveTab('menu')}
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#bd9257] px-7 text-sm font-semibold text-[#1d1710] shadow-[0_18px_35px_rgba(189,146,87,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d4b27c]"
            >
              Explore the menu <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reservation')}
              className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/35 bg-black/15 px-7 text-sm font-medium text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#d6b47c] hover:text-[#e4c797]"
            >
              Find your table
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-left text-white lg:hidden">
            <div className="rounded-2xl border border-white/15 bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-[#e5ca9d]">
                <Star className="h-3.5 w-3.5 fill-current" /> 4.2
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-white/60">Guest reviews</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/20 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs text-[#e5ca9d]">
                <Clock3 className="h-3.5 w-3.5" /> Daily till late
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-[.18em] text-white/60">Open hours</p>
            </div>
          </div>
        </div>

        <aside className="hidden border-l border-white/30 pb-1 pl-7 text-white lg:block">
          <div className="flex items-center gap-2 text-sm text-[#e5ca9d]">
            <Star className="h-4 w-4 fill-current" /> 4.2 <span className="text-white/55">· 2,200+ guest reviews</span>
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs leading-5 text-white/80">
            <MapPin className="h-4 w-4 shrink-0 text-[#d6b47c]" />
            Satyanagar, Bhubaneswar
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs leading-5 text-white/80">
            <Clock3 className="h-4 w-4 shrink-0 text-[#d6b47c]" />
            Open daily · till late
          </div>
        </aside>
      </div>

      <a href="#story" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[.25em] text-white/70 transition hover:text-white md:flex">
        Take a look around <ArrowDown className="h-3.5 w-3.5" />
      </a>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a36a]/70 to-transparent" />
    </section>
  );
}
