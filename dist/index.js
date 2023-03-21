const membersContainer = document.getElementById('membersContainer');
const membersScrollWidth = membersContainer.scrollWidth;
const membersWidth = membersContainer.clientWidth;
let direction;

window.addEventListener('load', () => {
  self.setInterval(() => {
    if (membersContainer.scrollLeft !== membersScrollWidth - membersWidth && direction == 'L') {
      membersContainer.scrollTo(membersContainer.scrollLeft + .5, 0);
    }
    // else if (membersContainer.scrollLeft == membersScrollWidth - membersWidth) {
    //   direction = 'R'
    //   membersContainer.scrollTo(membersContainer.scrollLeft - .5, 0);
    // }
    // else if (membersContainer.scrollLeft !== 0 && direction == 'R') {
    //   membersContainer.scrollTo(membersContainer.scrollLeft - .5, 0);
    // }
    // else if (membersContainer.scrollLeft == 0) {
    //   direction = 'L'
    //   membersContainer.scrollTo(membersContainer.scrollLeft + .5, 0);
    // }
    // // console.log(direction);
    // console.log(membersContainer.scrollLeft);
    // console.log(membersScrollWidth - membersWidth);
    // console.log(membersScrollWidth);
  }, 15);
});