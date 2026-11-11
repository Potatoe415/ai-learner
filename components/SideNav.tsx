"use client";

// App-wide collapsible side menu: brand, trail and profile links, the learner's level and points,
// and the trail's modules grouped by zone with their units for the current one.
// Desktop: expanded or collapsed to an icon rail (choice saved in localStorage). Mobile: a drawer.

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Loop, Nimbus } from "./characters";
import { Check, Chevron, Close, Lock, MapIcon, MenuIcon, Star, UserIcon } from "./icons";
import { ModuleBadge } from "./badges";
import { MODULES, TRAIL, UNITS, ZONES, getZone, type CourseModule } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

const COLLAPSED_KEY = "agent-path:nav-collapsed";
const fmt = (n: number) => n.toLocaleString("en-US");

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

function NavLink({ href, active, icon, label, collapsed, onNavigate }: { href: string; active: boolean; icon: ReactNode; label: string; collapsed: boolean; onNavigate: () => void }) {
  return (
    <Link href={href} className={`snav-link ${active ? "on" : ""}`} aria-current={active ? "page" : undefined} title={collapsed ? label : undefined} onClick={onNavigate}>
      <span className="snav-ic">{icon}</span>
      <span className="snav-txt">{label}</span>
    </Link>
  );
}

function ModuleItem({ mod, collapsed, active, onNavigate }: { mod: CourseModule; collapsed: boolean; active: Active; onNavigate: () => void }) {
  const p = useProgress();
  const done = p.isModuleDone(mod.n);
  const locked = p.ready && !done && mod.n > p.currentModule;
  const isHere = active.module === mod.n;
  // Units show for the module being viewed, or for the current module when viewing something else.
  const showUnits = !collapsed && (isHere || (active.module === null && mod.n === p.currentModule && !done));
  const firstOpen = UNITS.findIndex((_, u) => !p.isUnitDone(mod.n, u));
  const label = `Module ${mod.n} · ${mod.title}`;

  const head = (
    <>
      <span className="snav-ic"><ModuleBadge module={mod.n} earned={done} size={30} /></span>
      <span className="snav-txt">
        <span className="snav-mod">{mod.n}. {mod.title}</span>
        {!done && !locked && mod.n === p.currentModule && <span className="snav-tag" style={{ color: colorOf(mod) }}>In progress</span>}
      </span>
      {locked && <span className="snav-end"><Lock size={14} color="#8A92A6" /></span>}
    </>
  );

  return (
    <li>
      {locked ? (
        <span className="snav-link locked" title={collapsed ? `${label} (locked)` : `Finish module ${p.currentModule} first`} aria-disabled="true">{head}</span>
      ) : (
        <Link href={`/module/${mod.n}`} className={`snav-link ${isHere ? "on" : ""}`} aria-current={isHere && active.unit === null ? "page" : undefined} title={collapsed ? label : undefined} onClick={onNavigate} style={isHere ? { boxShadow: `inset 4px 0 0 ${colorOf(mod)}` } : undefined}>
          {head}
        </Link>
      )}
      {showUnits && (
        <ol className="snav-units">
          {UNITS.map((u, i) => {
            const unitDone = p.isUnitDone(mod.n, i);
            const reachable = !locked && (unitDone || i === firstOpen);
            // Without `?unit=`, the lesson shows the first open unit (or the last one when all are done).
            const here = isHere && (active.unit ?? (firstOpen === -1 ? UNITS.length - 1 : firstOpen)) === i;
            return (
              <li key={u}>
                {reachable ? (
                  <Link href={`/module/${mod.n}?unit=${i}`} className={`snav-unit ${here ? "on" : ""}`} aria-current={here ? "page" : undefined} onClick={onNavigate}>
                    <span className={`snav-dot ${unitDone ? "done" : ""}`}>{unitDone && <Check size={10} color="#fff" w={4} />}</span>{u}
                  </Link>
                ) : (
                  <span className="snav-unit off"><span className="snav-dot" />{u}</span>
                )}
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
  const p = useProgress();
  const active = useActive(unit);
  const next = p.nextRank;

  return (
    <>
      <nav aria-label="Main" className="snav-sec">
        <NavLink href="/" active={active.path === "/"} icon={<MapIcon />} label="Trail" collapsed={collapsed} onNavigate={onNavigate} />
        <NavLink href="/profile" active={active.path === "/profile"} icon={<UserIcon />} label="Profile" collapsed={collapsed} onNavigate={onNavigate} />
      </nav>

      <Link href="/profile" className="snav-rank" title={collapsed ? `Level ${p.rank.n} · ${p.rank.name} · ${fmt(p.points)} points` : undefined} onClick={onNavigate}>
        <span className="snav-lvl" style={{ background: p.rank.color }}>{p.rank.n}</span>
        <span className="snav-txt">
          <b>{p.rank.name}</b>
          <span><Star size={13} /> {fmt(p.points)} points · {p.completedModules.length} / {MODULES.length} badges</span>
          {next && <span className="snav-next">Next: {next.name}</span>}
        </span>
      </Link>

      <nav aria-label={`Trail: ${TRAIL.name}`} className="snav-sec">
        {!collapsed && <span className="snav-head">{TRAIL.name}</span>}
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
  return <NavBody {...props} unit={raw !== null && /^\d$/.test(raw) && Number(raw) < UNITS.length ? Number(raw) : null} />;
}

/** Wraps every page with the side menu (desktop rail or mobile drawer). */
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

  return (
    <div className={`shell ${collapsed ? "collapsed" : ""} ${open ? "drawer-open" : ""}`}>
      <div className="topbar">
        <button type="button" className="snav-btn" aria-label="Open the menu" aria-expanded={open} aria-controls="side-nav" onClick={() => setOpen(true)}><MenuIcon /></button>
        <Link href="/" className="brand small"><Loop size={36} />Agent Path</Link>
      </div>
      <div className="snav-scrim" aria-hidden="true" onClick={() => setOpen(false)} />

      <aside id="side-nav" className="snav" aria-label="Side menu">
        <div className="snav-top">
          <Link href="/" className="brand small" title={collapsed ? "Agent Path" : undefined}><Nimbus size={40} /><span className="snav-txt">Agent Path</span></Link>
          <button type="button" className="snav-btn desk" aria-label={collapsed ? "Expand the menu" : "Collapse the menu"} aria-expanded={!collapsed} aria-controls="side-nav" onClick={toggle}><Chevron dir={collapsed ? "right" : "left"} /></button>
          <button type="button" className="snav-btn mob" aria-label="Close the menu" onClick={() => setOpen(false)}><Close /></button>
        </div>
        <div className="snav-scroll">
          <Suspense fallback={<NavBody collapsed={collapsed} onNavigate={close} unit={null} />}>
            <NavBodyFromUrl collapsed={collapsed} onNavigate={close} />
          </Suspense>
        </div>
      </aside>

      <div className="shell-main">{children}</div>
    </div>
  );
}
