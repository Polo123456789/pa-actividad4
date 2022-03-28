// @ts-check

/**
 * @param {string} text
 */
const createHTMLFromString = (text) => {
    let div = document.createElement("div");
    div.innerHTML = text.trim();
    return div;
}

/**
 * @param {string} name
 * @param {string} content
 */
const registerComponent = (name, content) => {
    customElements.define(name, class extends HTMLElement {
        constructor() {
            super();
            let c = createHTMLFromString(content);
            const shadowRoot = this.attachShadow({
                mode: 'open'
            }).appendChild(c)
        }
    });
}

const bootstrapStylesLink =
    "<link rel='stylesheet' href='css/bootstrap.min.css'>"; 

const loadingResultsTemplate = bootstrapStylesLink + `
<p class="text-center">Cargando resultados ...</p>
<div class="d-flex justify-content-center">
    <div class="spinner-grow text-dark">
        <span class="visually-hidden">Cargando resultado ...</span>
    </div>
</div>
`;

registerComponent("loading-results", loadingResultsTemplate);

const showResultsTemplate = bootstrapStylesLink + `
<h1 class="text-center">Resultado</h1>
<p><strong>STDOUT:</strong></p>
<div class="bg-success bg-opacity-10 rounded p-2">
    <slot name="stdout"></slot>
</div>
<p><strong>STDERR:</strong></p>
<div class="bg-danger bg-opacity-10 rounded p-2">
    <slot name="stderr"></slot>
</div>
<p><strong>Valor de retorno:</strong>&nbsp;<slot name="return-val"></slot></p>
`;

registerComponent("code-results", showResultsTemplate);

/**
 * @param {string} stdout
 * @param {string} stderr
 * @param {number} returnValue
 */
const createCodeResults = (stdout, stderr, returnValue) => {
    let results = document.createElement("code-results");
    let elemStdout = document.createElement("pre")
    let elemStderr = document.createElement("pre")
    let elemRetValue = document.createElement("span");

    elemStdout.innerText = stdout;
    elemStdout.setAttribute("slot", "stdout");
    results.appendChild(elemStdout);

    elemStderr.innerText = stderr;
    elemStderr.setAttribute("slot", "stderr");
    results.appendChild(elemStderr);

    elemRetValue.innerText = returnValue.toString();
    elemRetValue.setAttribute("slot", "return-val");
    results.appendChild(elemRetValue);

    return results;
}
