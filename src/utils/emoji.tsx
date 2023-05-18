import { IEmoji } from "../Interfaces"
import config from "../config.json"

const watchlistEmojiKeys = ["😀","🤣","😘","😭","😳","🤪","🤢","🤓","👽"]


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


export function getAllWatchlistEmojis() {
    let emojis:{[key:string]:IEmoji} = config.emojis
    let emojiKeys = Object.keys(emojis)
    let watchlistEmojis:IEmoji[] = []

    emojiKeys.forEach( (emojiKey) => {
        if (watchlistEmojiKeys.includes(emojiKey)) {
            watchlistEmojis.push(emojis[emojiKey])
        }
    })

    return watchlistEmojis
}