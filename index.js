const membersContainer = document.getElementById('membersContainer');
const membersScrollWidth = membersContainer.scrollWidth;

window.addEventListener('load', () => {
  self.setInterval(() => {
    if (membersContainer.scrollLeft !== membersScrollWidth) {
      membersContainer.scrollTo(membersContainer.scrollLeft + .5, 0);
    }
    // else if (membersContainer.scrollRight !== membersScrollWidth) {
    //   membersContainer.scrollTo(membersContainer.scrollRight + .5, 0);
    // }
  }, 15);
});