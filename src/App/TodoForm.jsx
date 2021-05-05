import { Button, Form } from "react-bootstrap";


export function TodoForm({ categories, createTodo }) {
    const handleSubmit = async function (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const formDataObj = Object.fromEntries(formData.entries())
        const categoryId = categories.find(e => e.title === formDataObj['category'])['id']
        formDataObj['category'] = '/api/categories/' + categoryId
        createTodo(formDataObj)
    }
    return <Form onSubmit={handleSubmit}>
        <Form.Group controlId="todoTitle">
            <Form.Label>Titre</Form.Label>
            <Form.Control name="title" type="text" placeholder="par ex: sortir le chat..." />
        </Form.Group>
        <Form.Group controlId="todoContent">
            <Form.Label>Contenu</Form.Label>
            <Form.Control name="content" type="text-area" placeholder="par ex: Penser à sortir le chat pour le laisser à nouveau rentrer dans 10 min..." />
        </Form.Group>
        <Form.Group controlId="todoCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control name="category" as="select">
                {categories ?
                    categories.map(c => <option key={c.title}>{c.title}</option>)
                    :
                    ''
                }
            </Form.Control>
        </Form.Group>
        <Button type="submit">Envoyer</Button>
    </Form>
}