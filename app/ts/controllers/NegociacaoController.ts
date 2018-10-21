import {Negociacoes, Negociacao} from "../models/index";
import {MensagemView, NegociacoesView} from "../views/index";
import {logarTempoDeExecucao} from '../helpers/decorators/index';
import {domInject} from "../helpers/decorators/domInject";
import * as JQuery from "jquery";

export class NegociacaoController{

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputVaor: JQuery;

    private _negociacoes = new Negociacoes();

    private _negociacoesView = new NegociacoesView('#negociacoesView', true);

    private _mensagemView = new MensagemView('#mensagemView', true);

    constructor(){
        this._negociacoesView.update(this._negociacoes);
    }

    importarDados(){
        alert('oi');
    }

    @logarTempoDeExecucao()
    adiciona(event: Event) {

        let inicio = performance.now();

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