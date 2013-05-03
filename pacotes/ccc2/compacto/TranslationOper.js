def.type('pvc.data.TranslationOper').init(function(chart,complexTypeProj,source,metadata,options){this.chart=chart;this.complexTypeProj=complexTypeProj;this.source=source;this.metadata=metadata||{};this.options=options||{};this._initType();if(pvc.debug>=4){this._logItems=true;this._logItemCount=0}}).add({_logItems:false,logSource:def.method({isAbstract:true}),virtualItemSize:function(){return this.metadata.length},freeVirtualItemSize:function(){return this.virtualItemSize()-this._userUsedIndexesCount},defReader:function(dimReaderSpec){dimReaderSpec||def.fail.argumentRequired('readerSpec');var dimNames;if(typeof dimReaderSpec==='string'){dimNames=dimReaderSpec}else{dimNames=dimReaderSpec.names}if(typeof dimNames==='string'){dimNames=dimNames.split(/\s*\,\s*/)}else{dimNames=def.array.as(dimNames)}var indexes=def.array.as(dimReaderSpec.indexes);if(indexes){indexes.forEach(this._userUseIndex,this)}var hasDims=!!(dimNames&&dimNames.length);var reader=dimReaderSpec.reader;if(!reader){if(hasDims){return this._userCreateReaders(dimNames,indexes)}}else{hasDims||def.fail.argumentRequired('reader.names',"Required argument when a reader function is specified.");this._userRead(reader,dimNames)}return indexes},configureType:function(){this._configureTypeCore()},_configureTypeCore:def.method({isAbstract:true}),_initType:function(){this._userDimsReaders=[];this._userDimsReadersByDim={};this._userItem=[];this._userUsedIndexes={};this._userUsedIndexesCount=0;var userDimReaders=this.options.readers;if(userDimReaders){userDimReaders.forEach(this.defReader,this)}var multiChartIndexes=pvc.parseDistinctIndexArray(this.options.multiChartIndexes);if(multiChartIndexes){this._multiChartIndexes=this.defReader({names:'multiChart',indexes:multiChartIndexes})}},_userUseIndex:function(index){index=+index;(index>=0)||def.fail.argumentInvalid('index',"Invalid reader index: '{0}'.",[index]);!def.hasOwn(this._userUsedIndexes,index)||def.fail.argumentInvalid('index',"Virtual item index '{0}' is already assigned.",[index]);this._userUsedIndexes[index]=true;this._userUsedIndexesCount++;this._userItem[index]=true;return index},_userCreateReaders:function(dimNames,indexes){if(!indexes){indexes=[]}else{indexes.forEach(function(index,j){indexes[j]=+index})}var I=indexes.length,N=dimNames.length,dimName;if(N>I){var nextIndex=I>0?(indexes[I-1]+1):0;do{nextIndex=this._nextAvailableItemIndex(nextIndex);indexes[I]=nextIndex;this._userUseIndex(nextIndex);I++}while(N>I)}var L=(I===N)?N:(N-1);for(var n=0;n<L;n++){dimName=dimNames[n];this._userRead(this._propGet(dimName,indexes[n]),dimName)}if(L<N){var splitGroupName=pvc.splitIndexedId(dimNames[N-1]),groupName=splitGroupName[0],level=def.nullyTo(splitGroupName[1],0);for(var i=L;i<I;i++,level++){dimName=pvc.buildIndexedId(groupName,level);this._userRead(this._propGet(dimName,indexes[i]),dimName)}}return indexes},_userRead:function(reader,dimNames){def.fun.is(reader)||def.fail.argumentInvalid('reader',"Reader must be a function.");if(def.array.is(dimNames)){dimNames.forEach(function(name){this._readDim(name,reader)},this)}else{this._readDim(dimNames,reader)}this._userDimsReaders.push(reader)},_readDim:function(name,reader){this.complexTypeProj.readDim(name);this._userDimsReadersByDim[name]=reader},execute:function(data){this.data=data;return this._executeCore()},_executeCore:function(){var dimsReaders=this._getDimensionsReaders();return def.query(this._getItems()).select(function(item){return this._readItem(item,dimsReaders)},this)},_getItems:function(){return this.source},_getDimensionsReaders:function(){return this._userDimsReaders},_readItem:function(item,dimsReaders){var logItem=this._logItems;if(logItem){var logItemCount=this._logItemCount;if(logItemCount<10){pvc.log('virtual item ['+this._logItemCount+']: '+pvc.stringify(item));this._logItemCount++}else{pvc.log('...');logItem=this._logItems=false}}var r=0,R=dimsReaders.length,a=0,data=this.data,valuesByDimName={};while(r<R){dimsReaders[r++].call(data,item,valuesByDimName)}if(logItem){var atoms={};for(var dimName in valuesByDimName){var atom=valuesByDimName[dimName];if(def.object.is(atom)){atom=('v'in atom)?atom.v:('value'in atom)?atom.value:'...'}atoms[dimName]=atom}pvc.log('-> read: '+pvc.stringify(atoms))}return valuesByDimName},_propGet:function(dimName,prop){function propGet(item,atoms){atoms[dimName]=item[prop]}return propGet},_constGet:function(dimName,constRawValue,keyArgs){var me=this,constAtom;function constGet(item,atoms){atoms[dimName]=constAtom||(constAtom=me.data.dimensions(dimName).intern(constRawValue))}return constGet},_nextAvailableItemIndex:function(index,L){if(index==null){index=0}if(L==null){L=Infinity}while(index<L&&def.hasOwn(this._userItem,index)){index++}return index<L?index:-1},_getUnboundRoleDefaultDimNames:function(roleName,count,dims,level){var role=this.chart.visualRoles(roleName,{assertExists:false});if(role&&!role.isPreBound()){var dimGroupName=role.defaultDimensionName;if(dimGroupName){dimGroupName=dimGroupName.match(/^(.*?)(\*)?$/)[1];if(!dims){dims=[]}if(level==null){level=0}if(count==null){count=1}while(count--){var dimName=pvc.buildIndexedId(dimGroupName,level++);if(!this.complexTypeProj.isReadOrCalc(dimName)){dims.push(dimName)}}return dims.length?dims:null}}}});