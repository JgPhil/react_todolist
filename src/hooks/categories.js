import { useCallback, useReducer } from "react"
import { apiFetch } from "../utils/api"

function reducer(state, action) {
    console.log('CATEGORIES_REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_CATEGORIES':
            return { ...state, loading: true }
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload, loading: false }
        case 'CREATE_CATEGORY':
            return { ...state, category: action.payload }
        case 'DELETE_CATEGORY':
            return { ...state, categories: state.categories.filter(c => c !== action.payload) }
        case 'UPDATE_CATEGORY':
            return { ...state, categories: state.categories.map(i => i === action.target ? action.payload : i) }
        default:
            throw new Error('Action inconnue ' + action.type)
    }
}

export function useCategories() {
    const [state, dispatch] = useReducer(reducer, {
        categories: null,
        loading: false
    })

    return {
        categories: state.categories,
        fetchCategories: useCallback(async function () {
            if (state.loading || state.categories) {
                return;
            }
            dispatch({ type: 'FETCHING_CATEGORIES' })
            const categories = await apiFetch('/categories')
            dispatch({ type: 'SET_CATEGORIES', payload: categories })
        }, [state]),
        deleteCategory: useCallback(async function (data) {
            await apiFetch('/categories/' + data.id, {
                method: 'DELETE'
            })
            dispatch({ type: 'DELETE_CATEGORY', payload: data })
        }, []),
        createCategory: useCallback(async function (data) {
            const newCategory = await apiFetch('/categories', {
                method: 'POST',
                body: data
            })
            dispatch({ type: 'CREATE_CATEGORY', payload: newCategory })
            dispatch({ type: 'FETCHING_CATEGORIES' })
            const categories = await apiFetch('/categories')
            dispatch({ type: 'SET_CATEGORIES', payload: categories })
        }, []),
        updateCategory: useCallback(async function (data) {
            const updCategory = await apiFetch('/categories/' + data.id, {
                method: 'PUT',
                body: data
            })
            dispatch({ type: 'UPDATE_CATEGORY', payload: updCategory })
        }, [])
    }
}