def.type('pvc.visual.legend.BulletItemSceneSelection').add({isOn:function(){var owner=(this.group||this.datum).owner;return!owner.selectedCount()||this.datums().any(function(datum){return!datum.isNull&&datum.isSelected})},isClickable:function(){return this.chart()._canSelectWithClick()},click:function(){var datums=this.datums().array();if(datums.length){var chart=this.chart();chart._updatingSelections(function(){datums=chart._onUserSelection(datums);if(datums){var on=def.query(datums).any(function(datum){return datum.isSelected});pvc.data.Data.setSelected(datums,!on)}})}}});