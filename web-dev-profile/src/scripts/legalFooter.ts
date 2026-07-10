type LegalSectionName = "imprint" | "privacy";

export function initLegalFooter(): void {
  const footer = document.querySelector<HTMLElement>("#footer");
  const panel = document.querySelector<HTMLElement>("#footer-legal-panel");

  const closeButton = document.querySelector<HTMLButtonElement>(
    "#footer-legal-close",
  );

  const openButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-legal-target]"),
  );

  const legalLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      'a[href="#imprint"], a[href="#privacy"]',
    ),
  );

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-legal-section]"),
  );

  if (!footer || !panel || !closeButton) {
    return;
  }

  let activeSection: LegalSectionName | null = null;

  const isLegalSectionName = (
    value: string | undefined,
  ): value is LegalSectionName => {
    return value === "imprint" || value === "privacy";
  };

  const updateButtons = (): void => {
    openButtons.forEach((button) => {
      const target = button.dataset.legalTarget;
      const isActive = isLegalSectionName(target) && target === activeSection;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-expanded", String(isActive));
    });
  };

  const scrollToSection = (sectionName: LegalSectionName): void => {
    const section = document.querySelector<HTMLElement>(
      `[data-legal-section="${sectionName}"]`,
    );

    if (!section) {
      return;
    }

    /*
     * Kurz warten, bis max-height, visibility und hidden
     * im Browser übernommen wurden.
     */
    window.setTimeout(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const openLegalSection = (
    sectionName: LegalSectionName,
    shouldScroll = true,
  ): void => {
    activeSection = sectionName;

    sections.forEach((section) => {
      const isSelected = section.dataset.legalSection === sectionName;

      section.hidden = !isSelected;
      section.classList.toggle("active", isSelected);
    });

    footer.classList.add("legal-open");
    panel.setAttribute("aria-hidden", "false");

    updateButtons();

    if (shouldScroll) {
      scrollToSection(sectionName);
    }
  };

  const closeLegalPanel = (): void => {
    activeSection = null;

    footer.classList.remove("legal-open");
    panel.setAttribute("aria-hidden", "true");

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    updateButtons();

    window.setTimeout(() => {
      sections.forEach((section) => {
        section.hidden = true;
      });
    }, 500);
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.legalTarget;

      if (!isLegalSectionName(target)) {
        return;
      }

      if (footer.classList.contains("legal-open") && activeSection === target) {
        closeLegalPanel();
        return;
      }

      openLegalSection(target);
    });
  });

  legalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const target = link.hash.replace("#", "");

      if (!isLegalSectionName(target)) {
        return;
      }

      openLegalSection(target);
    });
  });

  closeButton.addEventListener("click", closeLegalPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && footer.classList.contains("legal-open")) {
      closeLegalPanel();
    }
  });
}
