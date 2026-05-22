import Image from "next/image";
import Link from "next/link";

const pillars = [
  ["R", "Responsibility", "Protecting the land connected to our industry."],
  ["K", "Knowledge", "Preserving gemstone craftsmanship and education."],
  ["C", "Community", "Supporting people and building sustainable futures."]
];

const stats = [
  ["30+", "Trees Planted"],
  ["10+", "Youth Memberships Sponsored"],
  ["2", "Community Partners"]
];

const trees = ["Mango Trees", "Jackfruit Trees", "Breadfruit Trees"];

const plantReasons = [
  "Thrive naturally in Sri Lanka's climate",
  "Provide long-term food sources",
  "Support rural livelihoods",
  "Contribute to ecological restoration"
];

const reforestationGoals = [
  "Restore vegetation in areas affected by mining",
  "Improve soil health and biodiversity",
  "Support sustainable land use in gem regions",
  "Provide long-term food sources for local families"
];

const plantSourcing = [
  "Ethical and legal sourcing of plants",
  "High-quality, climate-appropriate tree species",
  "Compliance with national conservation regulations",
  "Transparent and responsible environmental practices"
];

const brandResponsibilities = [
  "Give back to the land that supports the gemstone industry",
  "Support communities beyond commercial transactions",
  "Invest in meaningful long-term environmental outcomes",
  "Operate within legal and ethical frameworks"
];

const youthSupport = [
  "Youth club membership fees",
  "Training and tutoring support",
  "Access to workshops and equipment",
  "Participation in club learning programs",
  "Activities that encourage skill development and creative exploration"
];

const skillBenefits = [
  "Focus and mindfulness through hands-on activities",
  "Creative expression through working with natural materials",
  "Confidence gained from learning new skills",
  "A sense of belonging within a supportive community",
  "Exposure to new hobbies, interests, and potential career paths"
];

const timeline = [
  ["2026", "Tree planting project launched in Ratnapura"],
  ["2026", "Youth membership sponsorship launched in Victoria"],
  ["2027", "Expansion of community programs"]
];

const partners = [
  {
    name: "Forest Department Sri Lanka",
    image: "/wp-content/uploads/2026/03/Forest-Department.jpg"
  },
  {
    name: "Gem and Greenery Association",
    image: "/wp-content/uploads/2026/03/logo_main-dark-theme-e1773949954761.png"
  },
  {
    name: "Nunawading Lapidary Club",
    image: "/wp-content/uploads/2026/03/logo_main-dark-theme-e1773949954761.png"
  }
];

function SectionHeading({
  eyebrow,
  title,
  children,
  light = false
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow ? (
        <p className={`text-xs uppercase tracking-[0.34em] ${light ? "text-[#d6c0a0]" : "text-[rgb(9_46_43/var(--tw-bg-opacity,1))]"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-4 font-serif text-4xl leading-tight md:text-5xl ${light ? "text-white" : "text-[rgb(9_46_43/var(--tw-bg-opacity,1))]"}`}>
        {title}
      </h2>
      {children ? <div className={`mt-5 text-base leading-8 ${light ? "text-white/78" : "text-mink"}`}>{children}</div> : null}
    </div>
  );
}

function LeafIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.4]">
      <path d="M19.5 4.5C11.2 4.7 5.8 8.6 4.6 15.7c-.4 2.2.9 3.7 3.1 3.3 7.1-1.1 11-6.6 11.8-14.5Z" />
      <path d="M5.5 18.2c3.2-3.9 6.6-6.6 10.2-8.3" />
    </svg>
  );
}

