import {NegociacaoParcial} from "../models/NegociacaoParcial";
import {Negociacao} from "../models/Negociacao";

export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunciton): Promise<Negociacao[]> {

        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado =>
                    new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => console.log(err));

    }

}

export interface HandlerFunciton {

    (res: Response): Response;

}