import * as charts from 'echarts';

export function echarts(node: HTMLElement, option: { title: { text: string; }; tooltip: { trigger: string; }; xAxis: { type: string; nameLocation: string; }; yAxis: { name: string; }; series: { name: string; type: string; data: number[]; }[]; }) {
    const chart = charts.init(node);
    chart.setOption(option, true);
}