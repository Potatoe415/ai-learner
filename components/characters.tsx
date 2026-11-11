// Ported from the Claude Design "Agent Path" canvas (Loop, Plug, Ward, Cap).

export type LoopMood = "happy" | "think" | "oops" | "cheer";

const LOOP_LABELS: Record<LoopMood, string> = {
  happy: "Loop, the guide",
  think: "Loop is thinking",
  oops: "Loop says oops",
  cheer: "Loop is celebrating",
};

export function Loop({ size = 120, mood = "happy" }: { size?: number; mood?: LoopMood }) {
  const show = (m: LoopMood) => (mood === m ? "inline" : "none");
  const d = {
    happy: show("happy"), think: show("think"), oops: show("oops"), cheer: show("cheer"),
    armsDown: mood === "cheer" ? "none" : "inline",
    armsUp: mood === "cheer" ? "inline" : "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={LOOP_LABELS[mood]} style={{ display: "block" }}>

<defs>
<radialGradient id="lpBody" cx="0.38" cy="0.3" r="0.85"><stop offset="0" stopColor="#FCE9AE"/><stop offset="0.55" stopColor="#F5C45E"/><stop offset="1" stopColor="#E29A2E"/></radialGradient>
<filter id="lpPaint" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
<filter id="lpBlur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>
<ellipse cx="60" cy="109" rx="32" ry="5" fill="#3A2A1A" opacity="0.2" filter="url(#lpBlur)"/>
<g filter="url(#lpPaint)">
<path d="M60 36C60 27 58 22 53 17" fill="none" stroke="#5E8F4A" strokeWidth="3.2" strokeLinecap="round"/>
<path d="M53 17C43 11 36 17 39 26C47 26 51 22 53 17Z" fill="#7DB15A" stroke="#4B7A3A" strokeOpacity="0.6" strokeWidth="1.5"/>
<path d="M59 28C68 19 79 22 80 31C72 34 64 33 59 28Z" fill="#92C46C" stroke="#4B7A3A" strokeOpacity="0.6" strokeWidth="1.5"/>
<path d="M57 24C51 25 50 31 55 32C59 32 59 28 56 28" fill="none" stroke="#5E8F4A" strokeWidth="2" strokeLinecap="round"/>
<ellipse cx="46" cy="102" rx="10" ry="5.5" fill="#D98E2B"/>
<ellipse cx="74" cy="102" rx="10" ry="5.5" fill="#D98E2B"/>
<g display={d.armsDown}><ellipse cx="23" cy="74" rx="7" ry="11" transform="rotate(18 23 74)" fill="#EDA73C"/><ellipse cx="97" cy="74" rx="7" ry="11" transform="rotate(-18 97 74)" fill="#EDA73C"/></g>
<g display={d.armsUp}><ellipse cx="20" cy="50" rx="7" ry="12" transform="rotate(-35 20 50)" fill="#EDA73C"/><ellipse cx="100" cy="50" rx="7" ry="12" transform="rotate(35 100 50)" fill="#EDA73C"/></g>
<ellipse cx="60" cy="68" rx="38" ry="36" fill="url(#lpBody)" stroke="#B9741F" strokeOpacity="0.5" strokeWidth="2"/>
<ellipse cx="50" cy="50" rx="15" ry="8" transform="rotate(-20 50 50)" fill="#FFF6D0" opacity="0.55"/>
<ellipse cx="37" cy="78" rx="6.5" ry="3.8" fill="#F07F6E" opacity="0.42"/>
<ellipse cx="83" cy="78" rx="6.5" ry="3.8" fill="#F07F6E" opacity="0.42"/>
</g>
<g display={d.happy}>
<ellipse cx="46" cy="66" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="48" cy="63.5" r="2" fill="#FFFFFF"/><circle cx="44.5" cy="69" r="1" fill="#FFFFFF"/>
<ellipse cx="74" cy="66" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="76" cy="63.5" r="2" fill="#FFFFFF"/><circle cx="72.5" cy="69" r="1" fill="#FFFFFF"/>
<path d="M54 77Q60 83 66 77" fill="none" stroke="#2A2320" strokeWidth="2.4" strokeLinecap="round"/>
</g>
<g display={d.think}>
<ellipse cx="47" cy="63" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="49.5" cy="60.5" r="2" fill="#FFFFFF"/><circle cx="45.5" cy="66" r="1" fill="#FFFFFF"/>
<ellipse cx="75" cy="63" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="77.5" cy="60.5" r="2" fill="#FFFFFF"/><circle cx="73.5" cy="66" r="1" fill="#FFFFFF"/>
<path d="M69 52Q75 47 82 51" fill="none" stroke="#2A2320" strokeWidth="2.2" strokeLinecap="round"/>
<path d="M55 79H65" fill="none" stroke="#2A2320" strokeWidth="2.4" strokeLinecap="round"/>
<circle cx="98" cy="38" r="3" fill="#FFFFFF" stroke="#B9A98A" strokeWidth="1.5"/><circle cx="105" cy="29" r="4.5" fill="#FFFFFF" stroke="#B9A98A" strokeWidth="1.5"/>
</g>
<g display={d.oops}>
<ellipse cx="46" cy="66" rx="6.6" ry="8.2" fill="#2A2320"/><circle cx="48.4" cy="62.8" r="2.4" fill="#FFFFFF"/><circle cx="44" cy="69.5" r="1.2" fill="#FFFFFF"/>
<ellipse cx="74" cy="66" rx="6.6" ry="8.2" fill="#2A2320"/><circle cx="76.4" cy="62.8" r="2.4" fill="#FFFFFF"/><circle cx="71.6" cy="69.5" r="1.2" fill="#FFFFFF"/>
<path d="M52 80Q56 75 60 80T68 80" fill="none" stroke="#2A2320" strokeWidth="2.4" strokeLinecap="round"/>
<path d="M99 40Q106 51 99 56Q92 51 99 40Z" fill="#A9DCEB" stroke="#6AA9BD" strokeWidth="1.8" strokeLinejoin="round"/>
</g>
<g display={d.cheer}>
<path d="M40 67Q46 59 52 67M68 67Q74 59 80 67" fill="none" stroke="#2A2320" strokeWidth="2.8" strokeLinecap="round"/>
<path d="M52 75Q60 90 68 75Z" fill="#8A3B2D"/><ellipse cx="60" cy="82" rx="4.4" ry="2.6" fill="#F08A7A"/>
<path d="M18 14L20.2 20L26 22L20.2 24L18 30L15.8 24L10 22L15.8 20Z" fill="#FFF3B0" stroke="#E0B54A" strokeWidth="1.2" strokeLinejoin="round"/>
<path d="M102 10L103.8 15L109 16.8L103.8 18.6L102 24L100.2 18.6L95 16.8L100.2 15Z" fill="#FFF3B0" stroke="#E0B54A" strokeWidth="1.2" strokeLinejoin="round"/>
</g>
    </svg>
  );
}

