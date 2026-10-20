/**
 * The page ground: flat cotton white, no texture.
 *
 * This used to be four blurred, drifting colour blobs parallaxing against
 * scroll and pointer. A blurred blob is a gradient by another name, so the
 * whole field — and the GSAP rig that animated it — is gone. Depth now comes
 * from the charcoal panels sitting on top of this, not from the backdrop.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-primary"
    />
  );
}
