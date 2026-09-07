import Link from "next/link";
import styles from "./ReforestationYouthPage.module.css";

const pillars = [
  ["R", "Responsibility", "Protecting the land connected to our industry."],
  ["K", "Knowledge", "Preserving gemstone craftsmanship and education."],
  ["C", "Community", "Supporting people, and the futures they build."]
];

export function ReforestationYouthPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Minskhi</p>
        <h1 data-keep-page-title-size>Impact &amp; Responsibility</h1>
        <p className={styles.accent}>What we take from the earth, we give back to it.</p>
        <p className={styles.locations}>Ratnapura, Sri Lanka · Melbourne, Australia</p>
      </header>
      <div className={styles.content}>
        <section className={styles.belief} aria-labelledby="impact-belief">
          <h2 id="impact-belief" className={styles.eyebrow}>A Belief, Kept</h2>
          <p>True luxury carries a responsibility beyond beauty. It begins in Ratnapura, Sri Lanka&apos;s storied City of Gems, and continues in Melbourne, where we invest in the craftsmen who will carry the trade forward.</p>
          <p className={styles.accent}>Two commitments. One belief.</p>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.small}>A share of every gemstone we offer returns to the land it came from, and to the hands that will shape its future.</p>
        </section>
        <section className={styles.pillars} aria-labelledby="impact-pillars">
          <p className={styles.eyebrow}>The Minskhi Standard</p>
          <h2 id="impact-pillars">Our Responsibility Is Guided By Three Pillars</h2>
          <div className={styles.pillarGrid}>
            {pillars.map(([letter, title, text]) => (
              <article key={title}>
                <span className={styles.letter} aria-hidden="true">{letter}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.story} aria-labelledby="impact-land">
          <p className={styles.number} aria-hidden="true">I.</p>
          <p className={styles.eyebrow}>Ratnapura, Sri Lanka</p>
          <h2 id="impact-land">Restoring the Land</h2>
          <p>For centuries, Ratnapura has given the world its finest sapphires and coloured gemstones. It is also where Minskhi&apos;s own stones are sourced. Mining, like any extraction from the land, leaves a mark: vegetation cleared to reach what lies beneath.</p>
          <p>Our answer was to plant trees that give back more than they take. Working with the Gem and Greenery Association, we raised the first grove for Ratnapura&apos;s mining communities to plant: fruit-bearing rather than ornamental, chosen to restore soil and canopy while feeding families for generations.</p>
          <ul className={styles.trees} aria-label="Tree species"><li>Mango</li><li>Jackfruit</li><li>Breadfruit</li></ul>
          <p className={styles.accent}>Each tree is a quiet act of restitution, grown by the same hands that give the earth its gems.</p>
        </section>
        <section className={styles.story} aria-labelledby="impact-craft">
          <p className={styles.number} aria-hidden="true">II.</p>
          <p className={styles.eyebrow}>Nunawading, Victoria</p>
          <h2 id="impact-craft">Investing in Craft</h2>
          <p>Our responsibility does not end at the mine. It extends to the people who will shape this industry&apos;s next chapter, including the young.</p>
          <p>In Victoria, Minskhi stands beside the Nunawading and District Lapidary Club, a community built around the patient art of cutting and shaping stone. We open the door for its youngest members through membership, mentorship, and hours at the wheel. This is the kind of hands-on craft and quiet focus that builds skill, confidence, and belonging in equal measure.</p>
          <p className={styles.accent}>An old craft, kept alive by young hands.</p>
        </section>
      </div>
      <section className={styles.closing} aria-labelledby="impact-standard">
        <p className={styles.eyebrow}>The Minskhi Standard</p>
        <h2 id="impact-standard">Luxury should not shine without responsibility.</h2>
        <p className={styles.accent}>This is only the beginning.</p>
        <span className={styles.rule} aria-hidden="true" />
        <h2>Be Part of the Impact</h2>
        <p className={styles.small}>Every Minskhi purchase carries this work forward.</p>
        <Link href="/gemstones" className={styles.cta}>Explore Our Gemstones</Link>
        <p className={styles.signature}>Minskhi · Melbourne, Australia</p>
      </section>
    </div>
  );
}
