class Negociacoes {

    //Bem Loko
    private _negociacoes: Array<Negociacao> = [];


    adiciona(negociacao: Negociacao){

        this._negociacoes.push(negociacao);

    }

    paraArray() : Negociacao[]{
        return [].concat(this._negociacoes);
    }


}