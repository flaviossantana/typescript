import {Imprimivel, Negociacao} from "./index";

export class Negociacoes extends Imprimivel{

    //Bem Loko
    private _negociacoes: Array<Negociacao> = [];


    adiciona(negociacao: Negociacao){

        this._negociacoes.push(negociacao);
    }

    paraArray() : Negociacao[]{
        return ([] as Negociacao []).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('[NEGOCIACOES]');
        console.log(JSON.stringify(this._negociacoes));
    }

}