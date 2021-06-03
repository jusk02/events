const sampleTodo = document.querySelector('.sample');
const addTodo = document.querySelector('.add');
const todosList = document.querySelector('.todos');




addTodo.addEventListener('click', (e) => {
  const newTodo = sampleTodo.cloneNode(true);
  newTodo.classList.remove('hide', 'sample')
  addListeners(newTodo);
  todosList.appendChild(newTodo);
})

const addListeners = (todo) => {
  const heading = todo.querySelector('.heading');
  const title = todo.querySelector('.trigger-link');
  const publishButton = todo.querySelector('.publish-trigger');
  const expandButton = todo.querySelector('.expand-trigger');
  const destroyButton = todo.querySelector('.destroy-trigger');
  const contents = todo.querySelector('.contents');

  const todoSelectors = {
    todo,
    heading,
    title,
    publishButton,
    expandButton,
    destroyButton,
    contents
  }

  todo.addEventListener('click', (event) => {
    toggleTodoState(todoSelectors);
  })

  title.addEventListener('click', (event) => {
    event.preventDefault();
  })

  title.addEventListener('mouseenter', (event) => {
    if (!contents.matches('.contents--open') && !todo.matches('.todo--published')) {
      contents.classList.add('contents--preview')
    }
  })

  title.addEventListener('mouseleave', (event) => {
    contents.classList.remove('contents--preview')
  })

  expandButton.addEventListener('click', (event) => {
    event.stopPropagation()
    toggleTodoState(todoSelectors);
  })

  destroyButton.addEventListener('click', (event) => {
    destroyOrRestoreTodo({...todoSelectors, event})
    if (isOpen(todoSelectors)) {
      toggleTodoState(todoSelectors);
    }
  })

  contents.addEventListener('click', (event) => {
    event.stopPropagation()
  });

  contents.addEventListener('cut',makePrivate);

  contents.addEventListener('copy',makePrivate);

  publishButton.addEventListener('click', (event) => {
    publishTodo({...todoSelectors, event});
  })

  contents.addEventListener('focus', (event) => {
    event.target.style.background = 'pink';
  });

  contents.addEventListener('blur', (event) => {
    event.target.style.background = 'none';
  });
}

const toggleTodoState = ({expandButton, contents}) => {
  expandButton.innerText = expandButton.innerText === "expand" ? "condense" : "expand";
  contents.classList.toggle('contents--open')
  if (contents.matches('.contents--preview')) {
    contents.classList.remove('contents--preview')
  }
}

const isOpen = ({contents}) => contents.matches('.contents--open');

const makePrivate = (event) => {
  alert("hey not nice");
  event.preventDefault();
}

const publishTodo = (config) => {
  const {contents, publishButton, event, todo} = config;
  event.stopPropagation();
  publishButton.innerText = "published!";
  publishButton.setAttribute("disabled", "");
  contents.removeEventListener('cut',makePrivate);
  contents.removeEventListener('copy',makePrivate);
  todo.classList.add('todo--published');
}

const destroyOrRestoreTodo = ({todo, destroyButton, event}) => {
  event.stopPropagation();
  todo.classList.toggle('todo--destroyed')
  destroyButton.innerText = destroyButton.innerText === "X" ? "Restore" : "X"
}
