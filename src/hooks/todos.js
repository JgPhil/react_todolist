import { useCallback, useReducer } from "react"
import { apiFetch } from "../utils/api"

function reducer(state, action) {
    console.log('TODOS_REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_TODOS':
            return { ...state, loading: true }
        case 'SET_TODOS':
            return { ...state, todos: action.payload, loading: false }
        case 'DELETE_TODOS':
            return { ...state, todos: state.todos.filter(i => i !== action.payload) }
        case 'ADD_TODOS':
            return { ...state, todos: [action.payload, ...state.todos] }
        case 'UPDATE_TODOS':
            return { ...state, todos: state.todos.map(i => i === action.target ? action.payload : i) }
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}

export function useTodos() {
    const [state, dispatch] = useReducer(reducer, {
        todos: null,
        loading: false
    })

    return {
        todos: state.todos,
        fetchTodos: useCallback(async function () {
            if (state.loading || state.todos) {
                return;
            }
            dispatch({ type: 'FETCHING_TODOS' })
            const todos = await apiFetch('/todos')
            dispatch({ type: 'SET_TODOS', payload: todos })
        }, [state]),
        deleteTodo: useCallback(async function (todo) {
            await apiFetch('/todos/' + todo.id, {
                method: 'DELETE'
            })
            dispatch({ type: 'DELETE_TODO', payload: todo })
        }, []),
        updateTodo: useCallback(async function (todo, data) {
            const newTodo = await apiFetch('/todos/' + todo.id, {
                method: 'PUT',
                body: data
            })
            dispatch({ type: 'UPDATE_TODO', payload: newTodo, target: todo })
        }, []),
        createTodo: useCallback(async function (data) {
            const newTodo = await apiFetch('/todo', {
                method: 'POST',
                body: data
            })
            dispatch({ type: 'ADD_TODO', payload: newTodo })
        }, [])
    }
}