/**
 * Графики разложения ln(1-x) в ряд Тейлора с использованием Chart.js
 */

class TaylorSeriesChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.chart = null;
        this.init();
    }

    init() {
        this.createControls();
        this.createChart();
    }

    // Вычисление ln(1-x) через ряд Тейлора
    taylorLn1MinusX(x, n) {
        if (Math.abs(x) >= 1) return null; // Ряд сходится только при |x| < 1
        
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum -= Math.pow(x, i) / i;
        }
        return sum;
    }

    // Вычисление ln(1-x) через Math
    mathLn1MinusX(x) {
        if (x >= 1) return null;
        return Math.log(1 - x);
    }

    createControls() {
        const controlsDiv = document.createElement('div');
        controlsDiv.style.cssText = 'margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        controlsDiv.innerHTML = `
            <h3 style="margin-top: 0;">Параметры графика</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px;">
                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Количество членов ряда (n):</label>
                    <input type="number" id="nValue" min="1" max="50" value="10" 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Минимальное значение x:</label>
                    <input type="number" id="minX" step="0.1" value="-0.9" 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Максимальное значение x:</label>
                    <input type="number" id="maxX" step="0.1" value="0.9" 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Шаг:</label>
                    <input type="number" id="step" step="0.01" value="0.1" 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="updateChartBtn" 
                        style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Обновить график
                </button>
                <button id="animateChartBtn" 
                        style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Анимировать
                </button>
                <button id="saveChartBtn" 
                        style="padding: 10px 20px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Сохранить график
                </button>
            </div>
        `;

        this.container.appendChild(controlsDiv);

        const updateBtn = controlsDiv.querySelector('#updateChartBtn');
        const animateBtn = controlsDiv.querySelector('#animateChartBtn');
        const saveBtn = controlsDiv.querySelector('#saveChartBtn');

        updateBtn.addEventListener('click', () => {
            this.updateChart();
        });

        animateBtn.addEventListener('click', () => {
            this.animateChart();
        });

        saveBtn.addEventListener('click', () => {
            this.saveChart();
        });
    }

    createChart() {
        const canvasContainer = document.createElement('div');
        canvasContainer.style.cssText = 'margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        const canvas = document.createElement('canvas');
        canvas.id = 'taylorChart';
        canvasContainer.appendChild(canvas);
        this.container.appendChild(canvasContainer);

        this.updateChart();
    }

    generateData() {
        const n = parseInt(document.getElementById('nValue').value) || 10;
        const minX = parseFloat(document.getElementById('minX').value) || -0.9;
        const maxX = parseFloat(document.getElementById('maxX').value) || 0.9;
        const step = parseFloat(document.getElementById('step').value) || 0.1;

        const xValues = [];
        const taylorValues = [];
        const mathValues = [];

        for (let x = minX; x <= maxX; x += step) {
            if (Math.abs(x) < 1) {
                xValues.push(parseFloat(x.toFixed(2)));
                const taylor = this.taylorLn1MinusX(x, n);
                const math = this.mathLn1MinusX(x);
                taylorValues.push(taylor !== null ? parseFloat(taylor.toFixed(4)) : null);
                mathValues.push(math !== null ? parseFloat(math.toFixed(4)) : null);
            }
        }

        return { xValues, taylorValues, mathValues, n };
    }

    updateChart(animation = false) {
        const { xValues, taylorValues, mathValues, n } = this.generateData();

        const ctx = document.getElementById('taylorChart').getContext('2d');

        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: `Ряд Тейлора (n=${n})`,
                        data: taylorValues,
                        borderColor: 'rgb(102, 126, 234)',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.1
                    },
                    {
                        label: 'Math.log(1-x)',
                        data: mathValues,
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.1,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: animation ? {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                } : false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Разложение ln(1-x) в ряд Тейлора',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(4);
                                } else {
                                    label += 'не определено';
                                }
                                return label;
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                xMin: -1,
                                xMax: 1,
                                yMin: 0,
                                yMax: 0,
                                borderColor: 'rgb(0, 0, 0)',
                                borderWidth: 1,
                                borderDash: [2, 2]
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'x',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'F(x)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    animateChart() {
        this.updateChart(true);
    }

    saveChart() {
        if (this.chart) {
            const url = this.chart.toBase64Image();
            const link = document.createElement('a');
            link.download = 'taylor-series-chart.png';
            link.href = url;
            link.click();
        }
    }
}

// Инициализация будет выполнена из основного скрипта страницы

