def.type('pvc.NormalizedBarChart',pvc.BarAbstract).add({_processOptionsCore:function(options){options.stacked=true;this.base(options)},_getContinuousVisibleExtentConstrained:function(axis,min,max){if(axis.type==='ortho'){return{min:0,max:100,minLocked:true,maxLocked:true}}return this.base(axis,min,max)},_initPlotsCore:function(hasMultiRole){new pvc.visual.NormalizedBarPlot(this)},_createPlotPanels:function(parentPanel,baseOptions){var barPlot=this.plots.bar;this.barChartPanel=new pvc.NormalizedBarPanel(this,parentPanel,barPlot,Object.create(baseOptions))}});