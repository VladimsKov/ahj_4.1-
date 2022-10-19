import isValidInn from './validators';
import cardSysValidate from './pay.system.check';

export default class CardValidateWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <div class="cards-block"></div>
    <form data-widget="cardnumber-form-widget" class="form-container">
    <div class="form-control">
    <label for="cardnumber-input">Введите номер карты</label>
    <input id="cardnumber-input" data-id="cardnumber-input" type="text">
    </div>
    <button class="btn" data-id="cardnumber-submit">Click to Validate</button>
    </form>
    <div class="error-check hidden"></div>
    `;
  }

  static get inputSelector() {
    return '[data-id=cardnumber-input]';
  }

  static get submitSelector() {
    return '[data-id=cardnumber-submit]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.cardBlock = this.parentEl.querySelector('.cards-block');
    for (let i = 1; i < 6; i += 1) {
      this.cardBlock.insertAdjacentHTML('beforeend', `<div class='card card-id-${i}'></div>`);
    }
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', (evt) => this.onSubmit(evt));
    this.inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    this.errorBlock = this.parentEl.querySelector('.error-check');
    this.inputEl.addEventListener('input', () => {
      CardValidateWidget.removeClass(this.inputEl, 'invalid');
      CardValidateWidget.removeClass(this.inputEl, 'valid');
      CardValidateWidget.addClass(this.errorBlock, 'hidden');
      if (this.cardId) {
        CardValidateWidget.removeClass(this.activeCard, 'card-active');
      }
    });
  }

  static addClass(elem, className) {
    if (!elem.classList.contains(`${className}`)) {
      elem.classList.add(`${className}`);
    }
  }

  static removeClass(elem, className) {
    if (elem.classList.contains(`${className}`)) {
      elem.classList.remove(`${className}`);
    }
  }

  onSubmit(evt) {
    // add event listeners here
    evt.preventDefault();

    if (isValidInn(this.inputEl.value)) {
      this.cardId = cardSysValidate(this.inputEl.value);
      if (this.cardId) {
        this.activeCard = this.cardBlock.querySelector(`.card-id-${this.cardId}`);
        CardValidateWidget.addClass(this.activeCard, 'card-active');
        CardValidateWidget.addClass(this.errorBlock, 'hidden');
      } else {
        this.errorBlock.innerText = 'Неизвестная платежная система';
        CardValidateWidget.removeClass(this.errorBlock, 'hidden');
      }
      CardValidateWidget.removeClass(this.inputEl, 'invalid');
      CardValidateWidget.addClass(this.inputEl, 'valid');
    } else {
      this.errorBlock.innerText = 'Некорректный номер карты';
      CardValidateWidget.addClass(this.inputEl, 'invalid');
      CardValidateWidget.removeClass(this.inputEl, 'valid');
      CardValidateWidget.removeClass(this.errorBlock, 'hidden');
      this.errorBlock.innerText = 'Некорректный номер карты';
    }
  }
}
