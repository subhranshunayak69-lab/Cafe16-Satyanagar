import { BookOpen, Heart, Leaf, MoveUpRight } from 'lucide-react';

const details = [
  { icon: BookOpen, title: 'A corner for quiet pages', text: 'Pick a book from the Bakul Foundation mini-library and let the afternoon unfold.' },
  { icon: Leaf, title: 'Outside, under the trees', text: 'A garden lawn made for unhurried suppers, soft lights and long conversations.' },
  { icon: Heart, title: 'Made to feel like yours', text: 'Come with friends, bring your four-legged companion, stay for one more cup.' },
];

export default function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      <div className="mb-12 flex items-center gap-3 text-[10px] uppercase tracking-[.24em] text-[#c5a36a] sm:text-xs">
        <span className="h-px w-9 bg-[#c5a36a]" /> The house on Satyanagar Road
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/4.2] overflow-hidden sm:aspect-[1.1/1]">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=85&w=1200"
              alt="Sunlit café interior with warm wood and vintage details"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/55 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 border-l border-[#e3c38e] pl-4 text-white sm:bottom-8 sm:left-8">
              <p className="font-serif text-2xl italic">A little old soul.</p>
              <p className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/75">A familiar feeling, found again</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 hidden border border-[#c5a36a]/50 bg-[#201a14] px-6 py-5 text-center sm:block lg:-right-7">
            <span className="block font-serif text-3xl text-[#e3c38e]">’50s</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[.17em] text-[#c4b9a9]">bungalow spirit</span>
          </div>
        </div>

        <div className="pt-3 lg:pl-2">
          <p className="text-xs uppercase tracking-[.19em] text-[#c5a36a]">Not just another coffee stop</p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-medium leading-[1.12] tracking-[-.035em] text-[#f5eee2] sm:text-5xl lg:text-[3.6rem]">
            A bungalow with room to <span className="italic text-[#d1af78]">breathe.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[#c8c0b5] sm:text-base sm:leading-8">
            In the middle of Bhubaneswar, behind an old familiar doorway, there’s a place to slow down. Cafe 16 brings the warmth of a lived-in home to a lovingly reimagined bungalow—where good food, thoughtful coffee and a little nostalgia share the same table.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#a9a095]">
            Drop in after work, settle in with a book, or make an evening of our garden. We’ll put the kettle on.
          </p>

          <div className="mt-9 border-t border-white/10">
            {details.map(({ icon: Icon, title, text }) => (
              <article key={title} className="flex gap-4 border-b border-white/10 py-5">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-[#c5a36a]" strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-lg text-[#f1e7d8]">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#a9a095]">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <a href="#gallery" className="mt-7 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#dfc18f] transition hover:text-white">
            Take a look around <MoveUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
