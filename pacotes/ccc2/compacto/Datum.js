def.type('pvc.data.Datum',pvc.data.Complex).init(function(data,atomsByName,isNull){this.base(data,atomsByName,null,null,false,!isNull);if(isNull){this.isNull=true}}).add({isSelected:false,isVisible:true,isNull:false,isVirtual:false,isTrend:false,trendType:null,isInterpolated:false,interpolation:null,setSelected:function(select){if(this.isNull){return false}select=(select==null)||!!select;var changed=this.isSelected!==select;if(changed){if(!select){delete this.isSelected}else{this.isSelected=true}data_onDatumSelectedChanged.call(this.owner,this,select)}return changed},toggleSelected:function(){return this.setSelected(!this.isSelected)},setVisible:function(visible){if(this.isNull){return false}visible=(visible==null)||!!visible;var changed=this.isVisible!==visible;if(changed){this.isVisible=visible;data_onDatumVisibleChanged.call(this.owner,this,visible)}return changed},toggleVisible:function(){return this.setVisible(!this.isVisible)}});function datum_deselect(){delete this.isSelected}