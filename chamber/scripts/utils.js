// ===========================================
// Lira City Chamber of Commerce
// Utility Functions
// ===========================================

/**
 * Update copyright year
 */
export function updateCopyrightYear() {
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

/**
 * Update last modified date
 */
export function updateLastModified() {
    const modified = document.querySelector("#lastModified");

    if (modified) {
        modified.textContent = document.lastModified;
    }
}