import {Negociacoes, Negociacao} from "../models/index";
import {MensagemView, NegociacoesView} from "../views/index";

export class NegociacaoController{

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputVaor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView', true);

    
    constructor(){

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputVaor = $('#valor');
        this._negociacoesView.update(this._negociacoes);

    }

    adiciona(event: Event) {

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputVaor.val())
        );


        this._negociacoes.adiciona(negociacao);

        if(this._ehDiaUtil(negociacao.data)){
            this._mensagemView.update('Somente negociações em dias úteis!');
            return;
        }

        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() == DiasDaSemana.Domingo || data.getDay() == DiasDaSemana.Sabado;
    }
}

enum DiasDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}