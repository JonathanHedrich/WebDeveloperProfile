export function ScrollUi(): string {
  return `
    <div class="scroll-progress" aria-hidden="true">
      <div class="scroll-progress-track">
        <div id="scroll-progress-fill" class="scroll-progress-fill"></div>
      </div>
    </div>

    <button
      id="back-to-top"
      class="back-to-top"
      type="button"
      aria-label="Back to top"
      title="Back to top"
    >
      <i class="bi bi-arrow-up"></i>
    </button>
  `;
}
