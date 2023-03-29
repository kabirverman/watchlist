import config from "../config.json"



export function getAllHues() {
    return config.hues
}

export function getRandomHue() {
    let hues = config.hues
    let randomIndex = Math.floor(Math.random()*(hues.length - 1))

    return hues[randomIndex]
}