def.type('pvc.visual.OptionsBase').init(function(chart,type,index,keyArgs){this.chart=chart;this.type=type;this.index=index==null?0:index;this.name=def.get(keyArgs,'name');this.id=this._buildId();this.optionId=this._buildOptionId();var rs=this._resolvers=[];this._registerResolversFull(rs,keyArgs);this.option=pvc.options(this._getOptionsDefinition(),this)}).add({_buildId:function(){return pvc.buildIndexedId(this.type,this.index)},_buildOptionId:function(){return this.id},_getOptionsDefinition:def.method({isAbstract:true}),_chartOption:function(name){return this.chart.options[name]},_registerResolversFull:function(rs,keyArgs){var fixed=def.get(keyArgs,'fixed');if(fixed){this._fixed=fixed;rs.push(pvc.options.specify(function(optionInfo){return fixed[optionInfo.name]}))}this._registerResolversNormal(rs,keyArgs);var defaults=def.get(keyArgs,'defaults');if(defaults){this._defaults=defaults}rs.push(this._resolveDefault)},_registerResolversNormal:function(rs,keyArgs){if(this.chart.compatVersion()<=1){rs.push(this._resolveByV1OnlyLogic)}if(this.name){rs.push(pvc.options.specify(function(optionInfo){return this._chartOption(this.name+def.firstUpperCase(optionInfo.name))}))}rs.push(this._resolveByOptionId);if(def.get(keyArgs,'byNaked',!this.index)){rs.push(this._resolveByNaked)}},_resolveFull:function(optionInfo){var rs=this._resolvers;for(var i=0,L=rs.length;i<L;i++){if(rs[i].call(this,optionInfo)){return true}}return false},_resolveFixed:pvc.options.specify(function(optionInfo){if(this._fixed){return this._fixed[optionInfo.name]}}),_resolveByV1OnlyLogic:function(optionInfo){var data=optionInfo.data;var resolverV1;if(data&&(resolverV1=data.resolveV1)){return resolverV1.call(this,optionInfo)}},_resolveByName:pvc.options.specify(function(optionInfo){if(this.name){return this._chartOption(this.name+def.firstUpperCase(optionInfo.name))}}),_resolveByOptionId:pvc.options.specify(function(optionInfo){return this._chartOption(this.optionId+def.firstUpperCase(optionInfo.name))}),_resolveByNaked:pvc.options.specify(function(optionInfo){if(!this.index){return this._chartOption(def.firstLowerCase(optionInfo.name))}}),_resolveDefault:function(optionInfo){var data=optionInfo.data;var resolverDefault;if(data&&(resolverDefault=data.resolveDefault)){if(resolverDefault.call(this,optionInfo)){return true}}if(this._defaults){var value=this._defaults[optionInfo.name];if(value!==undefined){optionInfo.defaultValue(value);return true}}},_specifyChartOption:function(optionInfo,asName){var value=this._chartOption(asName);if(value!=null){optionInfo.specify(value);return true}}});