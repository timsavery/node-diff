# node-diff

A port of John Resig's Javascript Diff Algorithm posted here: http://ejohn.org/projects/javascript-diff-algorithm

## Installation

### Installing node-diff
``` bash
  $ [sudo] npm install node-diff
```
  
## Usage
This module can be used to generate diff markup for two strings.

``` js
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
```

#### Author: [Tim Savery][0]

[0]: mailto:tim.savery@gmail.com
