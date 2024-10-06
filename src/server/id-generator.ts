import { faker } from "@faker-js/faker"
import { Player } from "../types/player"

export const generateId = (seed: string): Player | undefined => {
    const seedAsNumber = seed.split("").reduce<number>((acc, char) => Number(acc.toString() + char.charCodeAt(0).toString()), 0)
    if (isNaN(seedAsNumber)) {
        return undefined
    }

    faker.seed(seedAsNumber)
    const randomAnimal = animals.at(seedAsNumber % animals.length)

    if (randomAnimal === undefined) {
        return undefined
    }

    return {
        id: `${faker.word.adjective()} ${faker.word.adjective()} ${randomAnimal.name}`,
        emoji: randomAnimal.emoji
    }
}

const animals = [
    { name: "monkey", emoji: "🐒" },
    { name: "gorilla", emoji: "🦍" },
    { name: "orangutan", emoji: "🦧" },
    { name: "dog", emoji: "🐶" },
    { name: "poodle", emoji: "🐩" },
    { name: "wolf", emoji: "🐺" },
    { name: "fox", emoji: "🦊" },
    { name: "raccoon", emoji: "🦝" },
    { name: "ginger cat", emoji: "🐈" },
    { name: "black cat", emoji: "🐈‍⬛" },
    { name: "lion", emoji: "🦁" },
    { name: "tiger", emoji: "🐯" },
    { name: "leopard", emoji: "🐆" },
    { name: "moose", emoji: "🫎" },
    { name: "donkey", emoji: "🫏" },
    { name: "horse", emoji: "🐎" },
    { name: "unicorn", emoji: "🦄" },
    { name: "zebra", emoji: "🦓" },
    { name: "deer", emoji: "🦌" },
    { name: "bison", emoji: "🦬" },
    { name: "cow", emoji: "🐮" },
    { name: "ox", emoji: "🐂" },
    { name: "water buffalo", emoji: "🐃" },
    { name: "bull", emoji: "🐄" },
    { name: "pig", emoji: "🐷" },
    { name: "boar", emoji: "🐗" },
    { name: "ram", emoji: "🐏" },
    { name: "sheep", emoji: "🐑" },
    { name: "goat", emoji: "🐐" },
    { name: "dromedary camel", emoji: "🐪" },
    { name: "bactrain camel", emoji: "🐫" },
    { name: "llama", emoji: "🦙" },
    { name: "giraffe", emoji: "🦒" },
    { name: "elephant", emoji: "🐘" },
    { name: "mammoth", emoji: "🦣" },
    { name: "rhinoceros", emoji: "🦏" },
    { name: "hippopotamus", emoji: "🦛" },
    { name: "mouse", emoji: "🐭" },
    { name: "rat", emoji: "🐀" },
    { name: "hamster", emoji: "🐹" },
    { name: "rabbit", emoji: "🐰" },
    { name: "chipmunk", emoji: "🐿️" },
    { name: "beaver", emoji: "🦫" },
    { name: "hedgehog", emoji: "🦔" },
    { name: "bat", emoji: "🦇" },
    { name: "bear", emoji: "🐻" },
    { name: "polar bear", emoji: "🐻‍❄️" },
    { name: "koala", emoji: "🐨" },
    { name: "panda", emoji: "🐼" },
    { name: "sloth", emoji: "🦥" },
    { name: "otter", emoji: "🦦" },
    { name: "skunk", emoji: "🦨" },
    { name: "kangaroo", emoji: "🦘" },
    { name: "badger", emoji: "🦡" },
    { name: "turkey", emoji: "🦃" },
    { name: "chicken", emoji: "🐔" },
    { name: "rooster", emoji: "🐓" },
    { name: "chick", emoji: "🐤" },
    { name: "bird", emoji: "🐦" },
    { name: "penguin", emoji: "🐧" },
    { name: "dove", emoji: "🕊️" },
    { name: "eagle", emoji: "🦅" },
    { name: "duck", emoji: "🦆" },
    { name: "swan", emoji: "🦢" },
    { name: "owl", emoji: "🦉" },
    { name: "dodo", emoji: "🦤" },
    { name: "flamingo", emoji: "🦩" },
    { name: "peacock", emoji: "🦚" },
    { name: "parrot", emoji: "🦜" },
    { name: "black bird", emoji: "🐦‍⬛" },
    { name: "goose", emoji: "🪿" },
    { name: "phoenix", emoji: "🐦‍🔥" },
    { name: "snail", emoji: "🐌" },
    { name: "butterfly", emoji: "🦋" },
    { name: "bug", emoji: "🐛" },
    { name: "ant", emoji: "🐜" },
    { name: "honeybee", emoji: "🐝" },
    { name: "beetle", emoji: "🪲" },
    { name: "lady beetle", emoji: "🐞" },
    { name: "cricket", emoji: "🦗" },
    { name: "cockroach", emoji: "🪳" },
    { name: "spider", emoji: "🕷️" },
    { name: "scorpion", emoji: "🦂" },
    { name: "mosquito", emoji: "🦟" },
    { name: "fly", emoji: "🪰" },
    { name: "worm", emoji: "🪱" },
    { name: "microbe", emoji: "🦠" }
] as const
