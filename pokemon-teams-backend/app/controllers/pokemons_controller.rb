class PokemonsController < ApplicationController

    def index 
        render json: Pokemon.all
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length >= 6
            render json: {
                error: true,
                message: 'Fuck you'
            }
        else
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            render json: Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
   
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.destroy
    end

end
