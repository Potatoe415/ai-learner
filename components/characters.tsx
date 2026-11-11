// Mascots are illustrations in public/characters/ (cut from tmp-genereated-img/, the generated character sheet).
// Loop = light bulb, Plug = beaver, Ward = owl, Cap = fox, Nimbus = cloud with a lantern (main trail mascot).

export type LoopMood = "happy" | "think" | "oops" | "cheer";

const LOOP_LABELS: Record<LoopMood, string> = {
  happy: "Loop, the guide",
  think: "Loop is thinking",
  oops: "Loop says oops",
  cheer: "Loop is celebrating",
};

function Character({ id, src, alt, size, mood }: { id: string; src: string; alt: string; size: number; mood?: LoopMood }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-id={id}
      data-mood={mood}
      className="character"
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size, objectFit: "contain" }}
    />
  );
}

export function Loop({ size = 120, mood = "happy" }: { size?: number; mood?: LoopMood }) {
  return <Character id="character-loop" src="/characters/loop.png" alt={LOOP_LABELS[mood]} size={size} mood={mood} />;
}

export function Plug({ size = 120 }: { size?: number }) {
  return <Character id="character-plug" src="/characters/plug.png" alt="Plug, the Workshop engineer" size={size} />;
}

export function Ward({ size = 120 }: { size?: number }) {
  return <Character id="character-ward" src="/characters/ward.png" alt="Ward, the Fortress guardian" size={size} />;
}

export function Cap({ size = 120 }: { size?: number }) {
  return <Character id="character-cap" src="/characters/cap.png" alt="Cap, the Field pilot" size={size} />;
}

export function Nimbus({ size = 120 }: { size?: number }) {
  return <Character id="character-nimbus" src="/characters/nimbus.png" alt="Nimbus, the cloud who lights the trail" size={size} />;
}
