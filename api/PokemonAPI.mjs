import { RESTDataSource } from 'apollo-datasource-rest'

export class PokemonAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.pokemontcg.io/';
      }

    async getCards(args) {
        console.log(args)
        let results = await this.get('v1/cards', args)
        return results.cards           
    }

    async getSets(args) {
        console.log(args)
        let results = await this.get('v1/sets', args)
        return results.sets
    }
}
