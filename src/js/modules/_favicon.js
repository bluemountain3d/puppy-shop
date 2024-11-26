export const faviconInit = (() => {
  // Listen for changes in the color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

  function updateFavicon() {
    const darkModeFavicon = [
      { href: "img/icons/logo-white.png" },
      { href: "img/icons/logo-white-32x32.png", sizes: "32x32" },
      { href: "img/icons/logo-white-48x48.png", sizes: "48x48" },
      { href: "img/icons/logo-white-128x128.png", sizes: "128x128" },
      { href: "img/icons/logo-white-256x256.png", sizes: "256x256" },
    ];
  
    const lightModeFavicon = [
      { href: "img/icons/logo-black.png" },
      { href: "img/icons/logo-black-32x32.png", sizes: "32x32" },
      { href: "img/icons/logo-black-48x48.png", sizes: "48x48" },
      { href: "img/icons/logo-black-128x128.png", sizes: "128x128" },
      { href: "img/icons/logo-black-256x256.png", sizes: "256x256" },
    ];
  
    const favicons = document.querySelectorAll('link[rel="shortcut icon"]');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    const faviconSet = prefersDark ? darkModeFavicon : lightModeFavicon;
  
    favicons.forEach((icon, index) => {
      icon.href = faviconSet[index].href;
      if (faviconSet[index].sizes) {
        icon.sizes = faviconSet[index].sizes;
      }
    });
  }

})();