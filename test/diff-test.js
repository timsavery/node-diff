var vows = require('vows')
  , diff = require('../diff')
  , assert = require('assert');
  
vows.describe('Diff Tests').addBatch({
	'see that it works': {
		topic: function() {
			return diff(
				'The red brown fox jumped over the rolling log.',
   				'The brown spotted fox leaped over the rolling log'
   			);
		},
		'as expected': function(topic) {
			assert.equal(topic, ' The <del>red </del> brown <ins>spotted </ins> fox <del>jumped </del><ins>leaped </ins> over  the  rolling <del>log.</del><ins>log</ins>');
		}
	}
}).export(module);
