import {Negociacao} from "./Negociacao";

export class Negociacoes {

    //Bem Loko
    private _negociacoes: Array<Negociacao> = [];


    adiciona(negociacao: Negociacao){

        this._negociacoes.push(negociacao);
    }

    paraArray() : Negociacao[]{
        return ([] as Negociacao []).concat(this._negociacoes);
    }


}