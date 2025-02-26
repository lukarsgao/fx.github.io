// include html ===============================================================
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
// chart ===============================================================
function hline(value, color) {
    const hline = {
        id: 'horizontalLine',
        afterDraw: (chart) => {
            const yValue = chart.scales.y.getPixelForValue(value);
            const ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left, yValue);
            ctx.lineTo(chart.chartArea.right, yValue);
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
        }
    };
    return hline
};
function chartBorder(_width, _color) {
    const chartAreaBorder = {
        id: 'chartAreaBorder',
        beforeDraw(chart, args, options) {
            const { ctx, chartArea: { left, top, width, height } } = chart;
            ctx.save();
            ctx.strokeStyle = _color;
            ctx.lineWidth = _width;
            ctx.setLineDash(options.borderDash || []);
            ctx.lineDashOffset = options.borderDashOffset;
            ctx.strokeRect(left, top, width, height);
            ctx.restore();
        }
    };
    return chartAreaBorder
};
function plot_line(result) {
    let ctx = document.getElementById("myChart")
    let label = result.x
    let data_pf = {
        label: "of Votes", // 標籤
        data: result.y, // 資料
        borderColor: "rgba(66, 123, 228)",
        borderWidth: 5,
        fill: false,
        pointRadius: 0,
        tension: 0.5,
    };


    let data = {
        labels: label, // 標題
        datasets: [data_pf]
    }
    let options = {
        responsive: true,
        aspectRatio: 1.7,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: { font: { size: 30, weight: "bold" } },
                grid: { display: false },
            },
            y: {
                ticks: { font: { size: 30, weight: "bold" } },
            },
        },
    }
    example = new Chart(ctx, {
        // 參數設定[註1]
        type: "line", // 圖表類型
        data: data,
        options: options,
        plugins: [hline(0, 'black'), chartBorder(0.5, 'black')]
    });
}

function plot_bar(result) {
    let ctx = document.getElementById("myChartB")
    let label = result.day
    let data_prof =
    {
        //type:"bar",
        label: "prof", // 標籤
        data: result.prof, // 資料
        cbackgroundColor: "rgba(108, 237, 62, 0.5)",
        //borderWidth: 5,
        //fill : false,
        //pointRadius: 0,
        //tension:0.5,
    }
    let data_loss =
    {
        label: "loss", // 標籤
        data: result.loss, // 資料
        backgroundColor: "rgba(233, 156, 156, 0.5)",
    }
    let data = {
        labels: label, // 標題
        datasets: [data_prof, data_loss]
    }
    let options =
    {
        responsive: true,
        aspectRatio: 1.7,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: { font: { size: 30, weight: "bold" } },
                grid: { display: false },
            },
            y: {
                //stacked:true,
                ticks: { font: { size: 30, weight: "bold" } },
            },
        },
        title: {
            display: true,
            text: "dafsdaf"
        }

    }
    example = new Chart(ctx, {
        // 參數設定[註1]
        type: "bar", // 圖表類型
        data: data,
        options: options,
        plugins: [hline(0, 'black'), hline(-1000, 'red'), chartBorder(0.5, 'black')]
    });
}

// m5 history ===============================================================
function m5_img(result) {
    let wb = result.web;
    let imgg = '';
    for (let i = 0; i < wb.length; i++) {
        imgg += "<div class='div_chart'><img src='" + wb[i] + "' width=100%></div><br><br>";

    }
    document.getElementById("m5").innerHTML = imgg;
}
