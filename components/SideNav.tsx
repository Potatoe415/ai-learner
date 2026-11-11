"use client";

// App shell: a light site header on every page (logo, site title, profile button) and, inside a trail
// only (/trail and /module/*), a collapsible side menu with the trail name and its modules grouped by zone.
// Desktop: expanded or collapsed to an icon rail (choice saved in localStorage). Mobile: a drawer.

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Nimbus } from "./characters";
import { Check, Chevron, Close, MapIcon, MenuIcon, UserIcon } from "./icons";
import { ModuleBadge } from "./badges";
import { MODULES, TRAIL, ZONES, getZone, isOptionalUnit, unitsOf, type CourseModule } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const COLLAPSED_KEY = "agent-path:nav-collapsed";

/** Module groups as shown in the menu: one per zone. */
const GROUPS = ZONES.map((z) => ({ key: z.key, label: z.name, color: z.color, modules: MODULES.filter((m) => m.zone === z.key) }));

const colorOf = (m: CourseModule) => getZone(m.zone).color;

interface Active {
  path: string;
  module: number | null;
  unit: number | null;
}

function useActive(unit: number | null): Active {
  const path = usePathname();
  const match = /^\/module\/(\d+)/.exec(path);
  return { path, module: match ? Number(match[1]) : null, unit };
}

/** The trail name, linking to the trail's page. Collapsed rail: the map icon. */
function TrailLink({ active, collapsed, onNavigate }: { active: boolean; collapsed: boolean; onNavigate: () => void }) {
  return (
    <Link href="/trail" className={`snav-trail ${active ? "on" : ""}`} aria-current={active ? "page" : undefined} title={collapsed ? TRAIL.name : undefined} onClick={onNavigate}>
      {collapsed ? <span className="snav-ic"><MapIcon /></span> : TRAIL.name}
    </Link>
  );
}

