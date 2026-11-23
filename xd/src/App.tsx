import { useState } from "react";
import "./App.css";

type Section = "uvod" | "aktuality" | "jidelnicek" | "kontakty";

const NAV: { id: Section; label: string }[] = [
    { id: "uvod", label: "Úvod" },
    { id: "aktuality", label: "Aktuality" },
    { id: "jidelnicek", label: "Jídelníček" },
    { id: "kontakty", label: "Kontakty" },
];

const NEWS = [
    { date: "17. 2. 2027", title: "Informace pro rodiče", text: "Důležité zprávy přehledně na jednom místě." },
    { date: "17. 2. 2027", title: "Ze života školky", text: "Něco z naší každodenní školkové pohody." },
    { date: "17. 2. 2027", title: "Co nás čeká", text: "Programy pro vás a společné události." },
];

const MENU = [
    { day: "Pondělí 18. 2.", items: ["Přesnídávka: chléb s pomazánkou, mléko", "Polévka: zeleninová", "Oběd: kuřecí řízek, brambor", "Svačina: ovoce, jogurt"] },
    { day: "Úterý 19. 2.", items: ["Přesnídávka: rohlík s máslem, čaj", "Polévka: čočková", "Oběd: boloňské špagety", "Svačina: zelenina, tvaroh"] },
    { day: "Středa 20. 2.", items: ["Přesnídávka: vánočka, kakao", "Polévka: bramborová", "Oběd: rizoto se sýrem", "Svačina: ovoce, müsli"] },
];

const LINKS = ["Praktické informace", "Dokumenty ke stažení", "Kontakt na školku"];

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState<Section>("uvod");
    const [dayIndex, setDayIndex] = useState(0);

    const go = (id: Section) => {
        setActive(id);
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const visibleDays = [MENU[dayIndex % MENU.length], MENU[(dayIndex + 1) % MENU.length]];

    return (
        <div className="page">
            <header className="header" id="uvod">
                <a className="brand" href="#uvod" onClick={(e) => { e.preventDefault(); go("uvod"); }}>
                    <img className="brand__logo" src="/logo.png" alt="Mateřská škola Plzeň - Křimice" />
                    <span className="brand__text">
            <strong>“Otevřená” školka</strong>
            <span>Máme společný cíl a k němu mnoho různých cest</span>
          </span>
                </a>

                <button
                    className="burger"
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    <span /><span /><span />
                </button>

                <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Hlavní navigace">
                    {NAV.map((n) => (
                        <button
                            key={n.id}
                            className={`pill ${active === n.id ? "pill--active" : ""}`}
                            onClick={() => go(n.id)}
                        >
                            {n.label}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="main">
                <section className="hero">
                    <p className="eyebrow">Malá krůčky, velké objevy.</p>
                    <h1>Společný cíl. Tisíc cest k objevování.</h1>
                    <p>Máme společný cíl a k němu mnoho různých cest.</p>
                    <button className="btn btn--blue" onClick={() => go("aktuality")}>Poznejte naši školku →</button>
                </section>

                <div className="columns">
                    <section className="col" id="aktuality">
                        <h2 className="title">Naše aktuality</h2>
                        <div className="card news">
                            {NEWS.map((n, i) => (
                                <article key={i} className="news__item">
                                    <span className="flower" aria-hidden="true" />
                                    <div>
                                        <time>{n.date}</time>
                                        <h3>{n.title}</h3>
                                        <p>{n.text}</p>
                                    </div>
                                    <span className="news__arrow" aria-hidden="true">↗</span>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="col col--menu" id="jidelnicek">
                        <p className="eyebrow eyebrow--light">Dobroty pro malá bříška</p>
                        <h2 className="title">
                            <span className="title__desktop">Jídelní lístek</span>
                            <span className="title__mobile">Co bude dobrého?</span>
                        </h2>
                        <div className="menu">
                            {visibleDays.map((d, i) => (
                                <div key={d.day} className={`card menu__day ${i === 1 ? "menu__day--second" : ""}`}>
                                    <h3>{d.day}</h3>
                                    <ul>
                                        {d.items.map((it) => <li key={it}>{it}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="menu__actions">
                            <button className="btn btn--blue btn--small" onClick={() => setDayIndex((d) => d + 1)}>
                                Další dny
                            </button>
                            <a className="link-light" href="#jidelnicek">Jsme tu pro vás</a>
                        </div>
                    </section>
                </div>

                <section className="about">
                    <p className="eyebrow">Místo pro všechny děti</p>
                    <h2>Každý jsme jiný. Rosteme společně.</h2>
                    <p>Prostor pro zvídavost, hru i klidné tempo. Podporujeme se a vzájemně se respektujeme.</p>
                    <div className="chips">
                        <span className="chip chip--white">Pracujeme si</span>
                        <span className="chip chip--yellow">Objevujeme</span>
                        <span className="chip chip--pink">Rosteme</span>
                    </div>
                </section>

                <section className="quick" id="kontakty">
                    <h2>Všechno po ruce</h2>
                    <p>Méně hledání, více času spolu.</p>
                    <ul>
                        {LINKS.map((l) => (
                            <li key={l}><a href="#kontakty">{l} <span>↗</span></a></li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="footer">
                <div className="footer__text">
                    <strong>Těšíme se na každý společný den.</strong>
                    <small>Otevřená školka • Plzeň</small>
                </div>
                <div className="city" aria-label="Město Plzeň">
                    <span className="city__mesto">Město</span>
                    <span className="city__plzen">Plzeň</span>
                </div>
            </footer>
        </div>
    );
}