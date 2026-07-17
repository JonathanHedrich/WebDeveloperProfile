import * as pdfjsLib from "pdfjs-dist";

import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type PreviewElements = {
  canvas: HTMLCanvasElement;
  placeholder: HTMLElement | null;
};

export function initCertificatePreviews(): void {
  const canvases = Array.from(
    document.querySelectorAll<HTMLCanvasElement>("[data-certificate-pdf]"),
  );

  if (canvases.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const canvas = entry.target as HTMLCanvasElement;

        currentObserver.unobserve(canvas);

        void renderCertificatePreview(canvas);
      });
    },
    {
      rootMargin: "250px 0px",
      threshold: 0.01,
    },
  );

  canvases.forEach((canvas) => {
    observer.observe(canvas);
  });
}

async function renderCertificatePreview(
  canvas: HTMLCanvasElement,
): Promise<void> {
  const pdfUrl = canvas.dataset.certificatePdf;

  if (!pdfUrl) {
    showPreviewError(canvas);
    return;
  }

  const elements = getPreviewElements(canvas);

  const loadingTask = pdfjsLib.getDocument({
    url: pdfUrl,
  });

  try {
    const pdfDocument = await loadingTask.promise;
    const firstPage = await pdfDocument.getPage(1);

    const container = canvas.closest<HTMLElement>(".certificate-preview");

    const availableWidth = container?.clientWidth ?? 600;

    const originalViewport = firstPage.getViewport({
      scale: 1,
    });

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const scale = (availableWidth / originalViewport.width) * devicePixelRatio;

    const viewport = firstPage.getViewport({
      scale,
    });

    const context = canvas.getContext("2d", {
      alpha: false,
    });

    if (!context) {
      throw new Error("The certificate canvas context is unavailable.");
    }

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    canvas.style.width = `${Math.ceil(viewport.width / devicePixelRatio)}px`;

    canvas.style.height = `${Math.ceil(viewport.height / devicePixelRatio)}px`;

    await firstPage.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    canvas.classList.add("certificate-canvas-loaded");

    elements.placeholder?.classList.add("certificate-placeholder-hidden");

    firstPage.cleanup();
  } catch (error: unknown) {
    console.error(`Could not render certificate preview "${pdfUrl}":`, error);

    showPreviewError(canvas);
  } finally {
    await loadingTask.destroy();
  }
}

function getPreviewElements(canvas: HTMLCanvasElement): PreviewElements {
  const preview = canvas.closest<HTMLElement>(".certificate-preview");

  return {
    canvas,
    placeholder:
      preview?.querySelector<HTMLElement>(".certificate-preview-placeholder") ??
      null,
  };
}

function showPreviewError(canvas: HTMLCanvasElement): void {
  const { placeholder } = getPreviewElements(canvas);

  if (!placeholder) {
    return;
  }

  placeholder.classList.add("certificate-preview-error");

  placeholder.innerHTML = `
    <i
      class="bi bi-file-earmark-pdf"
      aria-hidden="true"
    ></i>

    <span>
      Preview unavailable
    </span>

    <small>
      Click to open the PDF
    </small>
  `;
}
