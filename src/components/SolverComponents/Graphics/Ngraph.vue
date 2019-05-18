<template>
    <div>
        <div ref="$graph"></div>
    </div>
</template>

<script>
export default {
    props: ['name', 'data'],
    mounted () {
        let line1 = {
            x: this.data.x,
            y: this.data.y,
            fill: 'tozeroy',
            fillcolor: '#232323',
            type: 'scatter',
            mode: 'lines',
            line: {
                color: '#232323',
                width: '2px',
            }
        }

        let layout = {
            title: this.name,
            showlegend: false,
            xaxis: {
                title: this.data.xname
            },
            yaxis: {
                title: this.data.yname
            }
        };
        Plotly.plot(this.$refs.$graph, [line1], layout, {staticPlot: true})
    }
}
</script>

<style scoped>
    #Nzgraph {
        width: 95%;
        height: 450px;
    }
</style>
