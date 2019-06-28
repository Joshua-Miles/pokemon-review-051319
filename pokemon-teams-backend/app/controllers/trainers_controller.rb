class TrainersController < ApplicationController
    before_action :define_current_pokemon
    
    def create
        pokemon = Pokemon.create(pokemon_params)
        render json: pokemon
    end
    
    def index
        render json: Pokemon.all
    end
    
    def show
        render json: current_pokemon
    end
    
    def update
        current_pokemon.update(pokemon_params)
        render json: current_pokemon
    end
    
    def destroy
        current_pokemon.destroy
        render json: current_pokemon
    end
    
    def pokemon_params
        params.permit(:nickname, :species, :trainer_id)
    end
    
    def define_current_pokemon
        if params[:id]
            @current_pokemon = Pokemon.find(params[:id])
        else
            @current_pokemon = Pokemon.new
        end
    end
    
    def current_pokemon
        @current_pokemon
    end
end
