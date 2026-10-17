/** Arms scroll/word reveal CSS only when off-screen elements need hiding. */
let motionReady = false;

export function armScrollMotion() {
  if (motionReady || typeof document === "undefined") return;
  motionReady = true;
  document.documentElement.classList.add("motion-ready");
}

export function isElementInView(el: Element, marginRatio = 0.12): boolean {
  const rect = el.getBoundingClientRect();
  const threshold = window.innerHeight * (1 - marginRatio);
  return rect.top < threshold && rect.bottom > 0;
}
