def.type('pvc.visual.legend.BulletItemScene',pvc.visual.Scene).init(function(bulletGroup,keyArgs){this.base(bulletGroup,keyArgs);var value,rawValue,label;if(keyArgs){value=keyArgs.value;rawValue=keyArgs.rawValue;label=keyArgs.label}if(value===undefined){var source=this.group||this.datum;if(source){value=source.value;rawValue=source.rawValue;label=source.ensureLabel();var dataPartDim=this.chart()._getDataPartDimName();if(dataPartDim){var dataPartAtom=source.atoms[dataPartDim];if(isNaN(+dataPartAtom.value)){label+=" ("+dataPartAtom.label+")"}}}}this.vars.value=new pvc.visual.ValueLabelVar(value||null,label||"",rawValue)}).add({isOn:function(){return true},isClickable:function(){return false},click:function(){},labelTextSize:function(){var valueVar=this.vars.value;return valueVar&&pv.Text.measure(valueVar.label,this.vars.font)}});