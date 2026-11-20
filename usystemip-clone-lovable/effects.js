// A short, dependency-free reward effect. Motion preferences always win.
export function celebrateReward(dialog) {
  if (!dialog?.open || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const layer = document.createElement('div');
  layer.className = 'reward-shower';
  layer.setAttribute('aria-hidden', 'true');
  const colors = ['#1ed760', '#95edb0', '#e9bf55', '#f4df9b'];
  for (let n = 0; n < 24; n++) {
    const bit = document.createElement('i');
    bit.style.cssText = `left:${4 + Math.random() * 92}%;background:${colors[n % colors.length]};--sway:${Math.round(Math.random() * 100 - 50)}px;--turn:${Math.round(Math.random() * 540 - 270)}deg;--duration:${650 + Math.round(Math.random() * 160)}ms;animation-delay:${n % 5 * 12}ms`;
    layer.append(bit);
  }
  // A manual popover sits above the modal without capturing input or focus.
  // Older browsers receive the same decoration within the reward card.
  if (typeof layer.showPopover === 'function') {
    layer.setAttribute('popover', 'manual');
    document.body.append(layer);
    try { layer.showPopover(); } catch { layer.removeAttribute('popover'); dialog.append(layer); }
  } else dialog.append(layer);
  dialog.classList.add('reward-celebrating');
  let timer;
  const cleanup = () => {
    clearTimeout(timer);
    layer.remove();
    dialog.classList.remove('reward-celebrating');
  };
  timer = setTimeout(cleanup, 950);
  return cleanup;
}
