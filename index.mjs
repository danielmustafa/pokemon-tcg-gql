//const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'
import { PokemonAPI } from './api/PokemonAPI.mjs'

const typeDefs = gql`

type Card {
    name: String
    id: String
    nationalPokedexNumber: Int
    imageUrl: String
    imageUrlHiRes: String
    types: [String]
    supertype: String
    subtype: String
    evolvesFrom: String
    hp: String
    retreatCost: [String]
    number: String
    artist: String
    rarity: String
    series: String
    set: String
    setCode: String
    ability: Ability
    attacks: [Attack]
    weaknesses: [Weakness]
}

type Attack {
    name: String
    cost: [String]
    text: String
    damage: String
    convertedEnergyCost: Int
}

type Weakness {
    type: String
    value: String
}

type Ability {
    name: String
    text: String
    type: String
}

type Query {
    cards(page: Int, pageSize: Int, name: String, id: String, nationalPokedexNumber: String, types: String, subtype: String, supertype: String, hp: String, number: String, artist: String, rarity: String, series: String, set: String, setCode: String, retreatCost: String, convertedRetreatCost: String, text: String, attackDamage: String, attackCost: String, attackName: String, attackText: String, weaknesses: String, resistances: String, ancientTrait: String, abilityName: String, abilityText: String, abilityType: String, evolvesFrom: String, contains: String): [Card]
}`

const resolvers = {
    Query: { 
        cards: (_source, _args, { dataSources }) => {
            return dataSources.pokemonAPI.getCards(_args)
        }
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => {
        return {
            pokemonAPI: new PokemonAPI()
        }
    }})

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`)
    })