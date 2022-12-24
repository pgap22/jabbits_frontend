const theme = (theme) => {
  // Whenever the user explicitly chooses light mode
  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    return;
  }
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    return;
  }
  if (theme === "system") {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};
export default theme;