function ModuleItem({ mod, collapsed, active, onNavigate }: { mod: CourseModule; collapsed: boolean; active: Active; onNavigate: () => void }) {
  const p = useProgress();
  const done = p.isModuleDone(mod.n);
  const isHere = active.module === mod.n;
  // Units show for the module being viewed, or for the current module when viewing something else.
  const showUnits = !collapsed && (isHere || (active.module === null && mod.n === p.currentModule && !done));
  const units = mod.units;
  const firstOpen = units.findIndex((_, u) => !p.isUnitDone(mod.n, u));
  const label = `Module ${mod.n} · ${mod.title}`;

  const head = (
    <>
      <span className="snav-ic"><ModuleBadge module={mod.n} earned={done} size={30} /></span>
      <span className="snav-txt">
        <span className="snav-mod">{mod.n}. {mod.title}</span>
        {!done && mod.n === p.currentModule && <span className="snav-tag" style={{ color: colorOf(mod) }}>In progress</span>}
      </span>
    </>
  );

  return (
    <li>
      <Link href={`/module/${mod.n}`} className={`snav-link ${isHere ? "on" : ""}`} aria-current={isHere && active.unit === null ? "page" : undefined} title={collapsed ? label : undefined} onClick={onNavigate} style={isHere ? { boxShadow: `inset 4px 0 0 ${colorOf(mod)}` } : undefined}>
        {head}
      </Link>
      {showUnits && (
        <ol className="snav-units">
          {units.map((u, i) => {
            const unitDone = p.isUnitDone(mod.n, i);
            // Without `?unit=`, the lesson shows the first open unit (or the last one when all are done).
            const here = isHere && (active.unit ?? (firstOpen === -1 ? units.length - 1 : firstOpen)) === i;
            return (
              <li key={u}>
                <Link href={`/module/${mod.n}?unit=${i}`} className={`snav-unit ${here ? "on" : ""}`} aria-current={here ? "page" : undefined} onClick={onNavigate}>
                  <span className={`snav-dot ${unitDone ? "done" : ""}`}>{unitDone && <Check size={10} color="#fff" w={4} />}</span>{u}{isOptionalUnit(mod.n, i) && <span className="optional-tag">Optional</span>}
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </li>
  );
}

interface BodyProps {
  collapsed: boolean;
  onNavigate: () => void;
}

function NavBody({ collapsed, onNavigate, unit }: BodyProps & { unit: number | null }) {
  const active = useActive(unit);

  return (
    <>
      <nav aria-label={`Trail: ${TRAIL.name}`} className="snav-sec">
        <TrailLink active={active.path === "/trail"} collapsed={collapsed} onNavigate={onNavigate} />
        {GROUPS.map((g) => (
          <div key={g.key} className="snav-group">
            {!collapsed && <span className="snav-zone" style={{ color: g.color }}>{g.label}</span>}
            <ul>{g.modules.map((m) => <ModuleItem key={m.n} mod={m} collapsed={collapsed} active={active} onNavigate={onNavigate} />)}</ul>
          </div>
        ))}
      </nav>
    </>
  );
}

/** Reads `?unit=` to highlight the open unit. Isolated so only this part needs a Suspense boundary on static pages. */
function NavBodyFromUrl(props: BodyProps) {
  const raw = useSearchParams().get("unit");
  const match = /^\/module\/(\d+)/.exec(usePathname());
  const max = match ? unitsOf(Number(match[1])).length : 0;
  return <NavBody {...props} unit={raw !== null && /^\d$/.test(raw) && Number(raw) < max ? Number(raw) : null} />;
}

/** Round profile button, at the right of the site header. */
function ProfileButton() {
  const p = useProgress();
  const on = usePathname() === "/profile";
  const label = `Profile · Level ${p.rank.n} · ${p.rank.name}`;
  return (
    <Link href="/profile" className={`profile-btn ${on ? "on" : ""}`} aria-label={label} title={label} aria-current={on ? "page" : undefined}>
      <UserIcon size={24} />
      <span className="profile-lvl" style={{ background: p.rank.color }} aria-hidden="true">{p.rank.n}</span>
    </Link>
  );
}

/** Wraps every page with the site header and the side menu (desktop rail or mobile drawer). */
export default function SideNav({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      /* storage blocked: keep expanded */
    }
  }, []);

  // Close the mobile drawer on navigation and with Escape.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
    } catch {
      /* storage blocked: choice lasts for this visit */
    }
  };

  // The side menu belongs to a trail: it shows only on the trail page and its modules.
  const inTrail = path === "/trail" || path.startsWith("/module/");

  return (
    <div className={`shell ${!inTrail ? "no-nav" : ""} ${collapsed ? "collapsed" : ""} ${open ? "drawer-open" : ""}`}>
      <header className="site-head">
        {inTrail && <button type="button" className="snav-btn mob" aria-label="Open the menu" aria-expanded={open} aria-controls="side-nav" onClick={() => setOpen(true)}><MenuIcon /></button>}
        <Link href="/" className="site-brand"><Nimbus size={30} />AI Academy</Link>
        <ProfileButton />
      </header>
      {inTrail && <>
      <div className="snav-scrim" aria-hidden="true" onClick={() => setOpen(false)} />

      <aside id="side-nav" className="snav" aria-label="Side menu">
        <div className="snav-top">
          <button type="button" className="snav-btn desk" aria-label={collapsed ? "Expand the menu" : "Collapse the menu"} aria-expanded={!collapsed} aria-controls="side-nav" onClick={toggle}><Chevron dir={collapsed ? "right" : "left"} /></button>
          <button type="button" className="snav-btn mob" aria-label="Close the menu" onClick={() => setOpen(false)}><Close /></button>
        </div>
        <div className="snav-scroll">
          <Suspense fallback={<NavBody collapsed={collapsed} onNavigate={close} unit={null} />}>
            <NavBodyFromUrl collapsed={collapsed} onNavigate={close} />
          </Suspense>
        </div>
      </aside>
      </>}

      <div className="shell-main">
        {children}
      </div>
    </div>
  );
}
