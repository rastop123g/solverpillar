this.importScripts('powerline.js');

this.addEventListener('message', e => {
    let line = e.data.line
    let settings = e.data.settings
    // eslint-disable-next-line no-undef
    let pl = new Powerline(line, settings);
    pl.preparation()
    let span = 40;
    let result;
    while(result = pl.solve(span)) {
        console.log(span)
        let M = pl.pillar.moment;
        let tension = 30 * 10 ** 6;
        let diff_M = (M - result.max_M) / M;
        let diff_tension = (tension - result.max_tension) / tension;
        if(diff_M < 0 || diff_tension < 0) {
            span = span * 0.9
        } else if(diff_M > 0.05 && diff_tension > 0.05) {
            span = span * 1.05
        } else {
            break;
        }
    }
    this.postMessage({result, pl, graphs: pl.createGraphs(result.out)})
})