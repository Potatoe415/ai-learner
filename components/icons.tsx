export const Check = ({ size = 18, color = "#1A2233", w = 3 }: { size?: number; color?: string; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Arrow = ({ size = 20, color = "#1A2233" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Back = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="#1A2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Close = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="#1A2233" strokeWidth="2.8" strokeLinecap="round" /></svg>
);
export const Lock = ({ size = 16, color = "#56617A" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="3" fill={color} /><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" /></svg>
);
export const Star = ({ fill = "#F2B134", size = 18 }: { fill?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7Z" fill={fill} stroke="#1A2233" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);
export const Flag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}><path d="M6 21V4M6 5h12l-3 4 3 4H6" fill="none" stroke="#1A2233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const DocIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7Z M14 3v5h5" fill="none" stroke="#1A2233" strokeWidth="2" strokeLinejoin="round" /><path d="M10 13h6M10 17h6" stroke="#1A2233" strokeWidth="2" strokeLinecap="round" /></svg>
);
export const MapIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z M9 4v13 M15 6.5v13" fill="none" stroke="#1A2233" strokeWidth="2" strokeLinejoin="round" /></svg>
);
export const UserIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="#1A2233" strokeWidth="2" /><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" fill="none" stroke="#1A2233" strokeWidth="2" strokeLinecap="round" /></svg>
);
export const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="#1A2233" strokeWidth="2.6" strokeLinecap="round" /></svg>
);
export const Chevron = ({ dir = "left" }: { dir?: "left" | "right" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} fill="none" stroke="#1A2233" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
