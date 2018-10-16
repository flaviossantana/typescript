class NegociacaoController{

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputVaor: HTMLInputElement;

    
    constructor(){

        this._inputData = <HTMLInputElement> document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade');
        this._inputVaor = <HTMLInputElement> document.querySelector('#valor');

    }

    adiciona(event: Event) {

        event.preventDefault();

        const negociacao = new Negociacao(
            this._inputData.value,
            this._inputQuantidade.value,
            this._inputVaor.value
        );

        console.log(negociacao);

    }

}