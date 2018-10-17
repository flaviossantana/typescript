class MensagemView extends View<string> {

    template(model: String): string {
        return `<p class="alert alert-info">${model}</p>`;
    }

}