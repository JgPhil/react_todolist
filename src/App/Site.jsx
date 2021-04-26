import React, { useEffect } from "react";
import { useToggle } from "../hooks";
import { useTodos } from "../hooks/todos";
import { Modal } from "../ui/Modal";
import { Todolist } from "./Todolist";

export function Site() {
  const [add, toggleAdd] = useToggle(false);
  const { todos, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <NavBar onButtonClick={toggleAdd} />
      <div className="container">
        {add && (
          <Modal title="Créer un Todo" onClose={toggleAdd}>
            Créer un formulaire de création / édition de Todo
          </Modal>
        )}
        <Todolist todos={todos} />
      </div>
    </>
  );
}

function NavBar({ onButtonClick }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="navbar-brand">Todos</div>
      <button onClick={onButtonClick} className="ml-auto btn btn-outline-light">
        Ajouter un Todo
      </button>
    </nav>
  );
}
