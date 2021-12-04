class Account {
    /**
     * @returns {Account}
     * @param {String} uuid uuid of user
     * @param {String} current current username of user
     * @param {Array<PreviousName>} past previous names of the user
     */
    constructor(uuid, current, past) {
        this.uuid = uuid
        this.username = current
        this.history = past

        return this
    }

    /**
     * @returns {Map<Number, Array<String>}
     * @param {Number} size size of the pages for name history. default: 7
     * @param {String} format format to use when converting previous name to string. default: "$username | $date"
     */
    toPages(size, format) {
        const pages = new Map()

        if (!size) {
            size = 7
        }

        if (!format) {
            format = "$username | $date"
        }

        this.history.forEach((item) => {
            const value = item.toString(format)

            if (pages.size == 0) {
                const value1 = [value]

                pages.set(1, value1)
            } else {
                const lastPage = pages.size

                if (pages.get(lastPage).length >= size) {
                    const value1 = [value]

                    pages.set(lastPage + 1, value1)
                } else {
                    pages.get(lastPage).push(value)
                }
            }
        })

        return pages
    }
}

exports.Account = Account

class PreviousName {
    /**
     *
     * @param {String} username the username that the account was changed to
     * @param {String} date the date that the username was changed
     * @returns {PreviousName}
     */
    constructor(username, date) {
        this.username = username
        this.date = date

        return this
    }

    /**
     *
     * @returns {String} formatted version of the date
     */
    getFormattedDate() {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Intl.DateTimeFormat("en-US", options)
            .format(this.date)
            .toLowerCase()
            .split(",")
            .join("")
    }

    /**
     *
     * @param {String} format format to use when converting to string default: "$username | $date"
     * @returns {String}
     */
    toString(format) {
        if (!format) {
            format = "$username | $date"
        }

        let response = format.replace("$username", this.username)
        if (this.date) {
            response = response.replace("$date", this.getFormattedDate())
        } else {
            response = response.replace("$date", "first name")
        }

        return response
    }
}

exports.PreviousName = PreviousName
