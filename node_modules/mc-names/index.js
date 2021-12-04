const fetch = require("node-fetch")
const { Skin } = require("./utils/classes/Skin")
const { PreviousName, Account } = require("./utils/classes/NameHistory")

/**
 *
 * @param {String} username username of user
 * @returns {String} minecraft UUID
 */
async function getUUID(username) {
    const uuidURL = "https://api.mojang.com/users/profiles/minecraft/" + username

    let res

    try {
        res = await fetch(uuidURL).then((uuid) => uuid.json())
    } catch {
        return undefined
    }

    if (!res.id) {
        return undefined
    } else {
        return res.id
    }
}

exports.getUUID = getUUID

/**
 * @returns {Promise<Skin>}
 * @param {String} username
 */
async function getSkin(username) {
    const uuid = await getUUID(username)

    if (!uuid) {
        return undefined
    }

    const head = `https://mc-heads.net/avatar/${uuid}`
    const full = `https://mc-heads.net/player/${uuid}`
    const download = `https://mc-heads.net/skin/${uuid}`
    const render = `https://visage.surgeplay.com/full/${uuid}`
    const headRender = `https://visage.surgeplay.com/head/${uuid}`
    let optifineCape = `http://s.optifine.net/capes/${username}.png`
    let mojangCape = `https://crafatar.com/capes/${uuid}`

    let res = await fetch(optifineCape)

    if (res.status == 404) {
        optifineCape = undefined
    }

    res = await fetch(mojangCape)

    if (res.status == 404) {
        mojangCape = undefined
    }

    return new Skin(head, full, download, render, headRender, optifineCape, mojangCape)
}

exports.getSkin = getSkin

const cache = new Map()

/**
 * @returns {Promise<Account>}
 * @param {String} username username of the user to get previous names for
 */
async function getNameHistory(username) {
    if (username.length > 16) return undefined

    if (cache.has(username.toLowerCase())) {
        return cache.get(username.toLowerCase())
    }

    let invalid = false

    let res = await fetch("https://mc-heads.net/minecraft/profile/" + username)
        .then((url) => {
            return url.json()
        })
        .catch(() => {
            invalid = true
        })

    if (invalid) return undefined

    let pastNames = []
    let currentName
    let uuid

    if (res.error) {
        res = await fetch("https://api.mojang.com/users/profiles/minecraft/" + username).then(
            (url) => {
                return url.json()
            }
        )

        uuid = res.id
        currentName = res.name

        if (!uuid) {
            return undefined
        }

        res = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
            .then((url) => {
                return url.json()
            })
            .catch(() => {
                invalid = true
            })

        if (invalid) return undefined

        pastNames = res
    } else {
        uuid = res.id
        currentName = res.name
        pastNames = res.name_history
    }

    const newPastNames = []

    for (const pastName of pastNames) {
        const a = new PreviousName(pastName.name, pastName.changedToAt)

        newPastNames.push(a)
    }

    newPastNames.reverse()

    const account = new Account(uuid, currentName, newPastNames)

    cache.set(username.toLowerCase(), account)

    setTimeout(() => {
        cache.delete(username)
    }, 20 * 60 * 1000)

    return account
}

exports.getNameHistory = getNameHistory
