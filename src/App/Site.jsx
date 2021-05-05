import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useToggle } from "../hooks";
import { useCategories } from "../hooks/categories";
import { useTodos } from "../hooks/todos";
import { Modal } from "../ui/Modal";
import { CategoryForm } from "./CategoryForm";
import { Detail } from "./Detail";
import { TodoForm } from "./TodoForm";
import { Todolist } from "./Todolist";

export function Site() {
  const [addTodo, toggleAddTodo] = useToggle(false);
  const [addCategory, toggleAddCategory] = useToggle(false);
  const [detailShow, toggleDetailShow] = useToggle(false)
  const { todos, fetchTodos, fetchOneTodo, createTodo } = useTodos();
  const { categories, deleteCategory, updateCategory, fetchCategories, createCategory } = useCategories();


  useEffect(() => {
    fetchTodos();
    fetchCategories()
  }, []);


  return (
    <>
      <NavBar
        onNewTodoClick={toggleAddTodo}
        onNewCategoryClick={toggleAddCategory}
        createCategory={createCategory} />
      <Container>
        {addTodo && (
          <Modal title="Créer un Todo" onClose={toggleAddTodo}>
            <TodoForm
              categories={categories}
              createTodo={createTodo}
            />
          </Modal>
        )}
        {addCategory && (
          <Modal title="Catégories" onClose={toggleAddCategory}>
            <CategoryForm
              categories={categories}
              createCategory={createCategory}
              deleteCategory={deleteCategory}
              updateCategory={updateCategory}
            />
          </Modal>
        )}
        {
          detailShow ?
            <Detail onClose={toggleDetailShow}>


            </Detail> :
            <Todolist todos={todos} onDetailShow={fetchOneTodo} />
        }
      </Container>
    </>
  );
}

function NavBar({ onNewTodoClick, onNewCategoryClick }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="navbar-brand">Todos</div>
      <button onClick={onNewTodoClick} className="ml-auto btn btn-outline-light">
        Ajouter un Todo
      </button>
      <button onClick={onNewCategoryClick} className="ml-auto btn btn-outline-light">
        Catégories
      </button>
    </nav>
  );
}
