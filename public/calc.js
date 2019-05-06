this.importScripts('powerline.js');

this.addEventListener('message', e => {
    let line = e.data.line
    let settings = e.data.settings
    // eslint-disable-next-line no-undef
    let pl = new Powerline(line, settings);
    pl.preparation()
    this.postMessage(pl.result)
})