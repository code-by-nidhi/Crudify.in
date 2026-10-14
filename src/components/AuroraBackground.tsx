/**
 * The page ground: flat cotton white, with a fine noir grid for texture.
 *
 * This used to be four blurred, drifting colour blobs parallaxing against
 * scroll and pointer. A blurred blob is a gradient by another name, so the
 * whole field — and the GSAP rig that animated it — is gone. Depth now comes
 * from the charcoal panels sitting on top of this, not from the backdrop.
 *
 * The `linear-gradient`s below draw hard 1px rules, not fades; that is the
 * standard way to paint a grid in CSS and renders as flat lines.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-primary"
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#1B1717_1px,transparent_1px),linear-gradient(90deg,#1B1717_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}
