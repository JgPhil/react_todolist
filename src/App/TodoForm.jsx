import { Button, Form, Image } from "react-bootstrap";
import { useToggle } from "../hooks";


export function TodoForm({ categories, createTodo, createCategory }) {

    const [addCategory, toggleAddCategory] = useToggle(false)

    const handleSubmitCategory = async function (e) {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        createCategory(formDataObj)
    }

    const handleSubmitTodo = async function (event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const formDataObj = Object.fromEntries(formData.entries())
        const categoryId = categories.find(e => e.title === formDataObj['category'])['id']
        formDataObj['category'] = '/api/categories/' + categoryId
        createTodo(formDataObj)
    }
    return <>
        <Form onSubmit={handleSubmitTodo}>
            <Form.Group controlId="todoTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control name="title" type="text" placeholder="par ex: sortir le chat..." />
            </Form.Group>
            <Form.Group controlId="todoContent">
                <Form.Label>Contenu</Form.Label>
                <Form.Control name="content" type="text-area" placeholder="par ex: Penser à sortir le chat pour le laisser à nouveau rentrer dans 10 min..." />
            </Form.Group>
            <Form.Group controlId="todoCategory">
                <Form.Label>Catégories</Form.Label>
                <Form.Control name="category" as="select">
                    {categories ?
                        categories.map(c => <option key={c.title}>{c.title}</option>)
                        :
                        ''
                    }
                </Form.Control>
                <Button size="sm" className="my-2" onClick={() => {
                    toggleAddCategory()
                    }
                    }>
                    {addCategory ?
                        <Image src="images/lettre-x.png" /> :
                        <Image src="images/plus.png" />
                    }
                </Button>
            </Form.Group>
            {
                !addCategory &&

                <Button type="submit">Créer un Todo</Button>
            }
        </Form>
        {
            addCategory &&
            <Form className="mb-4" onSubmit={handleSubmitCategory}>
                <Form.Group controlId="CategoryTitle">
                    <Form.Control name="title" type="text" placeholder="Veuillez entrer le titre de la catégorie" />
                </Form.Group>
                <Button type="submit">Ajouter la catégorie</Button>
            </Form>
        }
    </>
}