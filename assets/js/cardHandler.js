export class CardHandler {
  constructor(cards) {
    this.cards = cards;
  }

  addSkillBar(skills) {
    for (let card of this.cards) {
      card.addEventListener("mouseenter", () => {
        const skillId = card.id;
        card.getElementsByClassName("skill-bar")[0].style.visibility =
          "visible";

        card.getElementsByClassName(
          "skill-level"
        )[0].style.width = `${skills[skillId]}%`;
      });
    }
  }
}
