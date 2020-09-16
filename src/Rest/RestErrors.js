export default class RestErrors {
    errors = []

    /**
     * @param {RestError} error
     */
    add(error) {
        this.errors.push(error)
    }

    set(index, error) {
        this.errors[index] = error
    }

    hasErrors() {
        return this.errors.length > 0
    }

    hasError(field) {
        return this.errors.filter((error) => {
            return error.field === field
        }).length > 0
    }

    /**
     * @param {string} field
     * @return {RestError}
     */
    getError(field) {
        const errors = this.errors.filter((error) => {
            return error.field === field
        })
        return errors.length > 0 ? errors[0] : null
    }

    /**
     * @param {string} field
     * @return {array}
     */
    getErrors(field) {
        return this.errors.filter((error) => {
            return error.field === field
        })
    }

    /**
     * @param {string} field
     * @return {array}
     */
    getAllErrors() {
        return this.errors
    }
}
