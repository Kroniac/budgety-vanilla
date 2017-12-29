//Budget Controller
let budgetController = (() => {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: (type, des, val) => {
      let newItem, ID;

      //create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else ID = 0;
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    }
  };
})();

//UI Controller
let UIController = (() => {
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getinput: () => {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: (obj, type) => {
      // create HTML string with placeholder text
      let html, element, newHtml;
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">%value%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn">' +
          '<i class="ion-ios-close-outline"></i></button>' +
          '</div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="income-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">%value%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div>' +
          '</div>' +
          '</div>';
      }
      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: () => {
      let fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((current, index, array) => {
        current.value = '';
      });
      fieldsArr[0].focus();
    },
    getDOMstrings: () => {
      return DOMstrings;
    }
  };
})();

let controller = ((budgetCtrl, UICtrl) => {
  let setupEventListeners = () => {
    document
      .querySelector(DOMstrings.inputBtn)
      .addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        event.preventDefault(); // prevents the enter key from also triggering a click event
        ctrlAddItem();
      }
    });
  };

  let DOMstrings = UICtrl.getDOMstrings();

  ctrlAddItem = () => {
    let input, newItem;

    //1. Get the field input data
    input = UICtrl.getinput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4.Clear the fields
      UICtrl.clearFields();
      //5. Calculate the budget
      //6. Display the budget on the UI
    }
  };

  return {
    init: () => {
      console.log('Application has started');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

//initiating event listeners
controller.init();
