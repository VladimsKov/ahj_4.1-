import { isValidInn } from './validators';
import {cardSysValidate} from './pay.system.check';

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
    for (let i=1; i<6; i++) {
      this.cardBlock.insertAdjacentHTML('beforeend', `<div class='card card-id-${i}'></div>`);
    }
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', evt => this.onSubmit(evt));
    this.inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    this.errorBlock = this.parentEl.querySelector('.error-check');
    this.inputEl.addEventListener('input', () => {
      this.removeClass(this.inputEl, 'invalid');
      this.removeClass(this.inputEl, 'valid'); 
      this.addClass(this.errorBlock, 'hidden');
      if (this.cardId) {
        this.removeClass(this.activeCard, 'card-active');
      }
    })    
  }
  
  addClass(elem, className) {
    if (!elem.classList.contains(`${className}`)) {
      elem.classList.add(`${className}`);
    }
  }
  removeClass(elem, className) {
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
        this.addClass(this.activeCard, 'card-active'); 
        this.addClass(this.errorBlock, 'hidden');     
      } else {
        this.errorBlock.innerText = 'Неизвестная платежная система';
        this.removeClass(this.errorBlock, 'hidden');
      } 
      this.removeClass(this.inputEl, 'invalid');
      this.addClass(this.inputEl, 'valid');      
      
    } else {
      this.errorBlock.innerText = 'Некорректный номер карты';
      this.addClass(this.inputEl, 'invalid');
      this.removeClass(this.inputEl, 'valid'); 
      this.removeClass(this.errorBlock, 'hidden');
      this.errorBlock.innerText = 'Некорректный номер карты';
    }
  }
}
