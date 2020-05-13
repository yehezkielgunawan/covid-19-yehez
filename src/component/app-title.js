class AppTitle extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = ` <h4> <strong>Covid-19 Global Status</strong></h4>`;
    }
}

customElements.define("app-title", AppTitle);