/**
 * Représente une erreur renvoyée par l'API
 */
export class ApiErrors {
    constructor(errors) {
        this.errors = errors
    }

    get errorsPerField() {
        return this.errors.reduce((acc, error) => {
            return { ...acc, [error.field]: error.message }
        }, {})
    }
}


/**
 * @param {string} endpoint 
 * @param {object} options 
 */
export async function apiFetch(endpoint, options = {}) {
    options = {
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        ...options
    }
    if (options.body !== null && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body)
        options.headers['Content-Type'] = 'application/json'
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api' + endpoint, options)
        if (response.status === 204) {
            return null;
        }
        const responseData = await response.json()
        if (response.ok) {
            return responseData;
        } else {
            if (responseData.errors) {
                throw new ApiErrors('API_ERROR' + responseData.errors)
            }
        }
    } catch (error) {
        throw new Error('Erreur de connexion attrapée : ' + error.message)
    }

}