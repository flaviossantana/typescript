import {Negociacoes, Negociacao, NegociacaoParcial} from "../models/index";
import {MensagemView, NegociacoesView} from "../views/index";
import {logarTempoDeExecucao, throttle, domInject} from '../helpers/decorators/index';
import * as JQuery from "jquery";
import {NegociacaoService} from "../service/NegociacaoService";
import {imprime} from "../helpers/Utils";

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputVaor: JQuery;

    private _negociacoes = new Negociacoes();

    private _negociacoesView = new NegociacoesView('#negociacoesView', true);

    private _mensagemView = new MensagemView('#mensagemView', true);

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(500)
    importarDados() {

        function isOk(res: Response): Response {

            if (res.ok) {
                return res;
            } else {
                throw Error(res.statusText);
            }
        }

        this._negociacaoService.obterNegociacoes(isOk)
            .then(negociacoesParaImportar => {

                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao =>
                        !negociacoesJaImportadas.some(jaImportada =>
                            negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao =>
                            this._negociacoes.adiciona(negociacao) )

                this._negociacoesView.update(this._negociacoes);

            });

    }

    @throttle(500)
    adiciona(event: Event) {

        let inicio = performance.now();

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputVaor.val())
        );


        this._negociacoes.adiciona(negociacao);

        if (this._ehDiaUtil(negociacao.data)) {
            this._mensagemView.update('Somente negociações em dias úteis!');
            return;
        }

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

        imprime(negociacao, this._negociacoes);

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