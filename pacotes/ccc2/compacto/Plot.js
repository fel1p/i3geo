def.scope(function(){def.type('pvc.visual.Plot',pvc.visual.OptionsBase).init(function(chart,keyArgs){var typePlots=def.getPath(chart,['plotsByType',this.type]);var index=typePlots?typePlots.length:0;var globalIndex=chart.plotList.length;keyArgs=def.set(keyArgs,'byNaked',!globalIndex);this.base(chart,this.type,index,keyArgs);chart._addPlot(this);var prefixes=this.extensionPrefixes=[this.id];if(!this.globalIndex){prefixes.push('')}if(this.name){prefixes.push(this.name)}}).add({_getOptionsDefinition:function(){return pvc.visual.Plot.optionsDef},_resolveByNaked:pvc.options.specify(function(optionInfo){if(!this.globalIndex){return this._chartOption(def.firstLowerCase(optionInfo.name))}})});pvc.visual.Plot.optionsDef={Orientation:{resolve:function(optionInfo){optionInfo.specify(this._chartOption('orientation')||'vertical');return true},cast:String},ValuesVisible:{resolve:'_resolveFull',data:{resolveV1:function(optionInfo){if(this.globalIndex===0){var show=this._chartOption('showValues');if(show!==undefined){optionInfo.specify(show)}else{show=this.type!=='point';optionInfo.defaultValue(show)}return true}}},cast:Boolean,value:false},ValuesAnchor:{resolve:'_resolveFull',cast:pvc.parseAnchor},ValuesFont:{resolve:'_resolveFull',cast:String,value:'10px sans-serif'},ValuesMask:{resolve:'_resolveFull',cast:String,value:"{value}"},DataPart:{resolve:'_resolveFixed',cast:String,value:'0'},ColorRole:{resolve:'_resolveFixed',cast:String,value:'color'},ColorAxis:{resolve:pvc.options.resolvers([function(optionInfo){if(this.globalIndex===0){optionInfo.specify(1);return true}},'_resolveFull']),cast:function(value){value=pvc.castNumber(value);if(value!=null){value=def.between(value,1,10)}else{value=1}return value},value:1}}});