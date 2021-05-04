import { Button, Form, Image, ListGroup } from "react-bootstrap";


export function CategoryForm({ categories, createCategory, deleteCategory, onNewCategoryClick }) {

    const handleSubmit = async function (e) {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        createCategory(formDataObj)
        onNewCategoryClick()
    }

    return <>
        <ListGroup as="ul">
            {
                categories.map(c =>
                    <ListGroup.Item key={c.id} className="d-flex">
                        {c.title}
                        <a className="ml-auto" href="">
                            <Image src="images/pen.png" />
                        </a>
                        <a className="ml-2" href="">
                            <Image src="images/trash.png" />
                        </a>
                    </ListGroup.Item>)

            }
        </ListGroup>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-5" controlId="CategoryTitle">
                <Form.Label className="font-weight-bold">Ajouter une catégorie de Todo</Form.Label>
                <Form.Control name="title" type="text" placeholder="Veuillez entrer le titre de la catégorie" />
            </Form.Group>
            <Button type="submit" /* onClick={onNewCategoryClick} */ >Envoyer</Button>
        </Form>
    </>
}
