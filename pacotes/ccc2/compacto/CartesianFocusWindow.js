def.scope(function(){def.type('pvc.visual.CartesianFocusWindow',pvc.visual.OptionsBase).init(function(chart){this.base(chart,'focusWindow',0,{byNaked:false});var baseAxis=chart.axes.base;this.base=new pvc.visual.CartesianFocusWindowAxis(this,baseAxis)}).add({_getOptionsDefinition:function(){return focusWindow_optionsDef},_exportData:function(){return{base:def.copyProps(this.base,pvc.visual.CartesianFocusWindow.props)}},_importData:function(data){var baseData=data.base;this.base.option.specify({Begin:baseData.begin,End:baseData.end,Length:baseData.length})},_initFromOptions:function(){this.base._initFromOptions()},_onAxisChanged:function(axis){var changed=this.option('Changed');if(changed){changed.call(this.chart.basePanel._getContext())}}});var focusWindow_optionsDef=def.create(axis_optionsDef,{Changed:{resolve:'_resolveFull',cast:def.fun.as}});def.type('pvc.visual.CartesianFocusWindowAxis',pvc.visual.OptionsBase).init(function(fw,axis){this.window=fw;this.axis=axis;this.isDiscrete=axis.isDiscrete();this.base(axis.chart,'focusWindow'+def.firstUpperCase(axis.type),0,{byNaked:false})}).addStatic({props:['begin','end','length']}).add({_getOptionsDefinition:function(){return focusWindowAxis_optionsDef},_initFromOptions:function(){var o=this.option;this.set({begin:o('Begin'),end:o('End'),length:o('Length')})},set:function(keyArgs){var me=this;var render=def.get(keyArgs,'render');var select=def.get(keyArgs,'select',true);var b,e,l;keyArgs=me._readArgs(keyArgs);if(!keyArgs){if(this.begin!=null&&this.end!=null&&this.length!=null){return}}else{b=keyArgs.begin;e=keyArgs.end;l=keyArgs.length}var axis=me.axis;var scale=axis.scale;var isDiscrete=me.isDiscrete;var contCast=!isDiscrete?axis.role.firstDimensionType().cast:null;var domain=scale.domain();var a,L;if(isDiscrete){L=domain.length;var ib,ie,ia;if(b!=null){var nb=+b;if(!isNaN(nb)){if(nb===Infinity){ib=L-1;b=domain[ib]}else if(nb===-Infinity){ib=0;b=domain[ib]}}if(ib==null){ib=domain.indexOf(''+b);if(ib<0){ib=0;b=domain[ib]}}}if(e!=null){var ne=+e;if(!isNaN(ne)){if(ne===Infinity){ie=L-1;e=domain[ie]}else if(ne===-Infinity){ie=0;e=domain[ie]}}if(ie==null){ie=domain.indexOf(''+e);if(ie<0){ie=L-1;e=domain[ie]}}}if(l!=null){l=+l;if(isNaN(l)){l=null}else if(l<0&&(b!=null||e!=null)){a=b;ia=ib;b=e,ib=ie,e=a,ie=ia;l=-l}}if(b!=null){if(e!=null){if(ib>ie){a=b;ia=ib;b=e,ib=ie,e=a,ie=ia}l=ie-ib+1}else{if(l==null){l=L-ib}ie=ib+l-1;if(ie>L-1){ie=L-1;l=ie-ib+1}e=domain[ie]}}else{if(e!=null){if(l==null){l=ie}ib=ie-l+1;if(ib<0){ib=0;l=ie-ib+1}b=domain[ib]}else{if(l==null){l=Math.max(~~(L/3),1); }if(l>L){l=L;ib=0;ie=L-1}else{ia=~~(L/2); ib=ia-~~(l/2);ie=ib+l-1}b=domain[ib];e=domain[ie]}}}else{if(l!=null){l=+l;if(isNaN(l)){l=null}else if(l<0&&(b!=null||e!=null)){a=b;b=e,e=a;l=-l}}var min=domain[0];var max=domain[1];L=max-min;if(b!=null){if(b<min){b=min}if(b>max){b=max}}if(e!=null){if(e<min){e=min}if(e>max){e=max}}if(b!=null){if(e!=null){if(b>e){a=b;b=e,e=a}l=e-b}else{if(l==null){l=max-b}e=b+l;if(e>max){e=max;l=e-b}}}else{if(e!=null){if(l==null){l=e-min}b=e-l;if(b<min){b=min;l=e-b}}else{if(l==null){l=Math.max(~~(L/3),1); }if(l>L){l=L;b=min;e=max}else{a=~~(L/2); b=a-~~(l/2);e=(+b)+(+l)}}}b=contCast(b);e=contCast(e);l=contCast(l);var constraint=me.option('Constraint');if(constraint){var oper2={type:'new',target:'begin',value:b,length:l,length0:l,min:min,max:max,minView:min,maxView:max};constraint(oper2);b=contCast(oper2.value);l=contCast(oper2.length);e=contCast((+b)+(+l))}}me._set(b,e,l,select,render)},_updatePosition:function(pbeg,pend,select,render){var me=this;var axis=me.axis;var scale=axis.scale;var b,e,l;if(me.isDiscrete){var ib=scale.invertIndex(pbeg);var ie=scale.invertIndex(pend)-1;var domain=scale.domain();b=domain[ib];e=domain[ie];l=ie-ib+1}else{b=scale.invert(pbeg);e=scale.invert(pend);l=e-b}this._set(b,e,l,select,render)},_constraintPosition:function(oper){var me=this;var axis=me.axis;var scale=axis.scale;var constraint;if(me.isDiscrete){var index=Math.floor(scale.invertIndex(oper.point,true));if(index>=0){var r=scale.range();var L=scale.domain().length;var S=(r.max-r.min)/L;if(index>=L&&(oper.type==='new'||oper.type==='resize-begin')){index=L-1}oper.point=index*S}}else if((constraint=me.option('Constraint'))){var contCast=axis.role.firstDimensionType().cast;var v=contCast(scale.invert(oper.point));var sign=oper.target==='begin'?1:-1;var pother=oper.point+sign*oper.length;var vother=contCast(scale.invert(pother));var vlength=contCast(sign*(vother-v));var vlength0,pother0,vother0;if(oper.length===oper.length0){vlength0=vlength}else{pother0=oper.point+sign*oper.length0;vother0=contCast(scale.invert(pother0));vlength0=sign*(vother0-v)}var vmin=contCast(scale.invert(oper.min));var vmax=contCast(scale.invert(oper.max));var oper2={type:oper.type,target:oper.target,value:v,length:vlength,length0:vlength0,min:vmin,max:vmax,minView:contCast(scale.invert(oper.minView)),maxView:contCast(scale.invert(oper.maxView))};constraint(oper2);if(+oper2.value!==+v){v=oper2.value;oper.point=scale(v)}var vlength2=oper2.length;if(+vlength2!==+vlength){if(+vlength2===+vlength0){oper.length=oper.length0}else{var vother2=(+v)+sign*(+vlength2);var pother2=scale(vother2);oper.length=pother2-sign*oper.point}}if(+oper2.min!==+vmin){oper.min=scale(oper2.min)}if(+oper2.max!==+vmax){oper.max=scale(oper2.max)}}},_compare:function(a,b){return this.isDiscrete?((''+a)===(''+b)):((+a)===(+b))},_set:function(b,e,l,select,render){var me=this;var changed=false;if(!me._compare(b,me.begin)){me.begin=b;changed=true}if(!me._compare(e,me.end)){me.end=e;changed=true}if(!me._compare(l,me.length)){me.length=l;changed=true}if(changed){me.window._onAxisChanged(this)}if(select){me._updateSelection({render:render})}return changed},_readArgs:function(keyArgs){if(keyArgs){var out={};var any=0;var read=function(p){var v=keyArgs[p];if(v!=null){any=true}else{v=this[p]}out[p]=v};pvc.visual.CartesianFocusWindowAxis.props.forEach(read,this);if(any){return out}}},_updateSelection:function(keyArgs){var me=this;var selectDatums;var axis=me.axis;var isDiscrete=axis.isDiscrete();var chart=axis.chart;var dataCell=axis.dataCell;var role=dataCell.role;var partData=chart.partData(dataCell.dataPartValue,{visible:true});var domainData;if(isDiscrete){domainData=partData.flattenBy(role);var dataBegin=domainData._childrenByKey[me.begin];var dataEnd=domainData._childrenByKey[me.end];if(dataBegin&&dataEnd){var indexBegin=dataBegin.childIndex();var indexEnd=dataEnd.childIndex();selectDatums=def.range(indexBegin,indexEnd-indexBegin+1).select(function(index){return domainData._children[index]}).selectMany(function(data){return data._datums}).distinct(function(datum){return datum.key})}}else{domainData=partData;var dimName=role.firstDimensionName();selectDatums=def.query(partData._datums).where(function(datum){var v=datum.atoms[dimName].value;return v!=null&&v>=me.begin&&v<=me.end})}if(selectDatums){chart.data.replaceSelected(selectDatums);chart.root.updateSelections(keyArgs)}}});var focusWindowAxis_optionsDef=def.create(axis_optionsDef,{Resizable:{resolve:'_resolveFull',cast:Boolean,value:true},Movable:{resolve:'_resolveFull',cast:Boolean,value:true},Begin:{resolve:'_resolveFull'},End:{resolve:'_resolveFull'},Length:{resolve:'_resolveFull'},Constraint:{resolve:'_resolveFull',cast:def.fun.as}})});