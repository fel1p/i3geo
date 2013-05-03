def.type('pvc.GridDockingPanel',pvc.BasePanel).add({anchor:'fill',_calcLayout:function(layoutInfo){var me=this;if(!me._children){return}var useLog=pvc.debug>=5;var margins=new pvc.Sides(0);var paddings=new pvc.Sides(0);var remSize=def.copyOwn(layoutInfo.clientSize);var aolMap=pvc.BasePanel.orthogonalLength;var aoMap=pvc.BasePanel.relativeAnchor;var alMap=pvc.BasePanel.parallelLength;var childKeyArgs={force:true,referenceSize:layoutInfo.clientSize};var fillChildren=[];var sideChildren=[];var paddingHistory={};var LoopDetected=1;var NormalPaddingsChanged=2;var OverflowPaddingsChanged=4;var emptyNewPaddings=new pvc.Sides();var isDisasterRecovery=false;if(useLog){me._group("CCC GRID LAYOUT clientSize = "+pvc.stringify(remSize))}try{this._children.forEach(initChild);if(useLog){me._group("Phase 1 - Determine MARGINS and FILL SIZE from SIDE panels")}try{sideChildren.forEach(layoutChild1Side)}finally{if(useLog){me._groupEnd();me._log("Final FILL margins = "+pvc.stringify(margins));me._log("Final FILL border size = "+pvc.stringify(remSize))}}if(useLog){me._group("Phase 2 - Determine COMMON PADDINGS")}try{doMaxTimes(9,layoutCycle)}finally{if(useLog){me._groupEnd();me._log("Final FILL clientSize = "+pvc.stringify({width:(remSize.width-paddings.width),height:(remSize.height-paddings.height)}));me._log("Final COMMON paddings = "+pvc.stringify(paddings))}}layoutInfo.gridMargins=new pvc.Sides(margins);layoutInfo.gridPaddings=new pvc.Sides(paddings);layoutInfo.gridSize=new pvc.Size(remSize)}finally{if(useLog){me._groupEnd()}}function layoutCycle(remTimes,iteration){if(useLog){me._group("LayoutCycle "+(isDisasterRecovery?"- Disaster MODE":("#"+(iteration+1))))}try{var index,count;var canChange=layoutInfo.canChange!==false&&!isDisasterRecovery&&(remTimes>0);var paddingsChanged;var ownPaddingsChanged=false;var breakAndRepeat;index=0;count=sideChildren.length;while(index<count){if(useLog){me._group("SIDE Child #"+(index+1))}try{paddingsChanged=layoutChild2Side(sideChildren[index],canChange);if(!isDisasterRecovery&&paddingsChanged){breakAndRepeat=false;if((paddingsChanged&OverflowPaddingsChanged)!==0){if(useLog){me._log("SIDE Child #"+(index+1)+" changed overflow paddings")}if(!ownPaddingsChanged){ownPaddingsChanged=true;layoutInfo.requestPaddings=layoutInfo.paddings}}if((paddingsChanged&NormalPaddingsChanged)!==0){if(remTimes>0){if(useLog){me._log("SIDE Child #"+(index+1)+" changed normal paddings")}breakAndRepeat=true}else if(pvc.debug>=2){me._warn("SIDE Child #"+(index+1)+" changed paddings but no more iterations possible.")}}if((paddingsChanged&LoopDetected)!==0){isDisasterRecovery=true;layoutCycle(0);return false}if(breakAndRepeat){return true}}}finally{if(useLog){me._groupEnd()}}index++}if(ownPaddingsChanged){if(useLog){me._log("Restarting due to overflowPaddings change")}return false}index=0;count=fillChildren.length;while(index<count){if(useLog){me._group("FILL Child #"+(index+1))}try{paddingsChanged=layoutChildFill(fillChildren[index],canChange);if(!isDisasterRecovery&&paddingsChanged){breakAndRepeat=false;if((paddingsChanged&NormalPaddingsChanged)!==0){if(remTimes>0){if(pvc.debug>=5){me._log("FILL Child #"+(index+1)+" increased paddings")}breakAndRepeat=true}else if(pvc.debug>=2){me._warn("FILL Child #"+(index+1)+" increased paddings but no more iterations possible.")}}if((paddingsChanged&LoopDetected)!==0){isDisasterRecovery=true;layoutCycle(0);return false}if(breakAndRepeat){return true}}}finally{if(useLog){me._groupEnd()}}index++}return false}finally{if(useLog){me._groupEnd()}}}function doMaxTimes(maxTimes,fun){var index=0;while(maxTimes--){if(fun(maxTimes,index)===false){return true}index++}return false}function initChild(child){var a=child.anchor;if(a){if(a==='fill'){fillChildren.push(child);var childPaddings=child.paddings.resolve(childKeyArgs.referenceSize);paddings=pvc.Sides.resolvedMax(paddings,childPaddings)}else{def.hasOwn(aoMap,a)||def.fail.operationInvalid("Unknown anchor value '{0}'",[a]);sideChildren.push(child)}}}function layoutChild1Side(child,index){if(useLog){me._group("SIDE Child #"+(index+1))}try{var paddingsChanged=0;var a=child.anchor;childKeyArgs.paddings=filterAnchorPaddings(a,paddings);child.layout(new pvc.Size(remSize),childKeyArgs);if(child.isVisible){paddingsChanged|=checkAnchorPaddingsChanged(a,paddings,child);positionChildNormal(a,child);updateSide(a,child)}return paddingsChanged}finally{if(useLog){me._groupEnd()}}}function layoutChildFill(child,canChange){var paddingsChanged=0;var a=child.anchor;childKeyArgs.paddings=filterAnchorPaddings(a,paddings);childKeyArgs.canChange=canChange;child.layout(new pvc.Size(remSize),childKeyArgs);if(child.isVisible){paddingsChanged|=checkAnchorPaddingsChanged(a,paddings,child,canChange);positionChildNormal(a,child);positionChildOrtho(child,a)}return paddingsChanged}function layoutChild2Side(child,canChange){var paddingsChanged=0;if(child.isVisible){var a=child.anchor;var al=alMap[a];var aol=aolMap[a];var length=remSize[al];var olength=child[aol];var childSize2=new pvc.Size(def.set({},al,length,aol,olength));childKeyArgs.paddings=filterAnchorPaddings(a,paddings);childKeyArgs.canChange=canChange;child.layout(childSize2,childKeyArgs);if(child.isVisible){paddingsChanged=checkAnchorPaddingsChanged(a,paddings,child,canChange)|checkOverflowPaddingsChanged(a,layoutInfo.paddings,child,canChange);if(!paddingsChanged){positionChildOrtho(child,child.align)}}}return paddingsChanged}function positionChildNormal(side,child){var sidePos;if(side==='fill'){side='left';sidePos=margins.left+remSize.width/2-(child.width/2)}else{sidePos=margins[side]}child.setPosition(def.set({},side,sidePos))}function updateSide(side,child){var sideol=aolMap[side],olen=child[sideol];margins[side]+=olen;remSize[sideol]-=olen}function positionChildOrtho(child,align){var sideo;if(align==='fill'){align='middle'}var sideOPos;switch(align){case'top':case'bottom':case'left':case'right':sideo=align;sideOPos=margins[sideo];break;case'middle':sideo='bottom';sideOPos=margins.bottom+(remSize.height/2)-(child.height/2);break;case'center':sideo='left';sideOPos=margins.left+remSize.width/2-(child.width/2);break}child.setPosition(def.set({},sideo,sideOPos))}function filterAnchorPaddings(a,paddings){var filtered=new pvc.Sides();getAnchorPaddingsNames(a).forEach(function(side){filtered.set(side,paddings[side])});return filtered}function checkAnchorPaddingsChanged(a,paddings,child,canChange){var newPaddings=child._layoutInfo.requestPaddings;var changed=0;if(newPaddings){if(useLog&&pvc.debug>=10){me._log("=> clientSize="+pvc.stringify(child._layoutInfo.clientSize));me._log("<= requestPaddings="+pvc.stringify(newPaddings))}getAnchorPaddingsNames(a).forEach(function(side){var value=paddings[side]||0;var newValue=Math.floor(10000*(newPaddings[side]||0))/10000;var increase=newValue-value;var minChange=Math.max(1,Math.abs(0.01*value));if(increase!==0&&Math.abs(increase)>=minChange){if(!canChange){if(pvc.debug>=2){me._warn("CANNOT change but child wanted to: "+side+"="+newValue)}}else{changed|=NormalPaddingsChanged;paddings[side]=newValue;if(useLog){me._log("Changed padding "+side+" <- "+newValue)}}}});if(changed){var paddingKey=pvc.Sides.names.map(function(side){return(paddings[side]||0).toFixed(0)}).join('|');if(def.hasOwn(paddingHistory,paddingKey)){if(pvc.debug>=2){me._warn("LOOP detected!!!!")}changed|=LoopDetected}else{paddingHistory[paddingKey]=true}paddings.width=paddings.left+paddings.right;paddings.height=paddings.top+paddings.bottom}}return changed}function checkOverflowPaddingsChanged(a,ownPaddings,child,canChange){var overflowPaddings=child._layoutInfo.overflowPaddings||emptyNewPaddings;var changed=0;if(useLog&&pvc.debug>=10){me._log("<= overflowPaddings="+pvc.stringify(overflowPaddings))}getAnchorPaddingsNames(a).forEach(function(side){if(overflowPaddings.hasOwnProperty(side)){var value=ownPaddings[side]||0;var newValue=Math.floor(10000*(overflowPaddings[side]||0))/10000;newValue-=margins[side];var increase=newValue-value;var minChange=Math.max(1,Math.abs(0.05*value));if(increase>=minChange){if(!canChange){if(pvc.debug>=2){me._warn("CANNOT change overflow padding but child wanted to: "+side+"="+newValue)}}else{changed|=OverflowPaddingsChanged;ownPaddings[side]=newValue;if(useLog){me._log("changed overflow padding "+side+" <- "+newValue)}}}}});if(changed){ownPaddings.width=ownPaddings.left+ownPaddings.right;ownPaddings.height=ownPaddings.top+ownPaddings.bottom}return changed}function getAnchorPaddingsNames(a){switch(a){case'left':case'right':return pvc.Sides.vnames;case'top':case'bottom':return pvc.Sides.hnames;case'fill':return pvc.Sides.names}}}});