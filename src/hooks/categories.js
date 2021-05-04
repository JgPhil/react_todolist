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
        deleteCategory: useCallback(async function (category) {
            await apiFetch('/categories/' + category.id, {
                method: 'DELETE'
            })
            dispatch({ type: 'DELETE_CATEGORY', payload: category })
        }, []),
        createCategory: useCallback(async function (data) {
            const newCategory = await apiFetch('/categories', {
                method: 'POST',
                body: data
            })
            dispatch({ type: 'CREATE_CATEGORY', payload: newCategory })
        }, [])
    }
}