function ImagePanel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-[#dfd1c0] bg-white p-3 shadow-[0_22px_70px_rgba(38,29,18,0.08)] ${className}`}>
      <div className="relative h-full min-h-[260px] w-full overflow-hidden bg-[#f7f2ea]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}

function BulletList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className={`mt-5 list-disc space-y-2 pl-5 text-sm leading-7 ${light ? "text-white/78" : "text-mink"}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ReforestationYouthPage() {
  return (
    <main className="bg-[#f8f5ef]">
      <section className="relative min-h-[640px] overflow-hidden bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] text-white">
        <Image
          src="/wp-content/uploads/2026/03/misk-scaled-e1773949016389.jpg"
          alt="Minskhi impact and responsibility"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#092e2b]/95 via-[#092e2b]/72 to-[#092e2b]/25" />
        <div className="container-shell relative flex min-h-[640px] items-center py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d6c0a0]">MINSKHI</p>
            <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">Impact & Responsibility</h1>
            <p className="mt-7 text-xl leading-8 text-white/88">
              Giving back to the land and empowering communities connected to the gemstone industry.
            </p>
            <p className="mt-5 text-base leading-8 text-white/78">
              At Minskhi, true luxury must serve a greater purpose. We believe the future of the gemstone industry must
              be built on sustainability, respect for nature, and support for the communities connected to it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em]">
              {["Certified & Natural", "Ethically Sourced", "Exquisite Quality"].map((item) => (
                <span className="border border-white/20 bg-white/10 px-4 py-2" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-24">
        <SectionHeading eyebrow="Responsibility Beyond Jewellery" title="Responsibility Beyond Jewellery">
          <p>
            At Minskhi, every gemstone tells a story not only of beauty and craftsmanship, but also of responsibility.
            As a brand deeply connected to Sri Lanka&apos;s historic gem lands, we believe that the future of the industry
            must be built on sustainability, respect for nature, and support for the communities who depend on it.
          </p>
        </SectionHeading>
        <div className="mx-auto mt-10 max-w-5xl space-y-5 text-center text-base leading-8 text-mink">
          <p>
            Our first reforestation initiative began in Ratnapura, Sri Lanka, the world-renowned &ldquo;City of Gems.&rdquo;
            For centuries, this region has supplied some of the most extraordinary sapphires and coloured gemstones to
            the global jewellery market. However, like all mining regions, gem extraction can impact the natural
            landscape when vegetation is cleared during the mining process.
          </p>
          <p>
            To help restore this balance, Minskhi donated the first batch of trees to the Gem and Greenery Association
            in Ratnapura. These trees are being planted by local mining communities to replace vegetation that was
            removed during mining activities.
          </p>
          <p>
            The initiative encourages miners and landowners to replant trees after mining operations are completed,
            helping regenerate soil, restore biodiversity, and bring life back to the land.
          </p>
          <p>
            But this program is about more than just planting trees. It is also about supporting families and creating
            long-term livelihoods within the community. By encouraging sustainable land management and responsible
            mining practices, we aim to help preserve Ratnapura&apos;s environment while ensuring that future generations can
            continue to benefit from the region&apos;s gemstone heritage.
          </p>
          <p>
            The trees planted through this initiative will grow alongside the stories of miners, their families, and the
            gemstones that travel from Sri Lanka to the world. Each tree represents a small step toward restoring the
            natural beauty of the land and creating a more sustainable future for the gem industry.
          </p>
          <p>
            As Minskhi grows, we are committed to expanding this program and continuing to support environmental
            restoration projects in Sri Lanka and beyond.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell">
          <SectionHeading title="Our Responsibility Is Guided By Three Pillars" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map(([letter, title, text]) => (
              <article className="border border-[#dfd1c0] bg-[#fbfaf7] p-8 text-center" key={title}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] font-serif text-2xl text-white">
                  {letter}
                </div>
                <h3 className="mt-6 font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-mink">{text}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl border border-[#dfd1c0] bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] p-8 text-center text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d6c0a0]">The Minskhi standard:</p>
            <h3 className="mt-3 font-serif text-3xl">Luxury should not shine without responsibility.</h3>
            <p className="mt-4 text-sm leading-7 text-white/74">
              The initiatives shared here represent the first steps in our journey, created for real impact, not
              publicity.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-24">
        <SectionHeading title="The Minskhi Impact Commitment">
          <p>
            Minskhi commits 10% of annual profits to initiatives that restore land and empower communities connected to
            the gemstone industry.
          </p>
          <p className="mt-4">Our first programs include:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm">
            <span className="border border-[#dfd1c0] bg-white px-4 py-2">Reforestation in Ratnapura, Sri Lanka</span>
            <span className="border border-[#dfd1c0] bg-white px-4 py-2">Youth lapidary training in Melbourne, Australia</span>
          </div>
          <p className="mt-5">Every purchase contributes to these initiatives.</p>
        </SectionHeading>
        <div className="mx-auto mt-12 grid max-w-5xl border border-[#dfd1c0] bg-white shadow-[0_22px_70px_rgba(38,29,18,0.08)] md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div className="border-b border-[#eadfd2] px-6 py-8 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" key={label}>
              <p className="font-serif text-5xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-mink">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ImagePanel
            src="/wp-content/uploads/2026/03/page02_img01.png"
            alt="Reforestation initiative in Ratnapura, Sri Lanka"
            className="aspect-[4/5]"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-gold">Our First Reforestation Initiative</p>
            <h2 className="mt-4 font-serif text-5xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
              Restoring Land. Supporting Livelihoods.
            </h2>
            <div className="mt-7 space-y-5 text-sm leading-8 text-mink">
              <p>
                Sri Lanka&apos;s gemstone regions are closely connected to the natural environment. For centuries, areas
                such as Ratnapura, known globally as the &ldquo;City of Gems,&rdquo; have produced some of the world&apos;s
                most beautiful sapphires and coloured gemstones.
              </p>
              <p>
                However, like many natural resource industries, gemstone mining can affect the surrounding landscape
                when vegetation is cleared during excavation.
              </p>
              <p>
                As a brand deeply connected to Sri Lanka&apos;s gem heritage, Minskhi believes that restoring the land is an
                essential responsibility.
              </p>
              <p>
                Our first environmental initiative focuses on planting fruit-bearing trees that support both
                environmental recovery and long-term community wellbeing.
              </p>
            </div>

            <div className="mt-10 border border-[#dfd1c0] bg-white p-7">
              <h3 className="font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">Why We Are Doing This</h3>
              <p className="mt-4 text-sm leading-7 text-mink">
                This program was designed to support both environmental restoration and local livelihoods.
              </p>
              <BulletList items={reforestationGoals} />
              <p className="mt-5 text-sm leading-7 text-mink">
                Rather than planting decorative trees, we selected species that provide practical benefits for
                communities over generations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {trees.map((tree) => (
            <article className="border border-[#dfd1c0] bg-white px-7 py-8 text-center shadow-[0_18px_60px_rgba(38,29,18,0.06)]" key={tree}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dfd1c0] bg-[#f8f5ef] text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
                <LeafIcon />
              </div>
              <h3 className="mt-5 font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{tree}</h3>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl text-center text-sm leading-8 text-mink">
          <p>These species were chosen because they:</p>
          <div className="mt-4 grid gap-3 text-left md:grid-cols-2">
            {plantReasons.map((reason) => (
              <div className="border border-[#dfd1c0] bg-white px-5 py-4" key={reason}>
                {reason}
              </div>
            ))}
          </div>
          <p className="mt-5">
            Fruit-bearing trees ensure that environmental restoration can also support economic and food security for
            local communities.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <div className="border border-[#dfd1c0] bg-white p-7 lg:col-span-1">
            <h3 className="font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">Ethical Sourcing Of Plants</h3>
            <p className="mt-4 text-sm leading-7 text-mink">
              All trees used in this program are sourced through the Forest Department of Sri Lanka, operating under the
              Ministry of Environment.
            </p>
            <p className="mt-4 text-sm leading-7 text-mink">This ensures:</p>
            <BulletList items={plantSourcing} />
          </div>
          <div className="border border-[#dfd1c0] bg-white p-7 lg:col-span-2">
            <h3 className="font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">Our First Project Milestone</h3>
            <div className="mt-4 space-y-4 text-sm leading-8 text-mink">
              <p>
                Our first batch of trees has been donated to the Gem and Greenery Association in Ratnapura, marking the
                initiation milestone of this reforestation project.
              </p>
              <p>
                The trees are being planted by local communities to help restore vegetation in areas where land was
                cleared during mining activities. This initiative supports both environmental recovery and long-term
                community livelihoods.
              </p>
              <p>
                By working with a local association connected to the gem industry, the project encourages responsible
                land stewardship and promotes sustainable practices within mining communities.
              </p>
              <p>
                Each tree planted represents a small but meaningful step toward restoring balance between gemstone
                extraction, nature, and community wellbeing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] p-8 text-white">
          <h3 className="font-serif text-3xl">Our Responsibility As A Brand</h3>
          <p className="mt-4 text-sm leading-7 text-white/78">
            For Minskhi, sustainability is not a campaign. It is a long-term commitment to:
          </p>
          <BulletList items={brandResponsibilities} light />
          <p className="mt-5 text-sm font-semibold text-[#d6c0a0]">
            Reforestation is not a marketing initiative for us, it is a responsibility.
          </p>
        </div>
      </section>

      <section className="bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] py-24 text-white">
        <div className="container-shell">
          <SectionHeading eyebrow="Youth Empowerment & Wellbeing" title="Supporting Young Lives Through Skills And Purpose" light>
            <p>
              At Minskhi, our responsibility extends beyond the landscapes where gemstones are found. It also includes
              supporting the next generation of people who will shape the future of creative industries, craftsmanship,
              and community life.
            </p>
          </SectionHeading>

          <div className="mt-12 grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5 text-sm leading-8 text-white/78">
              <p>
                In Australia, one of the growing challenges facing young people today is mental health and wellbeing.
                Social isolation, academic pressure, uncertainty about career paths, and a lack of meaningful
                opportunities can contribute to anxiety and emotional distress.
              </p>
              <p>
                We believe that skills, creativity, and community participation can play an important role in helping
                young people build confidence and resilience. When young individuals are given opportunities to learn,
                connect, and participate in supportive environments, they gain not only knowledge but also purpose.
              </p>
              <p>
                To support this vision, Minskhi has partnered with the Nunawading and District Lapidary Club (NDLC) in
                Victoria, Australia.
              </p>
              <p>
                NDLC is a long-standing community organisation dedicated to gemstone cutting, lapidary craftsmanship,
                and hands-on learning through workshops and club activities.
              </p>
            </div>
            <ImagePanel
              src="/wp-content/uploads/2026/03/page02_img02.png"
              alt="Youth lapidary training in Australia"
              className="aspect-[16/11] border-white/15 bg-white/10"
            />
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            <div className="border border-white/15 bg-white/[0.06] p-7">
              <h3 className="font-serif text-3xl">Supporting Youth Through Community Activities</h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                Through our partnership with NDLC, Minskhi provides financial support to help encourage youth
                participation within the club.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/78">
                These contributions may be used by the club to support young members in a variety of ways, including:
              </p>
              <BulletList items={youthSupport} light />
              <p className="mt-5 text-sm leading-7 text-white/78">
                The funds are administered directly by NDLC and used where they can provide the greatest benefit to
                youth participants and club activities.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/78">
                This approach ensures that support is directed where it is most needed within the club community.
              </p>
            </div>
            <div className="border border-white/15 bg-white/[0.06] p-7">
              <h3 className="font-serif text-3xl">Why Community And Skills Matter</h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                Community organisations such as NDLC provide an environment where young people can learn practical
                skills, interact with mentors, and develop confidence through creative work.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/78">Participation in these environments can help young people develop:</p>
              <BulletList items={skillBenefits} light />
              <p className="mt-5 text-sm leading-7 text-white/78">
                These experiences can be especially valuable in helping young people build confidence, friendships, and a
                sense of purpose.
              </p>
            </div>
          </div>

          <div className="mt-8 border border-white/15 bg-white/[0.06] p-7">
            <h3 className="font-serif text-3xl">Continuing Our Support</h3>
            <div className="mt-4 space-y-4 text-sm leading-8 text-white/78">
              <p>
                Our first contribution supports youth participation at the Nunawading and District Lapidary Club,
                helping ensure that young members have access to learning opportunities and community activities.
              </p>
              <p>
                As Minskhi grows, we intend to continue supporting initiatives that encourage skills, creativity, and
                community engagement among young people.
              </p>
              <p>
                Investing in youth development is one of the most meaningful ways to support the future of both
                communities and creative industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-24">
        <SectionHeading title="Impact Timeline" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {timeline.map(([year, text]) => (
            <article className="border border-[#dfd1c0] bg-white p-7 text-center" key={text}>
              <p className="font-serif text-5xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{year}</p>
              <p className="mt-4 text-sm leading-7 text-mink">{text}</p>
            </article>
          ))}
        </div>

        <SectionHeading title="Community Partners">
          <p>Our first initiatives are supported through community and institutional partners connected to land restoration and lapidary education.</p>
        </SectionHeading>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {partners.map((partner) => (
            <article className="border border-[#dfd1c0] bg-white p-6 text-center" key={partner.name}>
              <div className="relative mx-auto h-20 w-36">
                <Image src={partner.image} alt={`${partner.name} logo`} fill sizes="144px" className="object-contain" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{partner.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 bg-[rgb(9_46_43/var(--tw-bg-opacity,1))] px-8 py-12 text-center text-white">
          <h2 className="font-serif text-4xl">Be Part Of The Impact</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/78">
            Every Minskhi purchase contributes to our reforestation and youth development initiatives.
          </p>
          <Link
            href="/gemstones"
            className="mt-8 inline-flex border border-white bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(9_46_43/var(--tw-bg-opacity,1))] transition hover:bg-transparent hover:text-white"
          >
            Explore Our Gemstones
          </Link>
        </div>
      </section>
    </main>
  );
}
