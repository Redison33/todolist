(function(){
    function createAppTitle(title){
        let appTitle = document.createElement('h2'); //создаем заголовок h2 и помещаем в переменную appTitle
        appTitle.innerHTML = title; // в внутрянку appTitle помещаем title
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        input.addEventListener('input', function () {
            if (input.value !== '' ) {
                button.disabled = false;
            }
            else {
                button.disabled = true;
            }
        })

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        }
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    let arr =[]

    function createTodoItem(obj) {
        let item = document.createElement('li');
        // кнопки помещаем в div
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        // устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex

        item.classList.add('list-group-item', 'd-flex','justify-content-between', 'align-items-center');
        item.textContent = obj.name;
    
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';
    
        if (obj.done == true) {
            item.classList.add('list-group-item-success')
        }

        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success');
            obj.done = true;
            saveArray(arr, listName);
            //console.log(arr);

        })
        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                item.remove();
                
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].id == obj.id) {
                        arr.splice(i, 1);
                    }
                }
                saveArray(arr, listName);
            }
        }) 

        // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
        item,
        doneButton,
        deleteButton,
        }
    }

    function maxID(arr) {
        let max = 0;
        for (const item of arr) {
            if(item.id > max ) {
                max = item.id;
            }
        }
        return max + 1;
    }

    function saveArray(arr, key) {
        localStorage.setItem(key, JSON.stringify(arr));
        //var restoredArr = JSON.parse(localStorage.getItem('arr'));
    }

    function createTodoApp(container, title = 'Список дел', key) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        listName = key;

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        localData = localStorage.getItem(listName);

        console.log(localData);
        console.log(arr);

        if (localData !== null) {
            arr = JSON.parse(localData);
        }

        for (const itemArr of arr) {
            todoItem = createTodoItem(itemArr);
            todoList.append(todoItem.item);
        }

        // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
        // эта строчка необходима, чтобы предотвратить стандартное действия браузера
        // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
        e.preventDefault();
        // игнорируем создание элемента, если пользователь ничего не ввёл в поле
        if (!todoItemForm.input.value) {
            return;
        }
        let obj = {
            name: todoItemForm.input.value,
            done: false,
            id: maxID(arr) //arr.length //0//Math.round(Math.random() * 10)
        }

        

        let todoItem = createTodoItem(obj);
        arr.push(obj);
        saveArray(arr, listName);
        console.log(arr);

        // todoItem.doneButton.addEventListener('click', function() {
        //     todoItem.item.classList.toggle('list-group-item-success');
        //     obj.done = true;
        //     saveArray(arr, listName);
        //     //console.log(arr);

        // })
        // todoItem.deleteButton.addEventListener('click', function() {
        //     if (confirm('Вы уверены?')) {
        //         todoItem.item.remove();
                
        //         for (let i = 0; i < arr.length; i++) {
        //             if(arr[i].id == obj.id) {
        //                 arr.splice(i, 1);
        //             }
        //         }
        //         saveArray(arr, listName);
        //     }
        // }) 
        // создаём и добавляем в список новое дело с названием из поля для ввода
        todoList.append(todoItem.item);
        // обнуляем значение в поле, чтобы не пришлось стирать его вручную
        todoItemForm.button.disabled = true;
        todoItemForm.input.value = '';
        }); 
    }

    window.createTodoApp = createTodoApp;
})()

