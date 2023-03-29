import { IEmoji } from "../Interfaces"
import config from "../config.json"


export function getAllEmojis() {
    let emojis:{[key:string]:IEmoji} = config.emojis
    let emojiKeys = Object.keys(emojis)
    let allEmojis:IEmoji[] = []

    emojiKeys.forEach( (emojiKey) => {
        allEmojis.push(emojis[emojiKey])
    })

    return allEmojis
}


export function getEmoji(emojiString:string) {
    let emojis:{[key:string]:IEmoji} = config.emojis
    return emojis[emojiString]
}