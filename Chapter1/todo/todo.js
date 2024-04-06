const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

function addTodo() {
    const todoText = todoInput.value;
    if (todoText !== '') { // 입력된 값이 있으면
        const li = document.createElement('li'); // li엘리먼트 생성
        li.textContent = todoText; // li에 입력받은 텍스트 내용 저장

        const completeBtn = document.createElement('button'); // 완료버튼 생성
        completeBtn.textContent = '완료'; 
        li.appendChild(completeBtn); // li에 버튼 추가
        todoList.appendChild(li);
        todoInput.value = ''; // 입력창 초기화

        completeBtn.addEventListener('click', function () { // 버튼 클릭시 li가 완료함수 실행
            completeTodo(li);
        });
    }
}

function completeTodo(todoItem) {
    todoItem.removeChild(todoItem.querySelector('button')); // 완료버튼 삭제
    const deleteBtn = document.createElement('button'); // 새로운 버튼 생성
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', function () { // 버튼 누를시 삭제
        todoItem.remove();
    });
    todoItem.appendChild(deleteBtn); // 삭제버튼을 아이템에 추가
    doneList.appendChild(todoItem); // 아이템을 완료리스트에 추가
}

todoInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { 
        addTodo();
    }
});


