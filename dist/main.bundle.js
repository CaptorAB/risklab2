webpackJsonp(
    [1, 5],
    {
        /***/ 163: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__ = __webpack_require__(41);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return TimeSeriesChartComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var TimeSeriesChartComponent = (TimeSeriesChartComponent_1 = (function() {
                function TimeSeriesChartComponent() {
                    this.widthHeightRatio = 1.0;
                    this.margin = { top: 10, bottom: 10, left: 10, right: 10 };
                }
                TimeSeriesChartComponent.prototype.ngOnInit = function() {
                    this.createChart();
                    TimeSeriesChartComponent_1.updateChart(this.svgChart, this._timeSeriess, this._instruments, null, null, null, null, true);
                };
                Object.defineProperty(TimeSeriesChartComponent.prototype, "instruments", {
                    set: function(v) {
                        this._instruments = v;
                        TimeSeriesChartComponent_1.updateChart(this.svgChart, this._timeSeriess, this._instruments, null, null, null, null, true);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesChartComponent.prototype, "timeSeriess", {
                    set: function(v) {
                        this._timeSeriess = v;
                        TimeSeriesChartComponent_1.updateChart(this.svgChart, this._timeSeriess, this._instruments, null, null, null, null, true);
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeSeriesChartComponent.prototype.ngOnChanges = function() {
                    //if (this.svgChart) {
                    //    this.updateChart();
                    //}
                };
                TimeSeriesChartComponent.prototype.createChart = function() {
                    this.svgChart = new __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */](this.chartContainer.nativeElement, this.widthHeightRatio, this.margin);
                };
                TimeSeriesChartComponent.updateChart = function(svgChart, timeSeriess, instruments, startDate, endDate, minValue, maxValue, updateAxises) {
                    if (startDate === void 0) {
                        startDate = null;
                    }
                    if (endDate === void 0) {
                        endDate = null;
                    }
                    if (minValue === void 0) {
                        minValue = null;
                    }
                    if (maxValue === void 0) {
                        maxValue = null;
                    }
                    if (!svgChart) return;
                    if (!timeSeriess) return;
                    if (timeSeriess.length == 0) return;
                    var mx = {};
                    for (var i = 0; i < timeSeriess.length; i++) {
                        var ts = timeSeriess[i];
                        var start = !startDate ? ts.start : startDate;
                        var end = !endDate ? ts.end : endDate;
                        mx = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].arrayMinMax([start.valueOf(), end.valueOf()], mx);
                    }
                    var my;
                    if (minValue != null && maxValue != null) {
                        my = { min: minValue, max: maxValue };
                    } else {
                        my = timeSeriess.reduce(function(p, c) {
                            return __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].timeSeriesMinMax(c, p);
                        }, {});
                        var m = ((my.max - my.min) * 0.1) / 2;
                        my.min -= m;
                        my.max += m;
                    }
                    var ticky = (my.max - my.min) / 3;
                    var scales = {};
                    scales.x = d3
                        .scaleLinear()
                        .domain([mx.min, mx.max])
                        .range([0, svgChart.width]);
                    scales.y = d3
                        .scaleLinear()
                        .domain([my.min, my.max])
                        .range([svgChart.height, 0]);
                    if (updateAxises)
                        svgChart.updateAxises(
                            scales,
                            [0.25, 0.5, 0.75].map(function(d) {
                                return (1 - d) * mx.min + d * mx.max;
                            }),
                            [-2, -1, 0, 1, 2]
                                .map(function(d) {
                                    return timeSeriess[0].startValue + d * ticky;
                                })
                                .filter(function(d) {
                                    return d < my.max && d > my.min;
                                })
                        );
                    for (var i = 0; i < timeSeriess.length; i++) {
                        var ts = timeSeriess[i];
                        var tsitems = ts.items;
                        var line = d3
                            .line()
                            .x(function(d) {
                                return scales.x(d.timestamp.valueOf());
                            })
                            .y(function(d) {
                                return scales.y(d.value);
                            });
                        var y0 = timeSeriess[0].startValue;
                        var line0 = d3
                            .line()
                            .x(function(d) {
                                return scales.x(d.timestamp.valueOf());
                            })
                            .y(function(d) {
                                return scales.y(y0);
                            });
                        var ci = i + 1;
                        if (instruments) if (instruments.length > i) ci = instruments[i].colorIndex;
                        var updsel = svgChart.chart.selectAll("path.line" + i).data([{}]);
                        updsel
                            .datum(tsitems)
                            .transition()
                            .duration(TimeSeriesChartComponent_1.transitionDuration)
                            .attr("d", line);
                        updsel
                            .enter()
                            .append("path")
                            .attr("class", "line line" + i + " l" + ci)
                            .datum(tsitems)
                            .attr("d", line0)
                            .transition()
                            .duration(TimeSeriesChartComponent_1.transitionDuration)
                            .attr("d", line);
                    }
                };
                return TimeSeriesChartComponent;
            })());
            TimeSeriesChartComponent.transitionDuration = 600;
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], TimeSeriesChartComponent.prototype, "instruments", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], TimeSeriesChartComponent.prototype, "widthHeightRatio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object)], TimeSeriesChartComponent.prototype, "margin", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], TimeSeriesChartComponent.prototype, "timeSeriess", null);
            __decorate(
                [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("chart"), __metadata("design:type", (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a) || Object)],
                TimeSeriesChartComponent.prototype,
                "chartContainer",
                void 0
            );
            TimeSeriesChartComponent = TimeSeriesChartComponent_1 = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "time-series-chart",
                        template: __webpack_require__(312),
                        styles: [__webpack_require__(304)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                TimeSeriesChartComponent
            );

            var TimeSeriesChartComponent_1, _a;
            //# sourceMappingURL=time-series-chart.component.js.map

            /***/
        },

        /***/ 164: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time_series_chart_time_series_chart_component__ = __webpack_require__(163);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__ = __webpack_require__(89);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_svg_chart__ = __webpack_require__(41);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_daycount__ = __webpack_require__(59);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_daycount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_daycount__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return TimeSeriesProjectionChartComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var TimeSeriesProjectionChartComponent = (TimeSeriesProjectionChartComponent_1 = (function() {
                function TimeSeriesProjectionChartComponent() {
                    this.widthHeightRatio = 1.0;
                    this.margin = { top: 10, bottom: 10, left: 10, right: 10 };
                    this.rescale = true;
                    this.showAnnotation = false;
                    this.transitionDuration = 600;
                }
                TimeSeriesProjectionChartComponent.prototype.ngOnInit = function() {
                    this.createChart();
                    this.updateChart();
                };
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "historyEndValues", {
                    set: function(v) {
                        this._historyEndValues = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "timeSeriess", {
                    set: function(v) {
                        this._timeSeriess = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "mus", {
                    set: function(v) {
                        this._mus = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "sigmas", {
                    set: function(v) {
                        this._sigmas = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "correlations", {
                    set: function(v) {
                        this._correlations = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "projectionYearsTimeSpan", {
                    set: function(v) {
                        this._projectionYearsTimeSpan = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeSeriesProjectionChartComponent.prototype, "instruments", {
                    set: function(v) {
                        this._instruments = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeSeriesProjectionChartComponent.prototype.createChart = function() {
                    this.svgChart = new __WEBPACK_IMPORTED_MODULE_3__common_svg_chart__["a" /* SvgChart */](this.chartContainer.nativeElement, this.widthHeightRatio, this.margin);
                };
                TimeSeriesProjectionChartComponent.prototype.updateChart = function() {
                    var _this = this;
                    if (!this.svgChart) return;
                    if (!this._timeSeriess) return;
                    if (this._timeSeriess.length == 0) return;
                    var y = this._projectionYearsTimeSpan * TimeSeriesProjectionChartComponent_1.msPerYear;
                    var startHistory = this._timeSeriess[0].start;
                    var startProj = this._timeSeriess[0].end;
                    var endProj = new Date(startProj.valueOf() + y);
                    if (this._mus === undefined || this._sigmas === undefined || this._projectionYearsTimeSpan === undefined) return;
                    var tssAdjEnd = [];
                    for (var i = 0; i < this._timeSeriess.length; i++) {
                        var ts = this._timeSeriess[i];
                        if (this._historyEndValues) {
                            if (i < this._historyEndValues.length) {
                                var h = this._historyEndValues[i];
                                ts = ts.clone.mult(h / ts.endValue);
                            }
                        }
                        tssAdjEnd.push(ts);
                    }
                    var tsss = [];
                    var my = {};
                    var n = Math.min(tssAdjEnd.length, this._mus.length);
                    for (var i = 0; i < n; i++) {
                        var ts_1 = tssAdjEnd[i];
                        my = __WEBPACK_IMPORTED_MODULE_3__common_svg_chart__["a" /* SvgChart */].timeSeriesMinMax(ts_1, my);
                        var tss = this.calculateProjection(50, ts_1.endValue, startProj, endProj, this._mus[i], this._sigmas[i]);
                        tsss.push(tss);
                        my = [tss[0], tss[tss.length - 1]].reduce(function(p, c) {
                            return __WEBPACK_IMPORTED_MODULE_3__common_svg_chart__["a" /* SvgChart */].timeSeriesMinMax(c, p);
                        }, my);
                    }
                    if (this.scales === undefined || this.rescale) {
                        var m = ((my.max - my.min) * 0.1) / 2;
                        var miny = my.min - m;
                        var maxy = my.max + m;
                        this.scales = {};
                        this.scales.x = d3
                            .scaleLinear()
                            .domain([startHistory.valueOf(), endProj.valueOf()])
                            .range([0, this.svgChart.width]);
                        this.scales.miny = miny;
                        this.scales.maxy = maxy;
                        this.scales.y = d3
                            .scaleLinear()
                            .domain([miny, maxy])
                            .range([this.svgChart.height, 0]);
                    }
                    __WEBPACK_IMPORTED_MODULE_1__time_series_chart_time_series_chart_component__["a" /* TimeSeriesChartComponent */].updateChart(this.svgChart, tssAdjEnd, this._instruments, startHistory, endProj, this.scales.miny, this.scales.maxy, false);
                    var ticky = (this.scales.maxy - this.scales.miny) / 3;
                    var minx = startHistory.valueOf();
                    var maxx = endProj.valueOf();
                    var tickx = (maxx - minx) / 3;
                    this.svgChart.updateAxises(
                        this.scales,
                        [-2, -1, 0, 1, 2]
                            .map(function(d) {
                                return startProj.valueOf() + d * tickx;
                            })
                            .filter(function(d) {
                                return d < maxx && d > minx;
                            }),
                        [-2, -1, 0, 1, 2]
                            .map(function(d) {
                                return tssAdjEnd[0].endValue + d * ticky;
                            })
                            .filter(function(d) {
                                return d < _this.scales.maxy && d > _this.scales.miny;
                            })
                    );
                    var v0;
                    var area0 = d3
                        .area()
                        .x(function(d) {
                            return _this.scales.x(d.x);
                        })
                        .y0(function(d) {
                            return _this.scales.y(v0);
                        })
                        .y1(function(d) {
                            return _this.scales.y(v0);
                        });
                    var area = d3
                        .area()
                        .x(function(d) {
                            return _this.scales.x(d.x);
                        })
                        .y0(function(d) {
                            return _this.scales.y(d.y0);
                        })
                        .y1(function(d) {
                            return _this.scales.y(d.y1);
                        });
                    var n = tsss.length;
                    for (var i_1 = 0; i_1 < n; i_1++) {
                        var ci = i_1;
                        if (this._instruments) if (this._instruments.length > i_1) ci = this._instruments[i_1].colorIndex - 1;
                        var color = net.brehaut.Color(this.svgChart.colors[ci]).setAlpha(0.6);
                        var ts_2 = tssAdjEnd[i_1];
                        v0 = ts_2.startValue;
                        var tss = tsss[i_1];
                        var light0 = color.getLightness();
                        for (var j = 1; j < tss.length; j++) {
                            var colfactor = Math.floor(Math.abs(j - tss.length / 2)) / Math.floor(tss.length / 2);
                            var c = color.setLightness(light0 + (1 - light0) * colfactor);
                            var ts0 = tss[j - 1];
                            var ts1 = tss[j];
                            var idx = j - 1 + tss.length * i_1;
                            var dta = [];
                            for (var k = 0; k < ts0.count; k++) {
                                dta.push({ x: ts0.items[k].timestamp.valueOf(), y0: ts0.items[k].value, y1: ts1.items[k].value });
                            }
                            var upsel = this.svgChart.chart.selectAll("path.area" + idx.toString()).data([{}]);
                            upsel
                                .datum(dta)
                                .transition()
                                .duration(this.transitionDuration)
                                .attr("d", area);
                            upsel
                                .enter()
                                .append("path")
                                .attr("class", "area" + idx.toString())
                                .attr("fill", c.toCSS())
                                .datum(dta)
                                .attr("d", area0)
                                .transition()
                                .duration(this.transitionDuration)
                                .attr("d", area);
                            upsel
                                .exit()
                                .transition()
                                .duration(this.transitionDuration)
                                .attr("d", area0)
                                .remove();
                        }
                    }
                    if (this.showAnnotation) {
                        if (!this.annotationPloted) {
                            var x0 = this.scales.x(startProj.valueOf());
                            this.svgChart.addArrow(x0 + 20, 50, 0, 200, "Framtida utfall", false, true);
                            this.svgChart.addArrow(x0 - 200, 50, 0, 180, "Historik", true, false);
                            this.annotationPloted = true;
                        }
                    }
                };
                TimeSeriesProjectionChartComponent.prototype.calculateProjection = function(timeSteps, startValue, startDate, endDate, mu, sigma) {
                    //var quantiles = [0.05, 0.12, 0.25, 0.5, 0.75, 0.88, 0.95];
                    var quantiles = [0.05, 0.12, 0.24, 0.407, 0.593, 0.76, 0.88, 0.95];
                    var ts = numeric.linspace(startDate.valueOf(), endDate.valueOf(), timeSteps + 1);
                    return quantiles.map(function(d) {
                        return TimeSeriesProjectionChartComponent_1.logNormalMonthlyQuantileForecast(ts, mu, sigma, d, startValue);
                    });
                };
                TimeSeriesProjectionChartComponent.logNormalMonthlyQuantileForecast = function(timestamps, yearlyMean, yearlyStddev, quantile, startvalue) {
                    var rn = jStat.normal.inv(quantile, 0, 1);
                    var std = yearlyStddev * rn;
                    var lastval = startvalue;
                    var items = [];
                    var starttime = timestamps[0] / TimeSeriesProjectionChartComponent_1.msPerYear;
                    items.push(new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](new Date(timestamps[0]), lastval));
                    var time0 = 0;
                    for (var i = 1; i < timestamps.length; i++) {
                        var time = timestamps[i] / TimeSeriesProjectionChartComponent_1.msPerYear - starttime;
                        var drift = yearlyMean * (time - time0);
                        var exp = drift + (Math.sqrt(time) - Math.sqrt(time0)) * std;
                        lastval = lastval * Math.exp(exp);
                        time0 = time;
                        items.push(new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](new Date(timestamps[i]), lastval));
                    }
                    return new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["b" /* TimeSeries */](items);
                };
                return TimeSeriesProjectionChartComponent;
            })());
            TimeSeriesProjectionChartComponent.msPerYear = 365.25 * 24 * 60 * 60 * 1000;
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], TimeSeriesProjectionChartComponent.prototype, "widthHeightRatio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], TimeSeriesProjectionChartComponent.prototype, "showAnnotation", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object)], TimeSeriesProjectionChartComponent.prototype, "margin", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], TimeSeriesProjectionChartComponent.prototype, "rescale", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], TimeSeriesProjectionChartComponent.prototype, "historyEndValues", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], TimeSeriesProjectionChartComponent.prototype, "timeSeriess", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], TimeSeriesProjectionChartComponent.prototype, "mus", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], TimeSeriesProjectionChartComponent.prototype, "sigmas", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], TimeSeriesProjectionChartComponent.prototype, "correlations", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], TimeSeriesProjectionChartComponent.prototype, "projectionYearsTimeSpan", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], TimeSeriesProjectionChartComponent.prototype, "instruments", null);
            __decorate(
                [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("chart"), __metadata("design:type", (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a) || Object)],
                TimeSeriesProjectionChartComponent.prototype,
                "chartContainer",
                void 0
            );
            TimeSeriesProjectionChartComponent = TimeSeriesProjectionChartComponent_1 = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "time-series-projection-chart",
                        template: __webpack_require__(313),
                        styles: [__webpack_require__(305)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                TimeSeriesProjectionChartComponent
            );

            var TimeSeriesProjectionChartComponent_1, _a;
            //# sourceMappingURL=time-series-projection-chart.component.js.map

            /***/
        },

        /***/ 165: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return Markowitz;
            });
            var Markowitz = (function() {
                function Markowitz() {}
                Markowitz.efficientPortfolio = function(cov, mu, target) {
                    var n = mu.length;
                    var d = Array(n).fill(0);
                    var AT = [Array(n).fill(1), Array(n).fill(-1)];
                    var b0 = [1, -1];
                    for (var i = 0; i < n; i++) {
                        var a = Array(n).fill(0);
                        a[i] = 1;
                        AT.push(a);
                        b0.push(0);
                    }
                    if (target !== undefined) {
                        AT.push(numeric.mul(1, mu));
                        AT.push(numeric.mul(-1, mu));
                        b0.push(target);
                        b0.push(-target);
                    }
                    var A = numeric.transpose(AT);
                    var q = quadprog.solveQP(Markowitz.base0to1(cov), Markowitz.base0to1(d), Markowitz.base0to1(A), Markowitz.base0to1(b0));
                    //var q = numeric.solveQP(cov, d, A, b0);
                    return Markowitz.base1to0(q.solution);
                };
                Markowitz.base0to1 = function(A) {
                    if (typeof A !== "object") {
                        return A;
                    }
                    var ret = [],
                        i,
                        n = A.length;
                    for (i = 0; i < n; i++) ret[i + 1] = Markowitz.base0to1(A[i]);
                    return ret;
                };
                Markowitz.base1to0 = function(A) {
                    if (typeof A !== "object") {
                        return A;
                    }
                    var ret = [],
                        i,
                        n = A.length;
                    for (i = 1; i < n; i++) ret[i - 1] = Markowitz.base1to0(A[i]);
                    return ret;
                };
                Markowitz.corrToCov = function(sigma, corr) {
                    var n = sigma.length;
                    var res = [];
                    for (var i = 0; i < n; i++) {
                        var c = [];
                        for (var j = 0; j < n; j++) {
                            c.push(sigma[i] * sigma[j] * corr[i][j]);
                        }
                        res.push(c);
                    }
                    return res;
                };
                Markowitz.portfolioSigma = function(cov, w) {
                    var y = numeric.dot(w, numeric.dotMV(cov, w));
                    return Math.sqrt(y);
                };
                Markowitz.portfolioMu = function(mus, w) {
                    return numeric.dot(mus, w);
                };
                return Markowitz;
            })();

            //# sourceMappingURL=markowitz.js.map

            /***/
        },

        /***/ 213: /***/ function(module, exports) {
            function webpackEmptyContext(req) {
                throw new Error("Cannot find module '" + req + "'.");
            }
            webpackEmptyContext.keys = function() {
                return [];
            };
            webpackEmptyContext.resolve = webpackEmptyContext;
            module.exports = webpackEmptyContext;
            webpackEmptyContext.id = 213;

            /***/
        },

        /***/ 214: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(228);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(242);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(243);

            if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
            }
            __webpack_require__
                .i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])()
                .bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
            //# sourceMappingURL=main.js.map

            /***/
        },

        /***/ 234: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__ = __webpack_require__(41);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return BalanceSheetChartComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var BalanceSheetChartComponent = (function() {
                function BalanceSheetChartComponent() {
                    this.weightsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.lineHeight = 24;
                    this.textOffsetY = this.lineHeight / 3;
                    this.widthHeightRatio = 1.0;
                    this.margin = { top: 10, bottom: 10, left: 10, right: 10 };
                    this.scales = {};
                    this.transitionDuration = 600;
                }
                BalanceSheetChartComponent.prototype.ngOnInit = function() {
                    this.createChart();
                    this.updateChart(0);
                };
                BalanceSheetChartComponent.prototype.ngOnChanges = function() {
                    //var a = 1;
                };
                Object.defineProperty(BalanceSheetChartComponent.prototype, "instruments", {
                    set: function(v) {
                        //console.log("BalanceSheetChartComponent set instruments");
                        this._instruments = v;
                        this.updateChart(this.transitionDuration);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BalanceSheetChartComponent.prototype, "weights", {
                    get: function() {
                        return this._weights;
                    },
                    set: function(v) {
                        if (!v) this._weights = [];
                        else this._weights = v.slice(0);
                        this.updateChart(this.transitionDuration);
                    },
                    enumerable: true,
                    configurable: true
                });
                BalanceSheetChartComponent.prototype.adjustTextLines = function(ys, lineHeight, height) {
                    function minMax(x, min, max) {
                        if (x < min) return min;
                        if (x > max) return max;
                        return x;
                    }
                    var n = ys.length;
                    while (true) {
                        ys = ys.map(function(d, i) {
                            return minMax(d, lineHeight * (i + 0.5), height - lineHeight * (ys.length - i - 0.5));
                        });
                        var ms = [];
                        var t = 0;
                        for (var i = 0; i < n; i++) {
                            var m = 0;
                            if (i > 0) m -= Math.max(lineHeight - (ys[i] - ys[i - 1]), 0) / 2;
                            if (i < n - 1) m += Math.max(lineHeight - (ys[i + 1] - ys[i]), 0) / 2;
                            t += Math.abs(m);
                            ms.push(m);
                        }
                        for (var i = 0; i < n - 1; i++) {
                            ys[i] -= ms[i];
                        }
                        if (t < 0.1) break;
                    }
                    return ys;
                };
                BalanceSheetChartComponent.prototype.calcRects = function() {
                    var _this = this;
                    this.rects = undefined;
                    if (!this._instruments || !this._weights) return;
                    if (this._instruments.length != this._weights.length) return;
                    var s = 0;
                    this.rects = this._instruments.map(function(d, i) {
                        var w = _this._weights[i];
                        s += w;
                        return { weight: w, index: d.index };
                    });
                    if (s <= 0) {
                        this.rects = [];
                        return;
                    }
                    var t = 0;
                    for (var i = 0; i < this.rects.length; i++) {
                        var r = this.rects[i];
                        r.weight /= s;
                        r.start = t;
                        t += r.weight;
                    }
                };
                BalanceSheetChartComponent.prototype.createChart = function() {
                    this.svgChart = new __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */](this.chartContainer.nativeElement, this.widthHeightRatio, this.margin);
                    this.scales.x = d3
                        .scaleLinear()
                        .domain([0, 1])
                        .range([0, this.svgChart.width]);
                    this.scales.y = d3
                        .scaleLinear()
                        .domain([0, 1])
                        .range([0, this.svgChart.height]);
                    this.svgChart.updateAxises(this.scales, [], []);
                };
                BalanceSheetChartComponent.prototype.onDrag = function(d) {
                    if (!d.parent._weights) return;
                    if (d.parent._weights.length != 2) return;
                    //var x = SvgChart.minmax(d.parent.scales.x.invert(d3.mouse(this)[0]), 0.0001, 0.9999);
                    var y = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].minmax(d.parent.scales.y.invert(d3.mouse(this)[1]), 0.0001, 0.9999);
                    var s = d.parent._weights[0] + d.parent._weights[1];
                    d.parent._weights[0] = y * s;
                    d.parent._weights[1] = (1 - y) * s;
                    d.parent.weightsChange.emit(d.parent._weights);
                    d.parent.updateChart(0);
                };
                BalanceSheetChartComponent.prototype.updateChart = function(transitionDuration) {
                    var _this = this;
                    if (!this.svgChart) return;
                    var isNumeric = function(n) {
                        return !isNaN(n) && isFinite(n);
                    };
                    var allNumeric = this._weights.reduce(function(p, c) {
                        return p && isNumeric(c);
                    }, true);
                    if (!allNumeric) return;
                    this.calcRects();
                    if (!this.rects) this.rects = [];
                    var rightAlign = this.align != "left";
                    var barStart = rightAlign ? 0.8 : 0.0;
                    var barEnd = rightAlign ? 1.0 : 0.2;
                    var ts = this.adjustTextLines(
                        this.rects.map(function(d) {
                            return _this.scales.y(d.start + d.weight / 2);
                        }),
                        this.lineHeight,
                        this.scales.y(1.0)
                    );
                    var updsel = this.svgChart.chart.selectAll("text.key").data(this.rects);
                    var dx = this.scales.x(0.5 + 0.48 * (rightAlign ? -1 : 1));
                    updsel
                        .enter()
                        .append("text")
                        .attr("class", "key")
                        .attr("text-anchor", rightAlign ? "start" : "end")
                        .attr("dx", dx)
                        .attr("dy", function(d, i) {
                            return ts[i] + _this.textOffsetY;
                        })
                        .text(function(d, i) {
                            return _this._instruments[i].name;
                        });
                    updsel
                        .text(function(d, i) {
                            return _this._instruments[i].name;
                        })
                        .transition()
                        .duration(transitionDuration)
                        .attr("dx", dx)
                        .attr("dy", function(d, i) {
                            return ts[i] + _this.textOffsetY;
                        });
                    updsel.exit().remove();
                    var updsel = this.svgChart.chart.selectAll("text.value").data(this.rects);
                    var toPercent = function(d) {
                        var res = (100 * d).toFixed(0);
                        if (res == "-0") res = "0";
                        return res + "%";
                    };
                    dx = this.scales.x(0.5 + 0.26 * (rightAlign ? 1 : -1));
                    updsel
                        .enter()
                        .append("text")
                        .attr("class", "value")
                        .attr("text-anchor", rightAlign ? "end" : "start")
                        .attr("dx", dx)
                        .attr("dy", function(d, i) {
                            return ts[i] + _this.textOffsetY;
                        })
                        .text(function(d, i) {
                            return toPercent(d.weight);
                        });
                    updsel
                        .transition()
                        .duration(transitionDuration)
                        .text(function(d, i) {
                            return toPercent(d.weight);
                        })
                        .attr("dx", dx)
                        .attr("dy", function(d, i) {
                            return ts[i] + _this.textOffsetY;
                        });
                    updsel.exit().remove();
                    var modfixrect = function(sel) {
                        return sel
                            .attr("class", function(d, i) {
                                return "fixed c" + _this._instruments[i].colorIndex;
                            })
                            .attr("x", function(d) {
                                return _this.scales.x(barStart);
                            })
                            .attr("width", function(d) {
                                return _this.scales.x(barEnd) - _this.scales.x(barStart);
                            })
                            .attr("y", function(d) {
                                return _this.scales.y(d.start);
                            })
                            .attr("height", function(d) {
                                return _this.scales.y(d.start + d.weight) - _this.scales.y(d.start);
                            });
                    };
                    var sel = this.svgChart.chart.selectAll("rect.fixed").data(this.rects);
                    modfixrect(sel.transition().duration(transitionDuration));
                    modfixrect(sel.enter().append("rect"));
                    sel.exit().remove();
                    var moddragrect = function(sel) {
                        return sel
                            .attr("x", function(d) {
                                return _this.scales.x(barStart);
                            })
                            .attr("width", function(d) {
                                return _this.scales.x(barEnd) - _this.scales.x(barStart);
                            })
                            .attr("y", function(d) {
                                return _this.scales.y(d.start) - 5;
                            })
                            .attr("height", 10);
                    };
                    var fixrectdata = this.rects.slice(1);
                    fixrectdata.forEach(function(d) {
                        d.parent = _this;
                    });
                    sel = this.svgChart.chart.selectAll("rect.moveable").data(fixrectdata);
                    moddragrect(sel.transition().duration(transitionDuration));
                    moddragrect(
                        sel
                            .enter()
                            .append("rect")
                            .attr("class", "moveable")
                            .call(d3.drag().on("drag", this.onDrag))
                    );
                    sel.exit().remove();
                };
                return BalanceSheetChartComponent;
            })();
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], BalanceSheetChartComponent.prototype, "widthHeightRatio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object)], BalanceSheetChartComponent.prototype, "margin", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", String)], BalanceSheetChartComponent.prototype, "align", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], BalanceSheetChartComponent.prototype, "instruments", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], BalanceSheetChartComponent.prototype, "weightsChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], BalanceSheetChartComponent.prototype, "weights", null);
            __decorate(
                [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("chart"), __metadata("design:type", (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a) || Object)],
                BalanceSheetChartComponent.prototype,
                "chartContainer",
                void 0
            );
            BalanceSheetChartComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "balance-sheet-chart",
                        template: __webpack_require__(307),
                        styles: [__webpack_require__(299)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                BalanceSheetChartComponent
            );

            var _a;
            //# sourceMappingURL=balance-sheet-chart.component.js.map

            /***/
        },

        /***/ 235: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__ = __webpack_require__(41);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_markowitz__ = __webpack_require__(165);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__ = __webpack_require__(88);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__ = __webpack_require__(240);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return CapmChartComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            //declare global {
            //    interface numeric {
            //    }
            //}
            var CapmChartComponent = (function() {
                function CapmChartComponent() {
                    this.musChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.sigmasChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.portfolioWeightsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.widthHeightRatio = 1.0;
                    this.margin = { top: 10, bottom: 10, left: 10, right: 10 };
                    this.scales = {};
                    this._correlations = undefined;
                    this._circleRadius = 14;
                    this.circledrag = d3.drag().on("drag", this.onDrag);
                    this.minSigma = 0.0;
                    this.maxSigma = 0.21;
                    this.minMu = -0.015;
                    this.maxMu = 0.06;
                    this.showAnnotation = false;
                    this.showInitialValues = false;
                    this.showPortfolio = true;
                    this.transitionDuration = 600;
                }
                CapmChartComponent.prototype.ngOnInit = function() {
                    this.createChart();
                    //this.setMusAndSigmas();
                    this.updateChart();
                };
                CapmChartComponent.prototype.ngAfterViewInit = function() {
                    this.createChart();
                };
                Object.defineProperty(CapmChartComponent.prototype, "circleRadius", {
                    set: function(v) {
                        if (this._circleRadius === v) return;
                        this._circleRadius = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                CapmChartComponent.prototype.ngOnChanges = function() {};
                Object.defineProperty(CapmChartComponent.prototype, "mus", {
                    get: function() {
                        return this.musAndSigmas.map(function(d) {
                            return d.y;
                        });
                    },
                    set: function(v) {
                        this.setMusAndSigmas(v, null);
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapmChartComponent.prototype, "sigmas", {
                    get: function() {
                        return this.musAndSigmas.map(function(d) {
                            return d.x;
                        });
                    },
                    set: function(v) {
                        this.setMusAndSigmas(null, v);
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapmChartComponent.prototype, "correlations", {
                    set: function(v) {
                        this._correlations = v;
                        this.calcEfficientFrontier();
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapmChartComponent.prototype, "muRiskFree", {
                    set: function(v) {
                        this._muRiskFree = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CapmChartComponent.prototype, "instruments", {
                    set: function(v) {
                        this._instruments = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                CapmChartComponent.prototype.setMusAndSigmas = function(mus, sigmas) {
                    var n = 0;
                    if (mus) n = mus.length;
                    else if (sigmas) n = sigmas.length;
                    if (this.musAndSigmas === undefined) this.musAndSigmas = [];
                    for (var i = this.musAndSigmas.length; i < n; i++) this.musAndSigmas.push({ x: undefined, y: undefined, parent: this });
                    for (var i = 0; i < this.musAndSigmas.length; i++) {
                        var d = this.musAndSigmas[i];
                        if (mus) d.y = mus[i];
                        if (sigmas) d.x = sigmas[i];
                    }
                    var isNumeric = function(n) {
                        return !isNaN(n) && isFinite(n);
                    };
                    var allNumeric = this.musAndSigmas.reduce(function(p, c) {
                        return p && isNumeric(c.x) && isNumeric(c.y);
                    }, true);
                    if (!allNumeric) return;
                    if (this.initialMusAndSigmas === undefined)
                        this.initialMusAndSigmas = this.musAndSigmas.map(function(d) {
                            return { x: d.x, y: d.y };
                        });
                    this.calcEfficientFrontier();
                };
                CapmChartComponent.prototype.calcEfficientFrontier = function() {
                    var _this = this;
                    var n = this.musAndSigmas.length;
                    var corrs = this._correlations;
                    if (!corrs || n != corrs.length) {
                        corrs = __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */].eye(n);
                    }
                    var indices = this.musAndSigmas.map(function(d, i) {
                        return i;
                    });
                    var mus = this.musAndSigmas.map(function(d) {
                        return d.y;
                    });
                    var sigmas = this.musAndSigmas.map(function(d) {
                        return d.x;
                    });
                    var maxmuriskfree = this.musAndSigmas.reduce(function(p, c) {
                        return c.x > 0 ? p : p === undefined ? c.y : Math.max(c.y, p);
                    }, undefined);
                    if (maxmuriskfree != undefined) {
                        indices = this.musAndSigmas
                            .map(function(d, i) {
                                if (d.y > maxmuriskfree || (d.y == maxmuriskfree && d.x <= 0)) return i;
                                return -1;
                            })
                            .filter(function(d) {
                                return d >= 0;
                            });
                        mus = indices.map(function(d) {
                            return mus[d];
                        });
                        sigmas = indices.map(function(d) {
                            return Math.max(sigmas[d], 0.0001);
                        });
                        corrs = indices
                            .map(function(d) {
                                return corrs[d];
                            })
                            .map(function(d) {
                                return indices.map(function(f) {
                                    return d[f];
                                });
                            });
                    }
                    var effs = [];
                    var weights = [];
                    if (mus.length > 1) {
                        var mumin = mus.reduce(function(p, c) {
                            return p === undefined ? c : Math.min(p, c);
                        }, undefined);
                        var mumax = mus.reduce(function(p, c) {
                            return p === undefined ? c : Math.max(p, c);
                        }, undefined);
                        var cov = __WEBPACK_IMPORTED_MODULE_2__common_markowitz__["a" /* Markowitz */].corrToCov(sigmas, corrs);
                        numeric.linspace(mumin, mumax, 20).forEach(function(x) {
                            var w = __WEBPACK_IMPORTED_MODULE_2__common_markowitz__["a" /* Markowitz */].efficientPortfolio(cov, mus, x);
                            var mu = __WEBPACK_IMPORTED_MODULE_2__common_markowitz__["a" /* Markowitz */].portfolioMu(mus, w);
                            var sigma = __WEBPACK_IMPORTED_MODULE_2__common_markowitz__["a" /* Markowitz */].portfolioSigma(cov, w);
                            effs.push({ mu: mu, sigma: sigma });
                            var ws = Array(n).fill(0);
                            indices.forEach(function(d, i) {
                                return (ws[d] = w[i]);
                            });
                            weights.push(ws);
                        });
                    } else if (mus.length == 1) {
                        var ws = Array(n).fill(0);
                        ws[indices[0]] = 1;
                        weights.push(ws);
                    }
                    this.efficientFrontierPoints = effs;
                    var ms = [];
                    if (this.latestClick && weights.length > 0) {
                        if (effs.length > 0) {
                            var pws = [];
                            if (effs.length > 0) {
                                var sp = new __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__["a" /* NaturalCubicSpline */](
                                    effs.map(function(d) {
                                        return _this.scales.x(d.sigma);
                                    }),
                                    effs.map(function(d) {
                                        return _this.scales.y(d.mu);
                                    }),
                                    false
                                );
                                var tclosest = sp.findMin(function(sp, t) {
                                    var nde = sp.nodeAt(t);
                                    var dx = nde.x - _this.latestClick.x;
                                    var dy = nde.y - _this.latestClick.y;
                                    return dx * dx + dy * dy;
                                });
                                var nde = sp.nodeAt(tclosest);
                                this.selectedPortfolio = new __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__["b" /* Node */](this.scales.x.invert(nde.x), this.scales.y.invert(nde.y));
                                for (var i = 0; i < n; i++) {
                                    var spw = new __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__["c" /* NaturalCubicSplineOneDim */](
                                        sp.splinex.xs,
                                        weights.map(function(d) {
                                            return d[i];
                                        })
                                    );
                                    pws.push(Math.max(spw.interpolate(tclosest), 0));
                                }
                            }
                            this.portfolioWeights = pws;
                        } else this.portfolioWeights = weights[0];
                        this.portfolioWeightsChange.emit(this.portfolioWeights);
                        //var s = ws.map(d => d.toFixed(3)).join(", ");
                    } else {
                        this.selectedPortfolio = undefined;
                        var oldpw = this.portfolioWeights;
                        this.portfolioWeights = undefined;
                        if (oldpw !== undefined) this.portfolioWeightsChange.emit(this.portfolioWeights);
                    }
                };
                CapmChartComponent.prototype.onChartClick = function(owner, _this) {
                    var coords = d3.mouse(owner._groups[0][0]);
                    _this.latestClick = new __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__["b" /* Node */](coords[0], coords[1]);
                    _this.calcEfficientFrontier();
                    _this.updateChart();
                };
                CapmChartComponent.prototype.createChart = function() {
                    var _this = this;
                    if (this.chartContainer.nativeElement.offsetWidth == 0) return;
                    if (this.svgChart) return;
                    this.svgChart = new __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */](this.chartContainer.nativeElement, this.widthHeightRatio, this.margin);
                    this.scales.x = d3
                        .scaleLinear()
                        .domain([this.minSigma, this.maxSigma])
                        .range([0, this.svgChart.width]);
                    this.scales.y = d3
                        .scaleLinear()
                        .domain([this.minMu, this.maxMu])
                        .range([this.svgChart.height, 0]);
                    this.latestClick = new __WEBPACK_IMPORTED_MODULE_4__common_natural_cubic_spline__["b" /* Node */](this.svgChart.width / 2, this.svgChart.height / 2);
                    this.svgChart.updateAxises(this.scales, [0.1, 0.2], [0, 0.05]);
                    this.svgChart.chart
                        .append("rect")
                        .attr("class", "click")
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr("width", this.svgChart.width)
                        .attr("height", this.svgChart.height)
                        .attr("fill", "rgba(255, 255, 255, 0)"); //net.brehaut.Color("#fff").setAlpha(0.0).toCSS());
                    var sel = this.svgChart.chart.select("rect.click");
                    sel.on("click", function() {
                        _this.onChartClick(sel, _this);
                    });
                    //this.svgChart.chart.on("click", this.onChartClick);
                    if (this.showAnnotation) {
                        this.svgChart.addArrow(50, 175, -90, 150, "Avkastning");
                        this.svgChart.addArrow(this.svgChart.width - 140, this.svgChart.height - 30, 0, 110, "Risk");
                    }
                    this.svgChart.chart.append("path").attr("class", "line efficientfrontier");
                };
                CapmChartComponent.prototype.onDrag = function(d, i) {
                    d.x = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].minmax(d.parent.scales.x.invert(d3.mouse(this)[0]), d.parent.minSigma, d.parent.maxSigma);
                    d.y = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].minmax(d.parent.scales.y.invert(d3.mouse(this)[1]), d.parent.minMu, d.parent.maxMu);
                    var mus = d.parent.musAndSigmas.map(function(d) {
                        return d.y;
                    });
                    var sigmas = d.parent.musAndSigmas.map(function(d) {
                        return d.x;
                    });
                    d.parent.musChange.emit(mus);
                    d.parent.sigmasChange.emit(sigmas);
                    d.parent.calcEfficientFrontier();
                    d.parent.portfolioWeightsChange.emit(d.parent.portfolioWeights);
                    d.parent.updateChart();
                };
                CapmChartComponent.prototype.updatePortfolio = function(chart, portfs, size, sw, transitionDuration) {
                    var append = function(sel) {
                        return sel
                            .append("path")
                            .attr("fill", "#fff")
                            .attr("stroke-width", sw);
                    };
                    var f = size / (61 + sw);
                    var gsel = chart.selectAll("g.portfolio").data(portfs);
                    var mod = function(sel) {
                        return sel.attr("transform", function(d) {
                            return "translate(" + d.x.toFixed(1) + "," + d.y.toFixed(1) + ") scale(" + f.toFixed(3) + "," + f.toFixed(3) + ") translate(" + (-1.5 - 61 / 2).toFixed(1) + "," + (-1.5 - 61 / 2).toFixed(1) + ")";
                        });
                    };
                    mod(gsel.transition().duration(transitionDuration));
                    var gsel2 = mod(
                        gsel
                            .enter()
                            .append("g")
                            .attr("class", "portfolio")
                    );
                    append(gsel2).attr("d", "M21.467,15.16h21.066V8.937c0-2.489-1.912-4.508-4.272-4.508H25.739c-2.36,0-4.272,2.019-4.272,4.508V15.16z");
                    append(gsel2).attr("d", "M3.5,15.16h57c1.104,0,2,0.896,2,2V32h-61V17.16C1.5,16.056,2.396,15.16,3.5,15.16z");
                    append(gsel2)
                        .attr("class", "d1")
                        .attr("d", "M62.5,32v25.16c0,1.105-0.896,2-2,2h-57c-1.104,0-2-0.895-2-2V32H62.5z");
                    append(gsel2)
                        .attr("class", "d2")
                        .attr("d", "M27.728,32v-1.993c0-2.489,1.912-4.508,4.272-4.508c2.358,0,4.272,2.019,4.272,4.508V32v3.99c0,2.489-1.914,4.509-4.272,4.509c-2.36,0-4.272-2.02-4.272-4.509V32z");
                    gsel.exit().remove();
                };
                CapmChartComponent.prototype.updateChart = function() {
                    var _this = this;
                    if (!this.svgChart) return;
                    if (!this.musAndSigmas) return;
                    var toPercent = function(d, digits) {
                        var res = (100 * d).toFixed(digits);
                        if (res == "-0") res = "0";
                        return res.replace(".", ",") + "%";
                    };
                    var mod, sel;
                    if (this._instruments) {
                        var ds = this.musAndSigmas.slice(0);
                        if (this.selectedPortfolio && this.showPortfolio) {
                            var portfobj = { x: this.selectedPortfolio.x, y: this.selectedPortfolio.y, shortName: "PORTF", anchor: "topleft" };
                            ds.push(portfobj);
                        }
                        sel = this.svgChart.chart.selectAll("g.label").data(ds);
                        mod = function(sel) {
                            var sel2 = sel.attr("transform", function(d) {
                                return "translate(" + _this.scales.x(d.x).toFixed(2) + "," + (_this.scales.y(d.y).toFixed(2) + 3) + ")";
                            });
                            var mod2 = function(sel) {
                                return sel
                                    .attr("style", function(d) {
                                        return "text-anchor: " + (d.anchor == "topleft" ? "end" : "start") + ";";
                                    })
                                    .text(function(d) {
                                        return d.text;
                                    })
                                    .attr("x", function(d) {
                                        return (d.anchor == "topleft" ? -1 : 1) * _this._circleRadius;
                                    })
                                    .attr("y", function(d, i) {
                                        return (1.1 * (i + (d.anchor == "topleft" ? -1.9 : 1.1))).toFixed(1) + "em";
                                    });
                            };
                            var sel3 = sel2.selectAll("text").data(function(d, i) {
                                var sn = d.shortName;
                                if (!sn) {
                                    var ins = _this._instruments[i];
                                    if (ins === undefined) return [];
                                    if (!ins.shortName) return [];
                                    sn = ins.shortName;
                                }
                                return [sn, toPercent(d.y, 1) + " / " + toPercent(d.x, 1)].map(function(g) {
                                    return { text: g, anchor: d.anchor };
                                });
                            });
                            mod2(sel3);
                            mod2(sel3.enter().append("text"));
                            sel3.exit().remove();
                        };
                        mod(sel);
                        mod(
                            sel
                                .enter()
                                .append("g")
                                .attr("class", "label")
                        );
                        sel.exit().remove();
                    }
                    if (this.showInitialValues && this.initialMusAndSigmas) {
                        sel = this.svgChart.chart.selectAll("circle.initial").data(this.initialMusAndSigmas);
                        var calcColor = function(d, i) {
                            var ci = i;
                            if (_this._instruments) if (_this._instruments.length > i) ci = _this._instruments[i].colorIndex - 1;
                            var color = net.brehaut.Color(_this.svgChart.colors[ci]);
                            var light0 = color.getLightness();
                            return color.setLightness(light0 + (1 - light0) * 0.65).toCSS();
                        };
                        mod = function(sel) {
                            return sel
                                .attr("class", "dot initial")
                                .attr("fill", calcColor)
                                .attr("r", function(d) {
                                    return _this._circleRadius;
                                })
                                .attr("cx", function(d) {
                                    return _this.scales.x(d.x);
                                })
                                .attr("cy", function(d) {
                                    return _this.scales.y(d.y);
                                });
                        };
                        mod(sel);
                        mod(sel.enter().append("circle"));
                        sel.exit().remove();
                    }
                    sel = this.svgChart.chart.selectAll("circle.moveable").data(this.musAndSigmas);
                    mod = function(sel) {
                        return sel
                            .attr("class", function(d, i) {
                                var ci = i + 1;
                                if (_this._instruments) if (_this._instruments.length > i) ci = _this._instruments[i].colorIndex;
                                return "dot moveable c" + ci;
                            })
                            .attr("r", function(d) {
                                return _this._circleRadius;
                            })
                            .attr("cx", function(d) {
                                return _this.scales.x(d.x);
                            })
                            .attr("cy", function(d) {
                                return _this.scales.y(d.y);
                            });
                    };
                    mod(sel);
                    mod(sel.enter().append("circle")).call(this.circledrag);
                    sel.exit().remove();
                    var ms = [];
                    if (this.selectedPortfolio && this.showPortfolio) ms.push({ x: this.scales.x(this.selectedPortfolio.x), y: this.scales.y(this.selectedPortfolio.y) });
                    this.updatePortfolio(this.svgChart.chart, ms, 36, 5, 0);
                    //sel = this.svgChart.chart.selectAll("circle.efficientfrontier")
                    //    .data(ms);
                    //mod = (sel) => {
                    //    return sel
                    //        .attr("r", d => this._circleRadius)
                    //        .attr("cx", d => d.x)
                    //        .attr("cy", d => d.y);
                    //};
                    //mod(sel.transition().duration(600));
                    //mod(sel.enter().append("circle").attr("class", "dot fixed efficientfrontier"));
                    //sel.exit().remove();
                    var line = d3
                        .line()
                        .curve(d3.curveBasis)
                        .x(function(d) {
                            return _this.scales.x(d.sigma);
                        })
                        .y(function(d) {
                            return _this.scales.y(d.mu);
                        });
                    sel = this.svgChart.chart.selectAll("path.line.efficientfrontier").data([{}]);
                    var effs = [];
                    if (this.efficientFrontierPoints) effs = this.efficientFrontierPoints;
                    sel.datum(effs)
                        .transition()
                        .duration(this.transitionDuration)
                        .attr("d", line);
                };
                return CapmChartComponent;
            })();
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], CapmChartComponent.prototype, "showPortfolio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], CapmChartComponent.prototype, "widthHeightRatio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object)], CapmChartComponent.prototype, "margin", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], CapmChartComponent.prototype, "showAnnotation", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], CapmChartComponent.prototype, "showInitialValues", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], CapmChartComponent.prototype, "_circleRadius", void 0);
            __decorate(
                [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("chart"), __metadata("design:type", (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a) || Object)],
                CapmChartComponent.prototype,
                "chartContainer",
                void 0
            );
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], CapmChartComponent.prototype, "musChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CapmChartComponent.prototype, "mus", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], CapmChartComponent.prototype, "sigmasChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], CapmChartComponent.prototype, "portfolioWeightsChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CapmChartComponent.prototype, "sigmas", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CapmChartComponent.prototype, "correlations", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CapmChartComponent.prototype, "muRiskFree", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], CapmChartComponent.prototype, "instruments", null);
            CapmChartComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "capm-chart",
                        template: __webpack_require__(308),
                        styles: [__webpack_require__(300)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                CapmChartComponent
            );

            var _a;
            //# sourceMappingURL=capm-chart.component.js.map

            /***/
        },

        /***/ 236: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return CaptorLogoComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var CaptorLogoComponent = (function() {
                function CaptorLogoComponent() {
                    this.width = "100%";
                    this.height = "100%";
                    this.color = "#231F20";
                }
                CaptorLogoComponent.prototype.ngOnInit = function() {};
                return CaptorLogoComponent;
            })();
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", String)], CaptorLogoComponent.prototype, "width", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", String)], CaptorLogoComponent.prototype, "height", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", String)], CaptorLogoComponent.prototype, "color", void 0);
            CaptorLogoComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "captor-logo",
                        template: __webpack_require__(309),
                        styles: [__webpack_require__(301)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                CaptorLogoComponent
            );

            //# sourceMappingURL=captor-logo.component.js.map

            /***/
        },

        /***/ 237: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return CaptorTableComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var CaptorTableComponent = (function() {
                function CaptorTableComponent() {}
                CaptorTableComponent.prototype.ngOnInit = function() {};
                CaptorTableComponent.prototype.isFirstRow = function(idx) {
                    if (idx > 0) return false;
                    return this.columnHeaders === undefined;
                };
                CaptorTableComponent.prototype.isLastRow = function(idx) {
                    if (this.rows === undefined) return true;
                    return idx == this.rows.length - 1;
                };
                return CaptorTableComponent;
            })();
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array)], CaptorTableComponent.prototype, "columnHeaders", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array)], CaptorTableComponent.prototype, "rowHeaders", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array)], CaptorTableComponent.prototype, "rows", void 0);
            CaptorTableComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "captor-table",
                        template: __webpack_require__(310),
                        styles: [__webpack_require__(302)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                CaptorTableComponent
            );

            //# sourceMappingURL=captor-table.component.js.map

            /***/
        },

        /***/ 238: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__ = __webpack_require__(41);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_monte_carlo_engine__ = __webpack_require__(88);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return CorrelationChartComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            var CorrelationChartComponent = (function() {
                function CorrelationChartComponent() {
                    this.positionsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.correlationsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
                    this.widthHeightRatio = 1.0;
                    this.margin = { top: 10, bottom: 10, left: 10, right: 10 };
                    this._circleRadius = 14;
                    this.circledrag = d3.drag().on("drag", this.onDrag);
                    this.maxPosition = 0.75;
                    this.showAnnotation = false;
                }
                CorrelationChartComponent.prototype.ngOnInit = function() {
                    this.createChart();
                    this.updateChart();
                    this.setCorrelations();
                };
                Object.defineProperty(CorrelationChartComponent.prototype, "circleRadius", {
                    set: function(v) {
                        if (this._circleRadius === v) return;
                        this._circleRadius = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CorrelationChartComponent.prototype, "positions", {
                    set: function(v) {
                        var _this = this;
                        this._positions = v.map(function(d) {
                            return {
                                x: d.x,
                                y: d.y,
                                parent: _this
                            };
                        });
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                CorrelationChartComponent.prototype.ngOnChanges = function() {};
                Object.defineProperty(CorrelationChartComponent.prototype, "correlation", {
                    get: function() {
                        return this._correlations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CorrelationChartComponent.prototype, "instruments", {
                    set: function(v) {
                        this._instruments = v;
                        this.updateChart();
                    },
                    enumerable: true,
                    configurable: true
                });
                CorrelationChartComponent.prototype.createChart = function() {
                    this.svgChart = new __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */](this.chartContainer.nativeElement, this.widthHeightRatio, this.margin);
                    this.scales = {};
                    this.scales.x = d3
                        .scaleLinear()
                        .domain([-this.maxPosition, this.maxPosition])
                        .range([0, this.svgChart.width]);
                    this.scales.y = d3
                        .scaleLinear()
                        .domain([this.maxPosition, -this.maxPosition])
                        .range([0, this.svgChart.height]);
                    this.svgChart.updateAxises(this.scales, [0], [0]);
                    if (this.showAnnotation) {
                        this.svgChart.arrowHeadLength = 13;
                        this.svgChart.addArrow(25, this.svgChart.height - 65, 0, 80, null, true, true);
                        this.svgChart.addArrow(65, this.svgChart.height - 105, 90, 80, null, true, true);
                        this.svgChart.addText(85, this.svgChart.height - 85, 0, "Korrelation", "start");
                    }
                };
                CorrelationChartComponent.prototype.setCorrelations = function() {
                    this._correlations = __WEBPACK_IMPORTED_MODULE_2__common_monte_carlo_engine__["a" /* MonteCarloEngine */].calcCorrelations(this._positions);
                    this.positionsChange.emit(this._positions);
                    this.correlationsChange.emit(this._correlations);
                };
                CorrelationChartComponent.prototype.onDrag = function(d, i) {
                    d.x = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].minmax(d.parent.scales.x.invert(d3.mouse(this)[0] + 0.1 * Math.random()), -d.parent.maxPosition, d.parent.maxPosition);
                    d.y = __WEBPACK_IMPORTED_MODULE_1__common_svg_chart__["a" /* SvgChart */].minmax(d.parent.scales.y.invert(d3.mouse(this)[1] + 0.1 * Math.random()), -d.parent.maxPosition, d.parent.maxPosition);
                    d.parent.setCorrelations();
                    d.parent.updateChart();
                };
                CorrelationChartComponent.prototype.updateChart = function() {
                    var _this = this;
                    if (this.svgChart === undefined || this._positions === undefined || this._circleRadius === undefined) return;
                    if (this._instruments) {
                        sel = this.svgChart.chart.selectAll("text.label").data(this._positions);
                        var mod = function(sel) {
                            return sel
                                .attr("x", function(d) {
                                    return _this._circleRadius + _this.scales.x(d.x);
                                })
                                .attr("y", function(d) {
                                    return _this._circleRadius + 10 + _this.scales.y(d.y);
                                })
                                .text(function(d, i) {
                                    var ins = _this._instruments[i];
                                    if (!ins) return "";
                                    if (!ins.shortName) return "";
                                    return ins.shortName;
                                });
                        };
                        mod(sel);
                        mod(
                            sel
                                .enter()
                                .append("text")
                                .attr("class", "label")
                        );
                        sel.exit().remove();
                    }
                    var sel = this.svgChart.chart.selectAll("circle.moveable").data(this._positions);
                    var modfun = function(sel) {
                        return sel
                            .attr("class", function(d, i) {
                                var ci = i + 1;
                                if (_this._instruments) if (_this._instruments.length > i) ci = _this._instruments[i].colorIndex;
                                return "dot moveable c" + ci;
                            })
                            .attr("r", function(d) {
                                return _this._circleRadius;
                            })
                            .attr("cx", function(d) {
                                return _this.scales.x(d.x);
                            })
                            .attr("cy", function(d) {
                                return _this.scales.y(d.y);
                            });
                    };
                    modfun(sel);
                    modfun(sel.enter().append("circle")).call(this.circledrag);
                    sel.exit().remove();
                };
                CorrelationChartComponent.prototype.coordToString = function(c, n) {
                    if (n === undefined) n = 2;
                    return c
                        .slice(0, n)
                        .map(function(d) {
                            return d.toFixed(2);
                        })
                        .join(", ");
                };
                return CorrelationChartComponent;
            })();
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Boolean)], CorrelationChartComponent.prototype, "showAnnotation", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], CorrelationChartComponent.prototype, "widthHeightRatio", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Number)], CorrelationChartComponent.prototype, "_circleRadius", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], CorrelationChartComponent.prototype, "positions", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], CorrelationChartComponent.prototype, "positionsChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object)], CorrelationChartComponent.prototype, "margin", void 0);
            __decorate(
                [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("chart"), __metadata("design:type", (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a) || Object)],
                CorrelationChartComponent.prototype,
                "chartContainer",
                void 0
            );
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object)], CorrelationChartComponent.prototype, "correlationsChange", void 0);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], CorrelationChartComponent.prototype, "instruments", null);
            CorrelationChartComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "correlation-chart",
                        template: __webpack_require__(311),
                        styles: [__webpack_require__(303)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                CorrelationChartComponent
            );

            var _a;
            //# sourceMappingURL=correlation-chart.component.js.map

            /***/
        },

        /***/ 239: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return Instrument;
            });
            var Instrument = (function() {
                function Instrument(name, shortName, type, index, colorIndex) {
                    this.name = name;
                    this.shortName = shortName;
                    this.index = index;
                    this.colorIndex = colorIndex;
                    this.type = type;
                }
                return Instrument;
            })();

            //# sourceMappingURL=instrument.js.map

            /***/
        },

        /***/ 240: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() {
                return Node;
            });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() {
                return NaturalCubicSplineOneDim;
            });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return NaturalCubicSpline;
            });
            var Node = (function() {
                function Node(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Object.defineProperty(Node.prototype, "length", {
                    get: function() {
                        return Math.sqrt(this.x * this.x + this.y * this.y);
                    },
                    enumerable: true,
                    configurable: true
                });
                return Node;
            })();

            var NaturalCubicSplineOneDim = (function() {
                function NaturalCubicSplineOneDim(xs, ys) {
                    this.xs = xs;
                    this.ys = ys;
                    this.calculatePolynoms();
                }
                NaturalCubicSplineOneDim.prototype.indexOf = function(t, vs) {
                    var i;
                    var n = vs.length;
                    if (n == 0) return -1;
                    else if (t < vs[0]) return -1;
                    else if (t >= vs[n - 1]) return n - 1;
                    if (n > 40) {
                        var hi = n - 1;
                        var low = 0;
                        if (t.valueOf() >= vs[hi]) return hi;
                        while (hi > low + 1) {
                            i = Math.floor((hi + low) / 2);
                            if (t >= vs[i]) low = i;
                            else {
                                hi = i;
                                i = low;
                            }
                        }
                        return i;
                    } else {
                        i = 1;
                        while (t >= vs[i] && i < n - 1) i++;
                        return i - 1;
                    }
                };
                NaturalCubicSplineOneDim.prototype.createNumberArray = function(n) {
                    var res = [];
                    res.length = n;
                    for (var i = 0; i < n; i++) {
                        res[i] = 0;
                    }
                    return res;
                };
                NaturalCubicSplineOneDim.prototype.calculatePolynoms = function() {
                    var n = this.xs.length;
                    // Calculate Natural Cubic Splines
                    var vB = this.createNumberArray(n);
                    var vU = this.createNumberArray(n);
                    var vV = this.createNumberArray(n);
                    var vZ = this.createNumberArray(n);
                    var vA = this.createNumberArray(n);
                    var vC = this.createNumberArray(n);
                    var vH = this.createNumberArray(n);
                    this.splinesA = this.createNumberArray(n);
                    this.splinesB = this.createNumberArray(n);
                    this.splinesC = this.createNumberArray(n);
                    for (var i = 0; i < n - 1; i++) {
                        vH[i] = this.xs[i + 1] - this.xs[i];
                        vB[i] = (6.0 * (this.ys[i + 1] - this.ys[i])) / vH[i];
                    }
                    vU[1] = 2 * (vH[0] + vH[1]);
                    vV[1] = vB[1] - vB[0];
                    for (var i = 2; i < n - 1; i++) {
                        vU[i] = 2 * (vH[i] + vH[i - 1]) - (vH[i - 1] * vH[i - 1]) / vU[i - 1];
                        vV[i] = vB[i] - vB[i - 1] - (vH[i - 1] * vV[i - 1]) / vU[i - 1];
                    }
                    vZ[n - 1] = vZ[0] = 0;
                    for (var i = n - 2; i > 0; i--) vZ[i] = (vV[i] - vH[i] * vZ[i + 1]) / vU[i];
                    for (var i = 0; i < n - 1; i++) {
                        this.splinesA[i] = (vZ[i + 1] - vZ[i]) / (6.0 * vH[i]);
                        this.splinesB[i] = 0.5 * vZ[i];
                        this.splinesC[i] = (-vH[i] * vZ[i + 1]) / 6.0 - (vH[i] * vZ[i]) / 3.0 + (this.ys[i + 1] - this.ys[i]) / vH[i];
                    }
                };
                NaturalCubicSplineOneDim.prototype.splineCalc = function(x, fun) {
                    var i;
                    var n = this.xs.length;
                    i = this.indexOf(x, this.xs);
                    if (i < 0) i = 0;
                    else if (i == n - 1) i = n - 2;
                    var x1 = this.xs[i];
                    var y1 = this.ys[i];
                    var t = x - x1;
                    return fun(t, y1, this.splinesA[i], this.splinesB[i], this.splinesC[i]);
                };
                NaturalCubicSplineOneDim.prototype.interpolate = function(x) {
                    return this.splineCalc(x, function(t, y, a, b, c) {
                        return y + t * (c + t * (b + t * a));
                    });
                };
                NaturalCubicSplineOneDim.prototype.firstDerivative = function(x) {
                    return this.splineCalc(x, function(t, y, a, b, c) {
                        return c + t * (2 * b + 3 * t * a);
                    });
                };
                NaturalCubicSplineOneDim.prototype.secondDerivative = function(x) {
                    return this.splineCalc(x, function(t, y, a, b, c) {
                        return 2 * b + 6 * t * a;
                    });
                };
                return NaturalCubicSplineOneDim;
            })();

            var NaturalCubicSpline = (function() {
                function NaturalCubicSpline(xs, ys, closedpath) {
                    var n = xs.length;
                    var ts = [];
                    var xxs = [];
                    var yys = [];
                    if (closedpath) {
                        for (var i = 0; i < n + 3; i++) {
                            var j = (i - 1 + n) % n;
                            xxs.push(xs[j]);
                            yys.push(ys[j]);
                            ts.push((i - 1) / n);
                        }
                    } else {
                        for (var i = 0; i < n; i++) {
                            xxs.push(xs[i]);
                            yys.push(ys[i]);
                            ts.push(i / (n - 1));
                        }
                    }
                    this.splinex = new NaturalCubicSplineOneDim(ts, xxs);
                    this.spliney = new NaturalCubicSplineOneDim(ts, yys);
                    this.smoothnesssteps = 20;
                }
                NaturalCubicSpline.prototype.nodeAt = function(t) {
                    return new Node(this.splinex.interpolate(t), this.spliney.interpolate(t));
                };
                NaturalCubicSpline.prototype.tangentAt = function(t) {
                    return new Node(this.splinex.firstDerivative(t), this.spliney.firstDerivative(t));
                };
                NaturalCubicSpline.prototype.offsetAt = function(t, w) {
                    var n0 = this.nodeAt(t);
                    var nt = this.tangentAt(t);
                    var d = nt.length;
                    return new Node(n0.x - (w * nt.y) / d, n0.y + (w * nt.x) / d);
                };
                NaturalCubicSpline.prototype.smoothness = function() {
                    var s = 0.0;
                    var n = this.smoothnesssteps;
                    if (this.splinex.xs.length > n) n = this.splinex.xs.length;
                    for (var i = 0; i <= n; i++) {
                        var t = i / n;
                        var d1x = this.splinex.firstDerivative(t);
                        var d1y = this.spliney.firstDerivative(t);
                        var d2x = this.splinex.secondDerivative(t);
                        var d2y = this.spliney.secondDerivative(t);
                        s += (d2x * d2x + d2y * d2y) / (d1x * d1x + d1y * d1y);
                    }
                    return s / n;
                };
                NaturalCubicSpline.prototype.findMin = function(errfun) {
                    var gr = (Math.sqrt(5) + 1) / 2;
                    var a = 0;
                    var fa = errfun(this, a);
                    var b = 1;
                    var fb = errfun(this, b);
                    var c = b - (b - a) / gr;
                    var fc = errfun(this, c);
                    var d = a + (b - a) / gr;
                    var fd = errfun(this, d);
                    var err = 1.0;
                    var nIter = 0;
                    while (true) {
                        if ((d - c) / (b - a) < 1e-6) {
                            return (d + c) / 2;
                        }
                        if (fc < fd) {
                            b = d;
                            fb = fd;
                            d = c;
                            fd = fc;
                            c = b - (b - a) / gr;
                            fc = errfun(this, c);
                        } else {
                            a = c;
                            fa = fc;
                            c = d;
                            fc = fd;
                            d = a + (b - a) / gr;
                            fd = errfun(this, d);
                        }
                        nIter++;
                    }
                };
                return NaturalCubicSpline;
            })();

            //# sourceMappingURL=natural-cubic-spline.js.map

            /***/
        },

        /***/ 241: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(323);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__ = __webpack_require__(89);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__ = __webpack_require__(88);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_instrument__ = __webpack_require__(239);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_markowitz__ = __webpack_require__(165);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular2_time_series_projection_chart_time_series_projection_chart_component__ = __webpack_require__(164);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_daycount__ = __webpack_require__(59);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_daycount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_daycount__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return AppComponent;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
            var __metadata =
                (this && this.__metadata) ||
                function(k, v) {
                    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
                };

            //@Injectable()
            //export class NgbCarouselConfig {
            //    interval = 3000;
            //    wrap = true;
            //    keyboard = true;
            //}
            var AppComponent = (function() {
                function AppComponent() {
                    this.ticks = 0;
                    this.title = "app works!";
                    this.seed1 = "123";
                    Math.seedrandom(this.seed1);
                    //var n = 5;
                    //var ps = [];
                    //for (var i = 0; i < n; i++) {
                    //    ps.push(new CorrPosition(MonteCarloEngine.rand1(-0.5, 0.5), MonteCarloEngine.rand1(-0.5, 0.5)));
                    //}
                    this._weights2 = [0.0, 1.0];
                    this.solvencyRatio = this.calcSolvencyRatio(this._weights2);
                    this.origMus = [0.046, 0.005, 0.006, 0.015, 0.01, -0.003]; // Assets yearly returns
                    this.origSigmas = [0.15, 0.016, 0.036, 0.101, 0.049, 0.0025]; // Assets volatilities
                    //this.origMus = [0.045, 0.04, 0.03, 0.009, 0.025, -0.005]; // Assets yearly returns
                    //this.origSigmas = [0.15, 0.12, 0.05, 0.03, 0.07, 0.0001]; // Assets volatilities
                    this.origCorrs = [
                        [1.0, -0.33, 0.65, -0.31, -0.31, 0.005],
                        [-0.33, 1.0, -0.31, -0.31, 0.92, 0.005],
                        [0.65, -0.31, 1.0, -0.26, -0.27, 0.005],
                        [-0.31, -0.31, -0.26, 1.0, 0.96, 0.005],
                        [-0.31, 0.92, -0.27, 0.96, 1.0, 0.005],
                        [0.005, 0.005, 0.005, 0.005, 0.005, 1.0]
                    ];
                    this.corrPositions1 = __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */].calcCorrPositions(this.origCorrs).map(function(d) {
                        return new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["b" /* CorrPosition */](d[0], d[1]);
                    });
                    //this.corrPositions1 = [[-0.3989, 0.3989], [-0.2654, 0.4116], [-0.5113, -0.0134], [0.22, -0.6565], [0.3616, -0.488], [0.594, 0.3474]].map(d => new CorrPosition(d[0], d[1]));
                    //this.origCorrs = MonteCarloEngine.calcCorrelations(this.corrPositions1);
                    this.mc1 = new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */](this.seed1, this.origMus, this.origSigmas, this.origCorrs);
                    this.correlationsAsString = this.mc1.correlations.map(function(d, i) {
                        return d.map(function(g, j) {
                            return j >= i ? g.toFixed(2) : "";
                        });
                    });
                    this.calcRelativeMuAndSigma();
                    var rho = 0.2;
                    var d = (1 - rho) / 2 / Math.sqrt(2);
                    this.corrPositions2 = [new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["b" /* CorrPosition */](-d, d), new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["b" /* CorrPosition */](d, -d)];
                    var corrs2 = __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */].calcCorrelations(this.corrPositions2);
                    var mu2 = [0.05, 0.03]; // [this.origMus[4], this.origMus[5]];
                    var sigma1 = 0.09; // this.origSigmas[4];
                    var sigma2 = 0.11; // this.origSigmas[4];
                    this.mc2 = new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */](this.seed1, mu2, [sigma1, sigma2], corrs2);
                    this.mc3 = new __WEBPACK_IMPORTED_MODULE_3__common_monte_carlo_engine__["a" /* MonteCarloEngine */](this.seed1, [mu2[0] - mu2[1]], [Math.sqrt(sigma1 * sigma1 + sigma2 * sigma2 - 2 * sigma1 * sigma2 * rho)], [[1]]);
                    this.calcSolvencyTimeSeriess();
                    this.instruments = [];
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Svenska aktier", "SV AKT", "asset", null, 1));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Svensk ränta", "RÄNTA", "asset", null, 2));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Hedgefonder", "HEDGE", "asset", null, 3));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Lång ränta (20 år)", "20ÅR", "asset", null, 4));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Lång ränta (Garanti)", "GARANT", "asset", null, 5));
                    //this.instruments.push(new Instrument("Iris ränta", "IRIS", "asset", null, 5));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Nollrisk", "RISKFRI", "asset", null, 10));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Åtagande", "ÅTAG", "liability", null, 11));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Överskott", "ÖVERSK", "liability", null, 6));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Tillgångar", "TILLG", "balance", null, 1));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Åtagande", "ÅTAG", "balance", null, 7));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Solensgrad", "SOLV", "solvency", null, 12));
                    this.instruments.push(new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Insolvens", "INSOLV", "solvency", null, 3));
                    this.instruments.forEach(function(d, i) {
                        return (d.index = i);
                    });
                    this.assetInstruments = this.instruments.filter(function(d) {
                        return d.type == "asset";
                    });
                    this.assetPlusBankInstruments = this.assetInstruments.slice(0);
                    this.assetPlusBankInstruments[5] = new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */]("Bankkonto", "BANK", "asset", null, 10);
                    this.assetInstrumentsShortName = this.assetInstruments.map(function(d) {
                        return d.shortName;
                    });
                    this.assetInstrumentsColumnShortName = [""].concat(
                        this.assetPlusBankInstruments.map(function(d) {
                            return d.shortName;
                        })
                    );
                    this.liabilityInstruments = this.instruments.filter(function(d) {
                        return d.type == "liability";
                    });
                    this.balanceInstruments = this.instruments.filter(function(d) {
                        return d.type == "balance";
                    });
                    this.solvencyInstruments = this.instruments.filter(function(d) {
                        return d.type == "solvency";
                    });
                    this.liabilityInstrumentsNoNames = this.instruments
                        .filter(function(d) {
                            return d.type == "liability";
                        })
                        .map(function(d) {
                            return new __WEBPACK_IMPORTED_MODULE_4__common_instrument__["a" /* Instrument */](null, null, null, null, d.colorIndex);
                        });
                    //this.weights1 = this.randomWeights(5);
                    this.status = "{ " + window.innerWidth + " x " + window.innerHeight + " }";
                    this.testTimeSeriess = []; // [TimeSeries.generateRandomTimeSeries("AAA", (new Date()).addMonths(-6), new Date(), true, 0.075, 0.15, 0, "xyz")];
                }
                AppComponent.prototype.setPortfolioWeights = function(ws) {
                    if (!ws) {
                        this.weights1 = [];
                        return;
                    }
                    this.weights1 = ws.slice(0);
                };
                AppComponent.prototype.randomWeights = function(n) {
                    var res = [];
                    for (var i = 0; i < n; i++) {
                        res.push(Math.exp(6 * Math.random() - 3));
                    }
                    return res;
                };
                AppComponent.prototype.ngOnInit = function() {
                    var _this = this;
                    this.timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].timer(2000, 5000);
                    this.sub = this.timer.subscribe(function(t) {
                        return _this.onTimer(t);
                    });
                };
                AppComponent.prototype.ngOnDestroy = function() {
                    this.sub.unsubscribe();
                };
                AppComponent.prototype.onTimer = function(t) {
                    //this.testTimeSeriess = [
                    //    TimeSeries.generateRandomTimeSeries("AAA", (new Date()).addMonths(-6), new Date(), true, 0.075, 0.15, 0, "xyz"),
                    //    TimeSeries.generateRandomTimeSeries("BBB", (new Date()).addMonths(-4), (new Date()).addMonths(1), true, 0.05, 0.1, 0, "xyz")
                    //];
                    //this.weights1 = this.randomWeights();
                    //this.weights2 = this.randomWeights(2);
                };
                Object.defineProperty(AppComponent.prototype, "weights2", {
                    get: function() {
                        return this._weights2;
                    },
                    set: function(v) {
                        this.setWeights2(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.setWeights2 = function(v) {
                    if (!v) {
                        this._weights2 = [];
                        return;
                    }
                    this._weights2 = v.slice(0);
                    if (this._weights2.length != 2) return;
                    this.solvencyRatio = this.calcSolvencyRatio(v);
                    this.calcSolvencyTimeSeriess();
                    this.calcRelativeMuAndSigma();
                    this.setStatus1();
                };
                AppComponent.prototype.calcRelativeMuAndSigma = function() {
                    var cov = __WEBPACK_IMPORTED_MODULE_5__common_markowitz__["a" /* Markowitz */].corrToCov(this.origSigmas, this.origCorrs);
                    var w0 = this._weights2[0];
                    var w1 = this._weights2[1];
                    var newMus = [];
                    var newSigmas = [];
                    var n = this.origMus.length;
                    for (var i = 0; i < n; i++) {
                        var ws = [];
                        for (var j = 0; j < n; j++) {
                            var w = i == j ? 1 : 0;
                            ws.push(w);
                        }
                        ws[4] -= w0;
                        ws[5] -= w1;
                        //var mu = Markowitz.portfolioMu(this.origMus, ws)
                        var mu = this.origMus[i];
                        var sigma = __WEBPACK_IMPORTED_MODULE_5__common_markowitz__["a" /* Markowitz */].portfolioSigma(cov, ws);
                        if (i == 5) {
                            mu = w0 * this.origMus[4] + w1 * this.origMus[5];
                            sigma = 0.0;
                        }
                        newMus.push(mu);
                        newSigmas.push(sigma);
                    }
                    this.mc1.mus = newMus;
                    this.mc1.sigmas = newSigmas;
                };
                AppComponent.prototype.updateSolvencyLegend = function() {
                    function update(chart, data) {
                        var sel = chart.selectAll("text.legend").data(data);
                        var mod = function(sel) {
                            return sel
                                .attr("dx", 40)
                                .attr("dy", function(d, i) {
                                    return 50 + 38 * i;
                                })
                                .text(function(d) {
                                    return d.text + " " + (100 * d.value).toFixed(d.decimals) + "%";
                                })
                                .attr("style", "text-anchor: start");
                        };
                        mod(sel);
                        mod(
                            sel
                                .enter()
                                .append("text")
                                .attr("class", "legend annotation")
                        );
                        sel.exit().remove();
                    }
                    var mu = this.mc3.mus[0];
                    var sigma = this.mc3.sigmas[0];
                    var h = 1 / this.solvencyRatio - 1;
                    if (isNaN(h)) h = 0;
                    var r = Math.min(0.99, 2 * jStat.normal.cdf(h, mu, sigma));
                    update(this.solvencyRatioChart.svgChart.chart, [
                        { text: "Solvensgrad", value: this.solvencyRatio, decimals: 0 },
                        { text: "Risk för insolvens", value: r, decimals: r < 0.01 ? 2 : r < 0.15 ? 1 : 0 }
                    ]);
                };
                AppComponent.prototype.calcSolvencyTimeSeriess = function() {
                    this.solvencyTimeSeriess = [];
                    if (!this.mc3 || !this.solvencyRatioChart) return;
                    this.solvencyTimeSeriess = this.mc3.timeSeriess.slice(0);
                    if (!this.solvencyRatioChart.scales) return;
                    var startDate = this.solvencyRatioChart.scales.x.invert(0);
                    var endDate = this.solvencyRatioChart.scales.x.invert(this.solvencyRatioChart.svgChart.width);
                    var items = [];
                    items.push(new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](startDate, 1 / this.solvencyRatio));
                    items.push(new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](endDate, 1 / this.solvencyRatio));
                    var ts = new __WEBPACK_IMPORTED_MODULE_2_timeseries_ts_timeseries__["b" /* TimeSeries */](items);
                    this.solvencyTimeSeriess.push(ts);
                    //TimeSeriesChartComponent.updateChart(this.solvencyRatioChart.svgChart, [ts], [new Instrument(null, null, null, null, 3)], startDate, endDate, this.solvencyRatioChart.scales.miny, this.solvencyRatioChart.scales.maxy, false);
                    if (!this.solvencyRatioChart) return;
                    if (!this.solvencyRatioChart.svgChart) return;
                    this.updateSolvencyLegend();
                };
                AppComponent.prototype.calcSolvencyRatio = function(ws) {
                    var res = 1.0;
                    if (!ws) return res;
                    if (ws.length != 2) return res;
                    if (ws[0] == 0) return 10.0;
                    return Math.min((ws[0] + ws[1]) / ws[0], 10.0);
                };
                Object.defineProperty(AppComponent.prototype, "timeSeriess", {
                    get: function() {
                        return this.mc1.timeSeriess;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "mus", {
                    get: function() {
                        return this.mc1.mus;
                    },
                    set: function(v) {
                        this.mc1.mus = v;
                        this.setStatus1();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "sigmas", {
                    get: function() {
                        return this.mc1.sigmas;
                    },
                    set: function(v) {
                        this.mc1.sigmas = v;
                        this.setStatus1();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "mus2", {
                    get: function() {
                        return this.mc2.mus;
                    },
                    set: function(v) {
                        this.mc2.mus = v;
                        this.mc3.mus = [v[0] - v[1]];
                        this.calcSolvencyTimeSeriess();
                        this.setStatus2();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "sigmas2", {
                    get: function() {
                        return this.mc2.sigmas;
                    },
                    set: function(v) {
                        this.mc2.sigmas = v;
                        var sigma1 = v[0];
                        var sigma2 = v[1];
                        var rho = this.mc2.correlations[0][1];
                        this.mc3.sigmas = [Math.sqrt(sigma1 * sigma1 + sigma2 * sigma2 - 2 * sigma1 * sigma2 * rho)];
                        this.calcSolvencyTimeSeriess();
                        this.setStatus2();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "correlations", {
                    get: function() {
                        return this.mc1.correlations;
                    },
                    set: function(v) {
                        this.mc1.correlations = v;
                        this.setStatus1();
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.correlationsChange = function(v) {
                    this.mc1.correlations = v;
                    this.setStatus1();
                    this.correlationsAsString = this.mc1.correlations.map(function(d, i) {
                        return d.map(function(g, j) {
                            return j >= i ? g.toFixed(2) : "";
                        });
                    });
                };
                AppComponent.prototype.correlations2Change = function(v) {
                    this.mc2.correlations = v;
                    var sigma1 = this.mc2.sigmas[0];
                    var sigma2 = this.mc2.sigmas[1];
                    var rho = v[0][1];
                    this.mc3.sigmas = [Math.sqrt(sigma1 * sigma1 + sigma2 * sigma2 - 2 * sigma1 * sigma2 * rho)];
                    this.calcSolvencyTimeSeriess();
                    this.setStatus2();
                };
                AppComponent.prototype.arrayToString = function(a, n) {
                    if (n === void 0) {
                        n = 2;
                    }
                    return a
                        .map(function(d) {
                            return d.toFixed(n);
                        })
                        .join(", ");
                };
                AppComponent.prototype.monteCarloToString = function(mc) {
                    var _this = this;
                    var br = "<br/>";
                    var res = "";
                    if (mc.mus !== undefined) res = "mu = [" + this.arrayToString(mc.mus, 3) + "]" + br;
                    if (mc.sigmas !== undefined) res += "sigma = [" + this.arrayToString(mc.sigmas, 3) + "]" + br;
                    if (mc.correlations !== undefined)
                        res +=
                            "correlation = [" +
                            mc.correlations
                                .map(function(d, i) {
                                    return _this.arrayToString(d.slice(i + 1), 3);
                                })
                                .filter(function(d) {
                                    return d.length > 0;
                                })
                                .join(", ") +
                            "]";
                    return res;
                };
                AppComponent.prototype.setStatus1 = function() {
                    this.status = this.monteCarloToString(this.mc1);
                };
                AppComponent.prototype.setStatus2 = function() {
                    this.status2 = this.monteCarloToString(this.mc2) + "<br/>" + this.monteCarloToString(this.mc3);
                };
                return AppComponent;
            })();
            __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])("solvencyratiochart"),
                    __metadata(
                        "design:type",
                        (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular2_time_series_projection_chart_time_series_projection_chart_component__["a" /* TimeSeriesProjectionChartComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular2_time_series_projection_chart_time_series_projection_chart_component__["a" /* TimeSeriesProjectionChartComponent */]) === "function" && _a) ||
                            Object
                    )
                ],
                AppComponent.prototype,
                "solvencyRatioChart",
                void 0
            );
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AppComponent.prototype, "weights2", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Output */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [])], AppComponent.prototype, "timeSeriess", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AppComponent.prototype, "mus", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AppComponent.prototype, "sigmas", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AppComponent.prototype, "mus2", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Object), __metadata("design:paramtypes", [Object])], AppComponent.prototype, "sigmas2", null);
            __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(), __metadata("design:type", Array), __metadata("design:paramtypes", [Array])], AppComponent.prototype, "correlations", null);
            AppComponent = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
                        selector: "app-root",
                        template: __webpack_require__(321),
                        styles: [__webpack_require__(306)]
                    }),
                    __metadata("design:paramtypes", [])
                ],
                AppComponent
            );

            var _a;
            //# sourceMappingURL=app.component.js.map

            /***/
        },

        /***/ 242: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(227);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(232);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(241);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular2_capm_chart_capm_chart_component__ = __webpack_require__(235);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular2_correlation_chart_correlation_chart_component__ = __webpack_require__(238);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular2_time_series_chart_time_series_chart_component__ = __webpack_require__(163);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular2_time_series_projection_chart_time_series_projection_chart_component__ = __webpack_require__(164);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular2_captor_logo_captor_logo_component__ = __webpack_require__(236);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular2_balance_sheet_chart_balance_sheet_chart_component__ = __webpack_require__(234);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular2_captor_table_captor_table_component__ = __webpack_require__(237);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return AppModule;
            });
            var __decorate =
                (this && this.__decorate) ||
                function(decorators, target, key, desc) {
                    var c = arguments.length,
                        r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
                        d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
            var AppModule = (function() {
                function AppModule() {}
                return AppModule;
            })();
            AppModule = __decorate(
                [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
                        declarations: [
                            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                            __WEBPACK_IMPORTED_MODULE_6__angular2_capm_chart_capm_chart_component__["a" /* CapmChartComponent */],
                            __WEBPACK_IMPORTED_MODULE_7__angular2_correlation_chart_correlation_chart_component__["a" /* CorrelationChartComponent */],
                            __WEBPACK_IMPORTED_MODULE_8__angular2_time_series_chart_time_series_chart_component__["a" /* TimeSeriesChartComponent */],
                            __WEBPACK_IMPORTED_MODULE_9__angular2_time_series_projection_chart_time_series_projection_chart_component__["a" /* TimeSeriesProjectionChartComponent */],
                            __WEBPACK_IMPORTED_MODULE_10__angular2_captor_logo_captor_logo_component__["a" /* CaptorLogoComponent */],
                            __WEBPACK_IMPORTED_MODULE_11__angular2_balance_sheet_chart_balance_sheet_chart_component__["a" /* BalanceSheetChartComponent */],
                            __WEBPACK_IMPORTED_MODULE_12__angular2_captor_table_captor_table_component__["a" /* CaptorTableComponent */]
                        ],
                        imports: [__WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(), __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]],
                        providers: [],
                        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
                    })
                ],
                AppModule
            );

            //# sourceMappingURL=app.module.js.map

            /***/
        },

        /***/ 243: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return environment;
            });
            // The file contents for the current environment will overwrite these during build.
            // The build system defaults to the dev environment which uses `environment.ts`, but if you do
            // `ng build --env=prod` then `environment.prod.ts` will be used instead.
            // The list of which env maps to which file can be found in `.angular-cli.json`.
            // The file contents for the current environment will overwrite these during build.
            var environment = {
                production: false
            };
            //# sourceMappingURL=environment.js.map

            /***/
        },

        /***/ 299: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 300: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 301: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 302: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([
                module.i,
                "table {\r\n    border-collapse: collapse;\r\n    color: #444;\r\n}\r\n\r\ntable tr th {\r\n    border-top: 1px solid #ddd;\r\n}\r\n\r\ntable td.header {\r\n    font-weight: bold;\r\n}\r\n\r\ntable td, table th {\r\n    text-align: center;\r\n}\r\n\r\ntable tr.last th, table tr.last td {\r\n    border-bottom: 1px solid #ddd;\r\n}\r\n\r\ntable th:first-child, table td:first-child {\r\n    border-left: 1px solid #ddd;\r\n}\r\n\r\ntable th:last-child, table td:last-child {\r\n    border-right: 1px solid #ddd;\r\n}\r\n\r\ntable tr.first th:first-child, table tr.first td:first-child {\r\n    border-top-left-radius: 4px;\r\n}\r\n\r\ntable tr.first th:last-child, table tr.first td:last-child {\r\n    border-top-right-radius: 4px;\r\n}\r\n\r\ntable tr.last th:last-child, table tr.last td:last-child {\r\n    border-bottom-right-radius: 4px;\r\n}\r\n\r\ntable tr.last th:first-child, table tr.last td:first-child {\r\n    border-bottom-left-radius: 4px;\r\n}",
                ""
            ]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 303: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 304: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 305: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 306: /***/ function(module, exports, __webpack_require__) {
            exports = module.exports = __webpack_require__(16)(false);
            // imports

            // module
            exports.push([module.i, "", ""]);

            // exports

            /*** EXPORTS FROM exports-loader ***/
            module.exports = module.exports.toString();

            /***/
        },

        /***/ 307: /***/ function(module, exports) {
            module.exports = '<div class="d3-chart" #chart></div>';

            /***/
        },

        /***/ 308: /***/ function(module, exports) {
            module.exports = '<div class="d3-chart" #chart></div>';

            /***/
        },

        /***/ 309: /***/ function(module, exports) {
            module.exports =
                '<svg version="1.1" x="0px" y="0px" [attr.width]="width" [attr.height]="height" viewBox="0 0 320 320" enable-background="new 0 0 320 320" xml:space="preserve">\r\n<path [attr.fill]="color" d="M189.794,320c-39.249,0-77.315-14.855-107.188-41.83C50.067,248.784,30.641,204.609,30.641,160\r\n\tc0-45.042,18.939-88.112,51.963-118.166C112.677,14.466,149.742,0,189.794,0c36.937,0,64.737,9.767,99.157,34.835l0.408,0.297\r\n\tv249.669l-0.327,0.296C269.854,302.471,231.729,320,189.794,320z M94.009,276.704c27.326,22.417,61.285,34.746,95.785,34.746\r\n\tc37.451,0,72.603-15.291,91.028-30.546V167.446L94.009,276.704z M90.816,268.627L276.623,160L90.816,51.372V268.627z M82.245,54.061\r\n\tC54.847,82.039,39.178,120.509,39.178,160c0,38.981,16.051,78.393,43.046,105.942L82.245,54.061z M280.822,152.554l0.001-113.036\r\n\tC249.392,17.238,223.83,8.551,189.796,8.551c-35.956,0-68.201,11.692-95.866,34.757L280.822,152.554z" />\r\n</svg>';

            /***/
        },

        /***/ 310: /***/ function(module, exports) {
            module.exports =
                '<table class="table table-striped">\r\n    <thead>\r\n        <tr *ngIf="columnHeaders" [ngClass]="{ \'first\': true, \'last\': isLastRow(-1) }">\r\n            <th *ngFor="let item of columnHeaders">\r\n                {{item}}\r\n            </th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr *ngFor="let item of rows; let i = index" [ngClass]="{ \'first\': isFirstRow(i), \'last\': isLastRow(i) }">\r\n            <td *ngIf="rowHeaders" class="header">\r\n                {{rowHeaders[i]}}\r\n            </td>\r\n            <td *ngFor="let jtem of item">\r\n                {{jtem}}\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n';

            /***/
        },

        /***/ 311: /***/ function(module, exports) {
            module.exports = '<div class="d3-chart" #chart></div>';

            /***/
        },

        /***/ 312: /***/ function(module, exports) {
            module.exports = '<div class="d3-chart" #chart></div>\r\n';

            /***/
        },

        /***/ 313: /***/ function(module, exports) {
            module.exports = '<div class="d3-chart" #chart></div>';

            /***/
        },

        /***/ 321: /***/ function(module, exports) {
            module.exports =
                '<captor-logo class="logo" [width]="\'60px\'" [height]="\'60px\'" [color]="\'#777\'"></captor-logo>\r\n<ngb-carousel [interval]="0" [wrap]="true" [keyboard]="false" >\r\n    <!--<template ngbSlide>\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                <h2 class="page-header">Test CAPM</h2>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-md-6">\r\n                <capm-chart [mus]="[0.05, 0.08, 0.03]" [sigmas]="[0.1, 0.12, 0.04]"></capm-chart>\r\n            </div>\r\n            <div class="col-md-6">\r\n                <time-series-chart [timeSeriess]="testTimeSeriess"></time-series-chart>\r\n            </div>\r\n        </div>\r\n    </template>-->\r\n    <ng-template ngbSlide>\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                <h2 class="page-header">Avkastning och risk</h2>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-md-6">\r\n                <capm-chart [widthHeightRatio]="1.0" [showAnnotation]="true" [showInitialValues]="true" [(mus)]="mus" [(sigmas)]="sigmas" [correlations]="correlations" [instruments]="assetInstruments" (portfolioWeightsChange)="setPortfolioWeights($event)"></capm-chart>\r\n            </div>\r\n            <div class="col-md-3">\r\n                <balance-sheet-chart [widthHeightRatio]="0.484" [instruments]="assetPlusBankInstruments" [(weights)]="weights1"></balance-sheet-chart>\r\n            </div>\r\n            <div class="col-md-3">\r\n                <balance-sheet-chart [widthHeightRatio]="0.484" [align]="\'left\'" [instruments]="liabilityInstruments" [(weights)]="weights2"></balance-sheet-chart>\r\n            </div>\r\n            <!--<div class="col-md-3">\r\n                <balance-sheet-chart [widthHeightRatio]="0.66" [align]="\'left\'" [instruments]="instruments" [instrumentType]="\'liability\'" [(weights)]="weights2"></balance-sheet-chart>\r\n            </div>-->\r\n            <!--<div class="col-md-8">\r\n                <time-series-projection-chart [widthHeightRatio]="2.07" [timeSeriess]="timeSeriess"\r\n                                            [projectionYearsTimeSpan]="3" [mus]="mus" [sigmas]="sigmas" [correlations]="correlations"></time-series-projection-chart>\r\n            </div>-->\r\n            <!--<div class="col-md-4">\r\n                <correlation-chart [positions]="corrPositions" (correlationsChange)="correlationsChange($event)"></correlation-chart>\r\n            </div>\r\n            <div class="col-md-8">\r\n                <time-series-chart [widthHeightRatio]="2.07" [timeSeriess]="timeSeriess"></time-series-chart>\r\n            </div>-->\r\n        </div>\r\n        <div class="row debug">\r\n            <div class="col-md-12">\r\n                <span [innerHTML]="status"></span>\r\n            </div>\r\n        </div>\r\n    </ng-template>\r\n    <ng-template ngbSlide>\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                <h2 class="page-header">Korrelationer</h2>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-md-6">\r\n                <correlation-chart [showAnnotation]="true" [positions]="corrPositions1" (correlationsChange)="correlationsChange($event)" [instruments]="assetPlusBankInstruments"></correlation-chart>\r\n            </div>\r\n            <div class="col-md-6" style="margin-top: 20px;">\r\n                <captor-table [rowHeaders]="assetInstrumentsShortName" [columnHeaders]="assetInstrumentsColumnShortName"\r\n                              [rows]="correlationsAsString"></captor-table>\r\n            </div>\r\n        </div>\r\n    </ng-template>\r\n    <ng-template ngbSlide>\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                <h2 class="page-header">Tillgångar mot åtaganden</h2>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-md-4">\r\n                <capm-chart id="balance" [widthHeightRatio]="1.28" [showAnnotation]="true" [showPortfolio]="false" [(mus)]="mus2" [(sigmas)]="sigmas2" [correlations]="mc2.correlations" [instruments]="balanceInstruments"></capm-chart>\r\n            </div>\r\n            <div class="col-md-8">\r\n                <time-series-projection-chart [widthHeightRatio]="2.6" [showAnnotation]="true" [timeSeriess]="mc2.timeSeriess" [historyEndValues]="[solvencyRatio, 1]"\r\n                                              [projectionYearsTimeSpan]="3" [mus]="mc2.mus" [sigmas]="mc2.sigmas" [correlations]="mc2.correlations" [instruments]="balanceInstruments"></time-series-projection-chart>\r\n            </div>\r\n            <div class="col-md-4">\r\n                <correlation-chart [widthHeightRatio]="1.28" [showAnnotation]="true" [positions]="corrPositions2" [instruments]="balanceInstruments" (correlationsChange)="correlations2Change($event)"></correlation-chart>\r\n            </div>\r\n            <div class="col-md-7">\r\n                <time-series-projection-chart #solvencyratiochart [widthHeightRatio]="2.28" [timeSeriess]="solvencyTimeSeriess" [rescale]="false" [historyEndValues]="[1]"\r\n                                              [projectionYearsTimeSpan]="3" [mus]="mc3.mus" [sigmas]="mc3.sigmas" [correlations]="mc3.correlations" [instruments]="solvencyInstruments"></time-series-projection-chart>\r\n            </div>\r\n            <div class="col-md-1">\r\n                <balance-sheet-chart [widthHeightRatio]="0.278" [align]="\'left\'" [instruments]="[{colorIndex:7},{colorIndex:2}]" [(weights)]="weights2"></balance-sheet-chart>\r\n            </div>\r\n        </div>\r\n        <!--<div class="col-md-4">\r\n            <balance-sheet-chart [widthHeightRatio]="0.66" [align]="\'left\'" [instruments]="instruments" [instrumentType]="\'liability\'" [(weights)]="weights2"></balance-sheet-chart>\r\n        </div>-->\r\n        <div class="row debug">\r\n            <div class="col-md-12">\r\n                <span [innerHTML]="status2"></span>\r\n            </div>\r\n        </div>\r\n    </ng-template>\r\n    <!--<ng-template ngbSlide>\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                <h2 class="page-header">Balansräkning</h2>\r\n            </div>\r\n        </div>\r\n        <div class="row">\r\n            <div class="col-md-4">\r\n                <balance-sheet-chart [widthHeightRatio]="0.484" [instruments]="assetInstruments" [weights]="weights1"></balance-sheet-chart>\r\n            </div>\r\n            <div class="col-md-4">\r\n                <balance-sheet-chart [widthHeightRatio]="0.484" [align]="\'left\'" [instruments]="liabilityInstruments" [(weights)]="weights2"></balance-sheet-chart>\r\n            </div>\r\n        </div>\r\n    </ng-template>-->\r\n</ngb-carousel>';

            /***/
        },

        /***/ 41: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return SvgChart;
            });
            var SvgChart = (function() {
                function SvgChart(element, widthHeightRatio, margin) {
                    if (element === void 0) {
                        element = null;
                    }
                    if (widthHeightRatio === void 0) {
                        widthHeightRatio = 1.0;
                    }
                    if (margin === void 0) {
                        margin = { left: 0, top: 0, right: 0, bottom: 0 };
                    }
                    this.colors = ["#2186C5", "#43A04C", "#F44336", "#F8A031", "#ba46b8", "#009688", "#FF5722", "#EC407A", "#C0CA33", "#795548", "#e5878a", "#9E9E9E"];
                    this.arrowHeadLength = 15;
                    this.arrowHeadAngle = 40;
                    this.svg = d3
                        .select(element)
                        .append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .attr("style", "display: flex;");
                    this.margin = margin;
                    this.axises = SvgChart.appendIfNotExists(this.svg, "g", "axises");
                    this.chart = this.svg
                        .append("g")
                        .attr("class", "chartarea")
                        .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")");
                    if (element == null) return;
                    var w = element.offsetWidth;
                    var h = widthHeightRatio == 0 ? element.offsetHeight : w / widthHeightRatio;
                    this.width = w - this.margin.left - this.margin.right;
                    this.height = h - this.margin.top - this.margin.bottom;
                    this.svg.attr("viewBox", "0 0 " + w + " " + h);
                }
                SvgChart.timeSeriesMinMax = function(ts, start) {
                    return ts.items.reduce(function(p, c) {
                        if (p.max === undefined || c.value > p.max) p.max = c.value;
                        if (p.min === undefined || c.value < p.min) p.min = c.value;
                        return p;
                    }, start);
                };
                SvgChart.arrayMinMax = function(arr, start) {
                    return arr.reduce(function(p, c) {
                        if (p.max === undefined || c > p.max) p.max = c;
                        if (p.min === undefined || c < p.min) p.min = c;
                        return p;
                    }, start);
                };
                SvgChart.minmax = function(x, min, max) {
                    if (x < min) return min;
                    if (x > max) return max;
                    return x;
                };
                SvgChart.appendIfNotExists = function(parent, emnt, cls) {
                    var res = parent.select(emnt + "." + cls.replace(" ", "."));
                    if (!res.empty()) return res;
                    return parent.append(emnt).attr("class", cls);
                };
                SvgChart.prototype.updateAxises = function(scales, xValues, yValues) {
                    var xAxis = d3
                        .axisBottom()
                        .scale(scales.x)
                        .tickValues(xValues)
                        .tickSize(-this.height, 3);
                    var yAxis = d3
                        .axisLeft()
                        .scale(scales.y)
                        .tickValues(yValues)
                        .tickSize(-this.width, 3);
                    var x0 = this.margin.left;
                    var y0 = this.margin.top;
                    var gX = SvgChart.appendIfNotExists(this.axises, "g", "x axis");
                    gX.call(xAxis);
                    gX.attr("transform", "translate(" + x0 + "," + (y0 + this.height) + ")");
                    gX.selectAll("text").attr("dy", "0.86em");
                    var gY = SvgChart.appendIfNotExists(this.axises, "g", "y axis");
                    gY.call(yAxis);
                    gY.attr("transform", "translate(" + x0 + "," + y0 + ")");
                    gY.selectAll("text").attr("dx", "-0.15em");
                };
                SvgChart.prototype.addText = function(x, y, rot, text, anchor) {
                    if (anchor === void 0) {
                        anchor = "start";
                    }
                    var sel = this.chart
                        .append("g")
                        .attr("class", "annotation")
                        .attr("transform", "translate(" + x + "," + y + ") rotate(" + rot + ")");
                    sel.append("text")
                        .attr("dx", 0)
                        .attr("dy", 0)
                        .text(text)
                        .attr("style", "text-anchor: " + anchor + ";");
                };
                SvgChart.prototype.addArrow = function(x, y, rot, len, text, start, end) {
                    if (start === void 0) {
                        start = false;
                    }
                    if (end === void 0) {
                        end = true;
                    }
                    if (end === undefined) end = true;
                    var sel = this.chart
                        .append("g")
                        .attr("class", "annotation")
                        .attr("transform", "translate(" + x + "," + y + ") rotate(" + rot + ")");
                    var hx = this.arrowHeadLength * Math.cos((Math.PI / 180) * this.arrowHeadAngle);
                    var hy = this.arrowHeadLength * Math.sin((Math.PI / 180) * this.arrowHeadAngle);
                    if (text) {
                        var dx = len / 2 + (hx / 3) * ((start ? 1 : 0) + (end ? -1 : 0));
                        sel.append("text")
                            .attr("dx", dx)
                            .attr("dy", -9)
                            .text(text);
                    }
                    var df = function(c, x, y) {
                        return c + x.toFixed(2) + "," + y.toFixed(2);
                    };
                    var s = "M0,0";
                    if (start) {
                        s += df("m", hx, -hy) + df("l", -hx, hy);
                        s += df("m", hx, hy) + df("l", -hx, -hy);
                        s += df("m", 0, 0);
                    }
                    s += "H" + len.toFixed(2);
                    if (end) {
                        s += df("m", -hx, -hy) + df("l", hx, hy);
                        s += df("m", -hx, hy) + df("l", hx, -hy);
                    }
                    sel.append("path").attr("d", s);
                };
                return SvgChart;
            })();

            //# sourceMappingURL=svg-chart.js.map

            /***/
        },

        /***/ 602: /***/ function(module, exports) {
            /* (ignored) */
            /***/
        },

        /***/ 604: /***/ function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(214);

            /***/
        },

        /***/ 88: /***/ function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_timeseries_ts_timeseries__ = __webpack_require__(89);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_daycount__ = __webpack_require__(59);
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_daycount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_daycount__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() {
                return CorrPosition;
            });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return MonteCarloEngine;
            });

            var CorrPosition = (function() {
                function CorrPosition(x, y) {
                    this.x = x;
                    this.y = y;
                }
                CorrPosition.distance = function(p1, p2) {
                    var x = p1.x - p2.x;
                    var y = p1.y - p2.y;
                    return Math.sqrt(x * x + y * y);
                };
                return CorrPosition;
            })();

            var MonteCarloEngine = (function() {
                function MonteCarloEngine(seed, mus, sigmas, correlations) {
                    this._seed = seed;
                    this._mus = mus;
                    this._sigmas = sigmas;
                    this._correlations = correlations;
                    this.updateTimeSeries();
                }
                Object.defineProperty(MonteCarloEngine.prototype, "timeSeriess", {
                    get: function() {
                        return this._timeSeriess;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonteCarloEngine.prototype, "seed", {
                    get: function() {
                        return this._seed;
                    },
                    set: function(v) {
                        this._seed = v;
                        this.updateTimeSeries();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonteCarloEngine.prototype, "mus", {
                    get: function() {
                        return this._mus;
                    },
                    set: function(v) {
                        this._mus = v;
                        this.updateTimeSeries();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonteCarloEngine.prototype, "sigmas", {
                    get: function() {
                        return this._sigmas;
                    },
                    set: function(v) {
                        this._sigmas = v;
                        this.updateTimeSeries();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MonteCarloEngine.prototype, "correlations", {
                    get: function() {
                        return this._correlations;
                    },
                    set: function(v) {
                        this._correlations = v;
                        this.updateTimeSeries();
                    },
                    enumerable: true,
                    configurable: true
                });
                MonteCarloEngine.rand1 = function(min, max) {
                    return min + (max - min) * Math.random();
                };
                MonteCarloEngine.rand = function(min, max, count) {
                    if (count === undefined) return MonteCarloEngine.rand1(min, max);
                    var res = [];
                    for (var i = 0; i < count; i++) {
                        res.push(MonteCarloEngine.rand1(min, max));
                    }
                    return res;
                };
                MonteCarloEngine.randn = function() {
                    var u = 1 - Math.random();
                    var v = 1 - Math.random();
                    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                };
                MonteCarloEngine.calcCorrPositions = function(corrs) {
                    var rho = corrs;
                    var pmin;
                    var emin = 0;
                    var n = rho[0].length;
                    var dp = 0.1e-3;
                    var m = Math.floor(1.2 * Math.exp(2 / (n - 2) + 4));
                    for (var u = 0; u < 20; ++u) {
                        var p = math.zeros(n, 2).valueOf();
                        // fill p with random numbers, should be equivalent to Matlab's p = 0.5*(2*rand(n,2)-1);
                        // original comment: % p is points in 2D space, distance between points represents correlation corr=1-distance
                        for (var row = 0; row < n; ++row) {
                            for (var column = 0; column < 2; ++column) {
                                p[row][column] = 0.5 * (2 * Math.random() - 1);
                            }
                        }
                        p = math.subtract(p, MonteCarloEngine.mean(p));
                        // % Optimize corr map
                        for (var k = 0; k < m; ++k) {
                            var d0 = MonteCarloEngine.distanceError(p, rho);
                            var gp = math.zeros(n, 2).valueOf();
                            for (var i = 1; i < n; ++i) {
                                for (var j = 0; j < 2; ++j) {
                                    var _d = math.zeros(n, 2).valueOf();
                                    _d[i][j] = dp;
                                    // should be equivalent to: gp(i,j) = (distanceerror(p+d, rho)-d0)/dp;
                                    gp[i][j] = math.divide(math.subtract(MonteCarloEngine.distanceError(math.add(p, _d), rho), d0), dp);
                                }
                            }
                            p = math.subtract(p, math.multiply(gp, 0.05));
                        }
                        p = math.subtract(p, MonteCarloEngine.mean(p));
                        var e = MonteCarloEngine.distanceError(p, rho);
                        if (emin === 0 || e < emin) {
                            emin = e;
                            pmin = p;
                        }
                    }
                    // time to normalize our points.
                    var p = pmin;
                    n = p.length;
                    p = math.subtract(p, MonteCarloEngine.mean(p));
                    /*  should be equivalent to:
                     *   if p(1,1)*p(2,2)-p(1,2)*p(2,1)>0
                     *       p(:,2) = -p(:,2);
                     *   end
                     */
                    if (math.subtract(math.multiply(p[0][0], p[1][1]), math.multiply(p[0][1], p[1][0])) > 0) {
                        for (i = 0; i < n; ++i) {
                            p[i][1] = -p[i][1];
                        }
                    }
                    var A = math.matrix();
                    var p00 = p[0][0];
                    var p01 = p[0][1];
                    // A = [p(1,1) -p(1,2); p(1,2) p(1,1)];
                    A.subset(math.index(0, 0), p00);
                    A.subset(math.index(0, 1), math.multiply(p01, -1));
                    A.subset(math.index(1, 0), p01);
                    A.subset(math.index(1, 1), p00);
                    // should be equivalent to: r = sqrt(p(1,1)^2+p(1,2)^2);
                    //var r = math.sqrt(math.add(math.square(p[0][0]), math.square(p[0][1])));
                    var r = Math.sqrt(p[0][0] * p[0][0] + p[0][1] * p[0][1]);
                    // should be equivalent to: cs = linsolve(A,[-r;r]/sqrt(2));
                    var cs = math.lusolve(A, math.divide([-r, r], math.sqrt(2))); // %Only 2x2 linear equation, can be solved without linsolve
                    // T = [cs(1) -cs(2); cs(2) cs(1)];
                    var T = math.matrix();
                    T.subset(math.index(0, 0), cs.subset(math.index(0, 0)));
                    T.subset(math.index(0, 1), -cs.subset(math.index(1, 0)));
                    T.subset(math.index(1, 0), cs.subset(math.index(1, 0)));
                    T.subset(math.index(1, 1), cs.subset(math.index(0, 0)));
                    T = math.transpose(T);
                    p = math.matrix(p); // this could be done without making p into a matrix, but the increased time to do this operation is negligible as it only happens once.
                    for (i = 0; i < n; ++i) {
                        var res = math.multiply(p.subset(math.index(i, [0, 1])), T);
                        p.subset(math.index(i, [0, 1]), res);
                    }
                    p = p.valueOf();
                    n = rho[0].length;
                    var rhoh = math.zeros(n, n);
                    var cols = p[0].length;
                    var colRange = math.range(0, cols);
                    var rhoCols = n;
                    for (i = 0; i < n - 1; ++i) {
                        var temp = MonteCarloEngine.subSquareTranspose(math.matrix(p), i, cols, i + 1, n);
                        var d;
                        d = math.sqrt(MonteCarloEngine.sumColumns(temp));
                        d = math.matrix(d);
                        var dCount = 0;
                        for (var c = i + 1; c < n; ++c) {
                            rhoh.subset(math.index(i, c), math.subtract(1, d.subset(math.index(0, dCount % d.size()[1]))));
                            ++dCount;
                        }
                    }
                    //console.log(p);
                    //console.log(rhoh);
                    rhoh = math.add(math.add(rhoh, math.transpose(rhoh)), math.eye(n)); // value of rhoh not verified correct.
                    return p.valueOf();
                };
                /*
                 *   Calculates mean value of matrix columns and returns matrix of values with same dimensions as input matrix.
                 */
                MonteCarloEngine.mean = function(matrix) {
                    var mean = math.divide(MonteCarloEngine.sumColumns(matrix), matrix.length);
                    mean = MonteCarloEngine.resize(mean, [matrix.length, mean[0].length]);
                    return mean;
                };
                /*
                 *   Sums columns of matrix and returns values in a one-row matrix.
                 */
                MonteCarloEngine.sumColumns = function(matrix) {
                    var d = math.matrix();
                    for (var g = 0; g < matrix[0].length; ++g) {
                        var sum = 0;
                        for (var c = 0; c < matrix.length; ++c) {
                            sum += matrix[c][g];
                        }
                        d.subset(math.index(0, g), sum);
                    }
                    return d.valueOf();
                };
                MonteCarloEngine.distanceError = function(matrix, rho) {
                    var n = rho[0].length;
                    var e = 0;
                    var cols = matrix[0].length;
                    for (var _i = 0; _i < n - 1; ++_i) {
                        var d = MonteCarloEngine.sqrtSumColumnsSubSquareTranspose(matrix, _i, cols, _i + 1, n);
                        for (var ix = 0; ix < d.length; ++ix) {
                            for (var c = 0; c < d[0].length; ++c) {
                                var x = 1 - d[ix][c] - rho[_i][c + _i + 1];
                                e += x * x;
                                //e += math.square(1 - d[ix][c] - rho[_i][c + _i + 1]);
                            }
                        }
                    }
                    return e;
                };
                /*
                 *  Specialized function that subtracts CONSTANT by matrix1 and the range of matrix2 specified by matrix2Row, and matrix2Col.
                 */
                //private static subSubSquare(matrix1: any, matrix2: any, matrix2Row: number, matrix2Col: number, constant: number): number[][] {
                //    var res = [];
                //    for (var i = 0; i < matrix1.length; ++i)
                //        res[i] = [];
                //    for (var i = 0; i < matrix1.length; ++i) {
                //        for (var c = 0; c < matrix1[0].length; ++c) {
                //            res[i][c] = math.square(1 - matrix1[i][c] - matrix2.subset(math.index(matrix2Row, c + matrix2Col)));
                //        }
                //    }
                //    return res;
                //}
                /*
                 *  Returns the transposed squares of the differences matrix[row1][0..columns] - matrix[row2..maxrow][0..columns].
                 */
                MonteCarloEngine.subSquareTranspose = function(matrix, row1, columns, row2, maxrow) {
                    var res = [];
                    for (var i = 0; i < columns; ++i) res[i] = [];
                    for (var i = row2; i < maxrow; ++i) {
                        for (var c = 0; c < columns; ++c) {
                            var d = matrix.subset(math.index(row1, c)) - matrix.subset(math.index(i, c));
                            res[c][i - row2] = d * d;
                            //res[c][i - row2] = math.square(matrix.subset(math.index(row1, c)) - matrix.subset(math.index(i, c)));
                        }
                    }
                    return res;
                };
                /*
                 *  Unwieldy name, but in essence several operations are done at once here. The square root of the sum of each row's squared differences is returned as a matrix consisting of 1 row and maxrow-row2 columns.
                 *  Where the differences are: matrix[row1][0..columns] - matrix[row2..maxrow][0..columns]
                 */
                MonteCarloEngine.sqrtSumColumnsSubSquareTranspose = function(matrix, row1, columns, row2, maxrow) {
                    var res = [];
                    res[0] = [];
                    for (var i = row2; i < maxrow; ++i) {
                        var sum = 0;
                        for (var c = 0; c < columns; ++c) {
                            var d = matrix[row1][c] - matrix[i][c];
                            sum += d * d;
                            //sum += math.square(matrix[row1][c] - matrix[i][c]);
                        }
                        res[0][i - row2] = math.sqrt(sum);
                    }
                    return res;
                };
                /*
                 *   Resizes matrix with the supplied range. New rows added are filled with values from previous row.
                 */
                MonteCarloEngine.resize = function(matrix, range) {
                    var m = math.matrix(matrix);
                    m.resize(range);
                    for (var c = 0; c < range[0]; ++c) {
                        for (var d = 0; d < range[1]; ++d) {
                            m.subset(math.index(c, d), m.subset(math.index(0, d)));
                        }
                    }
                    return m.valueOf();
                };
                MonteCarloEngine.calcCorrelations = function(ps) {
                    var res = [];
                    for (var i = 0; i < ps.length; i++) {
                        var pi = ps[i];
                        var cs = [];
                        for (var j = 0; j < ps.length; j++) {
                            var pj = ps[j];
                            cs.push(1 - CorrPosition.distance(pi, pj));
                        }
                        res.push(cs);
                    }
                    return res;
                };
                MonteCarloEngine.eye = function(n) {
                    var res = [];
                    for (var i = 0; i < n; i++) {
                        var cs = [];
                        for (var j = 0; j < n; j++) {
                            cs.push(i == j ? 1 : 0);
                        }
                        res.push(cs);
                    }
                    return res;
                };
                MonteCarloEngine.cumSum = function(vs) {
                    return vs.reduce(
                        function(p, c) {
                            var n = p.last + c;
                            p.res.push(n);
                            p.last = n;
                            return p;
                        },
                        {
                            res: [1],
                            last: 1
                        }
                    ).res;
                };
                MonteCarloEngine.prototype.updateTimeSeries = function() {
                    if (this._seed === undefined || this._mus === undefined || this._sigmas === undefined || this._correlations === undefined) return;
                    if (this._mus.length < 1 || this._sigmas.length < 1) return;
                    var end = new Date().date();
                    var start = end.addMonths(-36);
                    this._timeSeriess = MonteCarloEngine.generateRandomTimeSeriess(start, end, 100, 50, this._seed, this._mus, this._sigmas, this._correlations);
                };
                MonteCarloEngine.generateRandomTimeSeriess = function(startDate, endDate, startValue, timestepCount, seed, mus, sigmas, correlations) {
                    Math.seedrandom(seed);
                    if (correlations === undefined) correlations = MonteCarloEngine.eye(mus.length);
                    var chol = jStat.cholesky(correlations);
                    var start = startDate.valueOf();
                    var timeDelta = (endDate.valueOf() - start) / (timestepCount + 1);
                    var mmus = mus.map(function(d) {
                        return (d * timeDelta) / MonteCarloEngine.msPerYear;
                    });
                    var m = Math.sqrt(timeDelta / MonteCarloEngine.msPerYear);
                    var msigmas = sigmas.map(function(d) {
                        return d * m;
                    });
                    var randns = [];
                    for (var i = 0; i < mus.length; i++) {
                        var rs = [];
                        var s = 0;
                        for (var j = 0; j < timestepCount; j++) {
                            var n = MonteCarloEngine.randn();
                            rs.push(n);
                            s += n;
                        }
                        s /= timestepCount;
                        randns.push(
                            rs.map(function(d) {
                                return d - s;
                            })
                        );
                    }
                    var res = [];
                    for (var i = 0; i < mus.length; i++) {
                        var mu = mmus[i];
                        var sigma = msigmas[i];
                        var tsitems = [];
                        var v0 = startValue;
                        tsitems.push(new __WEBPACK_IMPORTED_MODULE_0_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](new Date(start), v0));
                        for (var j = 0; j < timestepCount; j++) {
                            var r = 0;
                            for (var k = 0; k <= i; k++) {
                                r += randns[k][j] * chol[i][k];
                            }
                            var v = v0 * Math.exp(mu + sigma * r);
                            tsitems.push(new __WEBPACK_IMPORTED_MODULE_0_timeseries_ts_timeseries__["a" /* TimeSeriesItem */](new Date(start + timeDelta * (j + 1)), v));
                            v0 = v;
                        }
                        res.push(new __WEBPACK_IMPORTED_MODULE_0_timeseries_ts_timeseries__["b" /* TimeSeries */](tsitems));
                    }
                    return res;
                };
                return MonteCarloEngine;
            })();

            MonteCarloEngine.msPerYear = 365.25 * 24 * 60 * 60 * 1000;
            //# sourceMappingURL=monte-carlo-engine.js.map

            /***/
        }
    },
    [604]
);
//# sourceMappingURL=main.bundle.js.map
