
export const scrollContent = (scrollItem: string, panelsRefs: any) => {

  //console.log(scrollItem);
  //console.log(panelsRefs.spotlightPanelRef.value);

  const itemOffsetTop = panelsRefs[scrollItem].value.offsetTop;
  const scrollContentOffsetHeight = panelsRefs.scrollContainer.value.offsetHeight;
  const scrollContentOffsetTop = panelsRefs.scrollContainer.value.offsetTop;

  //console.log(`itemOffsetTop ${itemOffsetTop} scrollContentOffsetHeight ${scrollContentOffsetHeight}`);

  const scrollDiff = (scrollContentOffsetHeight + scrollContentOffsetTop) - itemOffsetTop;

  //const scrollTop  = scrollContentOffsetHeight - scrollDiff;
  //console.log(scrollDiff, scrollTop);

  panelsRefs.scrollContainer.value.scrollTop = scrollDiff;

}