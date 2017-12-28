//Budget Controller
let budgetController = (function() {
  //....
})();

//UI Controller
let UIController = (function() {
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getinput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

let controller = ((budgetCtrl, UICtrl) => {
  let DOMstrings = UICtrl.getDOMstrings();

  ctrlAddItem = () => {
    //1. Get the field input data
    let input = UICtrl.getinput();
    console.log(input);

    //2. Add the item to the budget controller
    //3. Add the item to the UI
    //4. Calculate the budget
    //5. Display the budget on the UI
  };

  document
    .querySelector(DOMstrings.inputBtn)
    .addEventListener('click', ctrlAddItem);
  document.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
      event.preventDefault(); // prevents the enter key from also triggering a click event
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
