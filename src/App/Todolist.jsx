import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Image, Row } from "react-bootstrap";

export function Todolist({todos, onDetailShow}) {
  return <>
    { todos && todos.map(todo => <TodoCard key={todo.id} data={todo} onDetailShow={onDetailShow} />)}
  </>
}

function TodoCard({ data, onDetailShow }) {
  function handleClick(event) {
    event.preventDefault()
    const id = event.target.getAttribute('todo-id')
    onDetailShow(id)
  }

  const iconSrc = data.isDone ? "images/check.png" : "images/to-do-list.png"
  return <Card ky={data.id} style={{ width: '18rem' }}>
    <Card.Body>
      {/* {console.log(data)} */}
      <Card.Title>{data.title}</Card.Title>
      <Card.Text>
        {data.content}
      </Card.Text>
      <Row>
        <Button variant="primary" todo-id={data.id} onClick={handleClick}>Voir</Button>
        <Image src={iconSrc} className="ml-auto mr-2" fluid></Image>
      </Row>
    </Card.Body>
  </Card>
}


Todolist.propTypes = {};
