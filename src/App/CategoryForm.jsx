import { useState } from "react";
import { Button, Form, FormControl, FormGroup, Image, InputGroup, ListGroup } from "react-bootstrap";
import { useToggle } from "../hooks";
import { Modal } from "../ui/Modal";


export function CategoryForm({ categories, createCategory, deleteCategory, updateCategory }) {

    const [input, setInput] = useState(null)
    const [update, toggleUpdate] = useToggle(false)
    const [current, setCurrent] = useState(null)
    const [addCategory, toggleAddCategory] = useToggle(false)
    const [updateGlobal, toggleUpdateGlobal] = useToggle(false)

    const handleSubmitCategory = async function (e) {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        createCategory(formDataObj)
    }

    const handleChange = function (event) {
        setInput(event.target.value)
    }


    const handleUpdate = async function (c) {
        const category = categories.find(e => e.title === c.title)
        category.title = input
        updateCategory(category)
        toggleUpdate()
    }

    const handleToggle = function (c) {
        if (addCategory) {
            toggleAddCategory()
        }
        setCurrent(c)
        toggleUpdate()
    }

    return <>
        <Button size="sm" className="mb-2" onClick={() => {
            if (update) {
                toggleUpdate()
            }
            toggleAddCategory()
        }
        }>
            {addCategory ?
                <Image src="images/lettre-x.png" /> :
                <Image src="images/plus.png" />
            }
        </Button>
        {
            addCategory &&
            <Form className="mb-4" onSubmit={handleSubmitCategory}>
                <Form.Group controlId="CategoryTitle">
                    <Form.Control name="title" type="text" placeholder="Veuillez entrer le titre de la catégorie" />
                </Form.Group>
                <Button type="submit">Envoyer</Button>
            </Form>
        }
        <ListGroup as="ul">
            {
                categories.map(c =>
                    <ListGroup.Item key={c.id} className="d-flex">
                        {c.title}
                        {
                            update && c === current ?
                                <>
                                    <InputGroup className="ml-5 mr-2 w-40">
                                        <FormControl
                                            placeholder="Nouveau nom de la catégorie"
                                            aria-label="nom de la catégorie"
                                            aria-describedby="nom de la catégorie"
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                    <Button type="submit" className="btn-sm mr-5" onClick={() => handleUpdate(c)}>
                                        Modifier
                                   </Button>
                                </>
                                :
                                ''}
                        <a className="ml-auto" onClick={() => handleToggle(c)}>
                            {
                                update && c === current ?
                                    <Image src="images/lettre-x.png" />
                                    :
                                    <Image src="images/pen.png" />
                            }

                        </a>

                        <a className="ml-2" onClick={() => deleteCategory(c)}>
                            <Image src="images/trash.png" />
                        </a>
                    </ListGroup.Item>)
            }
        </ListGroup>
    </>
}
