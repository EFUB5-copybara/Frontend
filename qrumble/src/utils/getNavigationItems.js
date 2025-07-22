export function getNavigationItems(navigation) {
  return navigation
    .filter((item) => item.display === undefined)
    .map(({ path, icon, activeIcon }) => ({
      path,
      icon,
      activeIcon,
    }));
}
