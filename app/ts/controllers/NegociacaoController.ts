class NegociacaoController{

    private _inputData;
    private _inputQuantidade;
    private _inputVaor;

    
    constructor(){

        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputVaor = document.querySelector('#valor');

    }

    adiciona(event) {

        event.preventDefault();

        const negociacao = new Negociacao(
            this._inputData.value,
            this._inputQuantidade.value,
            this._inputVaor.value
        );

        console.log(negociacao);

    }

}