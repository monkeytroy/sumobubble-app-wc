
export const scrollContent = (scrollItem: string, panelsRefs: any) => {

  //console.log(scrollItem);
  //console.log(panelsRefs.spotlightPanelRef.value);

  const itemHeight = panelsRefs[scrollItem].value.offsetHeight;
  const itemOffsetTop = panelsRefs[scrollItem].value.offsetTop;
  const scrollContentOffsetHeight = panelsRefs.scrollContainer.value.offsetHeight;
  const scrollContentOffsetTop = panelsRefs.scrollContainer.value.offsetTop;

  // console.log(`itemOffsetTop ${itemOffsetTop}`);
  // console.log(`itemHeight ${itemHeight}`);
  // console.log(`scrollContentOffsetHeight ${scrollContentOffsetHeight}`);
  // console.log(`scrollContentOffsetTop ${scrollContentOffsetTop}`);

  const scrollTop  = (itemOffsetTop + itemHeight) - (scrollContentOffsetHeight + scrollContentOffsetTop);

  //console.log(`scrollTop ${scrollTop}`);

  panelsRefs.scrollContainer.value.scrollTop = scrollTop;

}