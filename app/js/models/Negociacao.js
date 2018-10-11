class Negociacao{

    constructor(data, quantiade, valor){

        this._data = data;
        this._quantidade = quantiade;
        this._valor = valor;
    }


    get data(){
        return this._data;
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    get volume(){
        return this._quantidade * this._valor;    
    }
}