export function Plug({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Plug, the Workshop engineer" style={{ display: "block" }}>

<defs>
<radialGradient id="plBody" cx="0.38" cy="0.3" r="0.85"><stop offset="0" stopColor="#9BE0D6"/><stop offset="0.55" stopColor="#36AAA3"/><stop offset="1" stopColor="#0E7C7B"/></radialGradient>
<filter id="plPaint" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
<filter id="plBlur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>
<ellipse cx="60" cy="109" rx="32" ry="5" fill="#1A2A2A" opacity="0.2" filter="url(#plBlur)"/>
<g filter="url(#plPaint)">
<path d="M94 94C108 92 110 107 100 108C92 109 93 100 101 102" fill="none" stroke="#3B5A5A" strokeWidth="3.6" strokeLinecap="round"/>
<path d="M101 103C106 99 111 100 112 104C108 107 104 106 101 103Z" fill="#8FC268" stroke="#4B7A3A" strokeOpacity="0.6" strokeWidth="1.4"/>
<ellipse cx="45" cy="21" rx="7" ry="17" transform="rotate(-8 45 21)" fill="#E9F0F3" stroke="#8FA3B0" strokeOpacity="0.8" strokeWidth="1.8"/>
<ellipse cx="45" cy="23" rx="3" ry="11" transform="rotate(-8 45 23)" fill="#C3D6DE"/>
<ellipse cx="75" cy="21" rx="7" ry="17" transform="rotate(8 75 21)" fill="#E9F0F3" stroke="#8FA3B0" strokeOpacity="0.8" strokeWidth="1.8"/>
<ellipse cx="75" cy="23" rx="3" ry="11" transform="rotate(8 75 23)" fill="#C3D6DE"/>
<ellipse cx="46" cy="103" rx="10" ry="5.5" fill="#0B6564"/>
<ellipse cx="74" cy="103" rx="10" ry="5.5" fill="#0B6564"/>
<ellipse cx="23" cy="76" rx="7" ry="11" transform="rotate(18 23 76)" fill="#1F9893"/>
<ellipse cx="97" cy="76" rx="7" ry="11" transform="rotate(-18 97 76)" fill="#1F9893"/>
<ellipse cx="60" cy="70" rx="37" ry="34" fill="url(#plBody)" stroke="#0A5E5D" strokeOpacity="0.5" strokeWidth="2"/>
<ellipse cx="60" cy="85" rx="20" ry="13" fill="#CFF0EA" opacity="0.6"/>
<ellipse cx="48" cy="52" rx="13" ry="7" transform="rotate(-20 48 52)" fill="#E6FBF7" opacity="0.5"/>
<ellipse cx="37" cy="76" rx="6.5" ry="3.8" fill="#F29A8A" opacity="0.45"/>
<ellipse cx="83" cy="76" rx="6.5" ry="3.8" fill="#F29A8A" opacity="0.45"/>
</g>
<ellipse cx="47" cy="66" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="49" cy="63.5" r="2" fill="#FFFFFF"/><circle cx="45.5" cy="69" r="1" fill="#FFFFFF"/>
<ellipse cx="73" cy="66" rx="5.5" ry="6.8" fill="#2A2320"/><circle cx="75" cy="63.5" r="2" fill="#FFFFFF"/><circle cx="71.5" cy="69" r="1" fill="#FFFFFF"/>
<path d="M54 77Q60 83 66 77" fill="none" stroke="#2A2320" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

export function Ward({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Ward, the Fortress guardian" style={{ display: "block" }}>

<defs>
<radialGradient id="wdBody" cx="0.38" cy="0.28" r="0.9"><stop offset="0" stopColor="#9DA1EC"/><stop offset="0.55" stopColor="#5A5ECB"/><stop offset="1" stopColor="#3B3FA8"/></radialGradient>
<filter id="wdPaint" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
<filter id="wdBlur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>
<ellipse cx="60" cy="111" rx="30" ry="4.5" fill="#1A1A3A" opacity="0.22" filter="url(#wdBlur)"/>
<g filter="url(#wdPaint)">
<ellipse cx="48" cy="107" rx="9" ry="5" fill="#2A2E80"/>
<ellipse cx="72" cy="107" rx="9" ry="5" fill="#2A2E80"/>
<ellipse cx="19" cy="68" rx="6.5" ry="11" transform="rotate(14 19 68)" fill="#4B4FC0"/>
<ellipse cx="101" cy="68" rx="6.5" ry="11" transform="rotate(-14 101 68)" fill="#4B4FC0"/>
<path d="M60 12C74 20 88 22 98 24C98 52 96 72 84 88C76 98 68 104 60 108C52 104 44 98 36 88C24 72 22 52 22 24C32 22 46 20 60 12Z" fill="url(#wdBody)" stroke="#2A2E80" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round"/>
<path d="M33 34C33 52 37 66 46 79" fill="none" stroke="#FFFFFF" strokeOpacity="0.32" strokeWidth="4" strokeLinecap="round"/>
<path d="M30 30C36 26 46 27 52 31C48 36 38 37 30 30Z" fill="#7DB15A" opacity="0.9"/>
<path d="M44 30C49 22 58 22 62 26C58 32 50 33 44 30Z" fill="#92C46C" opacity="0.9"/>
<path d="M82 36C88 33 94 35 95 40C90 43 84 42 82 36Z" fill="#7DB15A" opacity="0.85"/>
<ellipse cx="38" cy="73" rx="6" ry="3.5" fill="#F29A8A" opacity="0.4"/>
<ellipse cx="82" cy="73" rx="6" ry="3.5" fill="#F29A8A" opacity="0.4"/>
</g>
<path d="M39 52L54 55M81 52L66 55" fill="none" stroke="#1E2160" strokeWidth="2.8" strokeLinecap="round"/>
<ellipse cx="47" cy="62" rx="5.2" ry="6.2" fill="#1E1A2A"/><circle cx="49" cy="59.8" r="1.9" fill="#FFFFFF"/><circle cx="45.6" cy="65" r="0.9" fill="#FFFFFF"/>
<ellipse cx="73" cy="62" rx="5.2" ry="6.2" fill="#1E1A2A"/><circle cx="75" cy="59.8" r="1.9" fill="#FFFFFF"/><circle cx="71.6" cy="65" r="0.9" fill="#FFFFFF"/>
<path d="M54 79Q60 81.5 66 79" fill="none" stroke="#1E1A2A" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

export function Cap({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Cap, the Field pilot" style={{ display: "block" }}>

<defs>
<radialGradient id="cpBody" cx="0.38" cy="0.3" r="0.85"><stop offset="0" stopColor="#FBC9A0"/><stop offset="0.55" stopColor="#F08F4C"/><stop offset="1" stopColor="#D9601A"/></radialGradient>
<linearGradient id="cpCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9B7350"/><stop offset="1" stopColor="#5F3F28"/></linearGradient>
<filter id="cpPaint" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
<filter id="cpBlur" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>
<ellipse cx="60" cy="110" rx="32" ry="5" fill="#3A2210" opacity="0.2" filter="url(#cpBlur)"/>
<g filter="url(#cpPaint)">
<path d="M84 96C98 96 106 90 113 99C105 105 97 108 87 106Z" fill="#EAD6B2" stroke="#C9B48A" strokeOpacity="0.7" strokeWidth="1.4"/>
<ellipse cx="46" cy="105" rx="10" ry="5.5" fill="#B04A12"/>
<ellipse cx="74" cy="105" rx="10" ry="5.5" fill="#B04A12"/>
<ellipse cx="22" cy="80" rx="7" ry="11" transform="rotate(18 22 80)" fill="#E57B35"/>
<ellipse cx="98" cy="80" rx="7" ry="11" transform="rotate(-18 98 80)" fill="#E57B35"/>
<ellipse cx="60" cy="76" rx="37" ry="31" fill="url(#cpBody)" stroke="#A8480F" strokeOpacity="0.5" strokeWidth="2"/>
<ellipse cx="48" cy="68" rx="13" ry="6.5" transform="rotate(-20 48 68)" fill="#FFE3C9" opacity="0.5"/>
<ellipse cx="36" cy="82" rx="6.5" ry="3.6" fill="#E8605A" opacity="0.4"/>
<ellipse cx="84" cy="82" rx="6.5" ry="3.6" fill="#E8605A" opacity="0.4"/>
<path d="M32 90C44 100 76 100 88 90C92 97 90 104 83 106C72 109 48 109 37 106C30 104 28 96 32 90Z" fill="#F6E8CE" stroke="#C9B48A" strokeOpacity="0.7" strokeWidth="1.4"/>
<ellipse cx="27" cy="66" rx="7" ry="10" fill="#5F3F28"/>
<ellipse cx="93" cy="66" rx="7" ry="10" fill="#5F3F28"/>
<path d="M25 60C25 34 42 24 60 24C78 24 95 34 95 60C85 54 73 52 60 52C47 52 35 54 25 60Z" fill="url(#cpCap)" stroke="#3E2818" strokeOpacity="0.7" strokeWidth="1.6"/>
<path d="M33 43C50 36 70 36 87 43" fill="none" stroke="#3E2818" strokeWidth="4" strokeLinecap="round"/>
<circle cx="49" cy="40" r="9" fill="#D7EEF4" fillOpacity="0.9" stroke="#C9A24A" strokeWidth="3"/>
<circle cx="71" cy="40" r="9" fill="#D7EEF4" fillOpacity="0.9" stroke="#C9A24A" strokeWidth="3"/>
<path d="M44 37Q47 34 51 35M66 37Q69 34 73 35" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
</g>
<ellipse cx="47" cy="70" rx="5" ry="6.2" fill="#2A2320"/><circle cx="48.8" cy="67.8" r="1.9" fill="#FFFFFF"/><circle cx="45.6" cy="73" r="0.9" fill="#FFFFFF"/>
<ellipse cx="73" cy="70" rx="5" ry="6.2" fill="#2A2320"/><circle cx="74.8" cy="67.8" r="1.9" fill="#FFFFFF"/><circle cx="71.6" cy="73" r="0.9" fill="#FFFFFF"/>
<path d="M54 81Q60 87 66 81" fill="none" stroke="#2A2320" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

