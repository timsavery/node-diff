/*
 * diff.js: The implementation.
 *
 * Copyright (c) 2012 Tim Savery
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


function diffString( o, n ) {
	o = o.replace(/\s+$/, '');
  	n = n.replace(/\s+$/, '');

  	var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
  	var str = "";

  	var oSpace = o.match(/\s+/g);
  	if (oSpace == null) {
    	oSpace = [""];
  	} else {
	oSpace.push("");
	}

  	var nSpace = n.match(/\s+/g);
  	if (nSpace == null) {
    	nSpace = [""];
  	} else {
	nSpace.push("");
	}

  	if (out.n.length == 0) {
    	for (var i = 0; i < out.o.length; i++) {
        	str += '<del>' + escape(out.o[i]) + oSpace[i] + "</del>";
      	}
  	} else {
    	if (out.n[0].text == null) {
      		for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
        		str += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
      		}
    	}

    	for ( var i = 0; i < out.n.length; i++ ) {
      		if (out.n[i].text == null) {
        		str += '<ins>' + escape(out.n[i]) + nSpace[i] + "</ins>";
      		} else {
        		var pre = "";

        		for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
          			pre += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
        		}
        		str += " " + out.n[i].text + nSpace[i] + pre;
      		}
    	}
  	}
  
  return str;
}

function escape(s) {
    var n = s;
    n = n.replace(/&/g, "&amp;");
    n = n.replace(/</g, "&lt;");
    n = n.replace(/>/g, "&gt;");
    n = n.replace(/"/g, "&quot;");

    return n;
}

function diff( o, n ) {
  var ns = new Object();
  var os = new Object();
  
  for ( var i = 0; i < n.length; i++ ) {
    if ( ns[ n[i] ] == null )
      ns[ n[i] ] = { rows: new Array(), o: null };
    ns[ n[i] ].rows.push( i );
  }
  
  for ( var i = 0; i < o.length; i++ ) {
    if ( os[ o[i] ] == null )
      os[ o[i] ] = { rows: new Array(), n: null };
    os[ o[i] ].rows.push( i );
  }
  
  for ( var i in ns ) {
    if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
      n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
      o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
    }
  }
  
  for ( var i = 0; i < n.length - 1; i++ ) {
    if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
         n[i+1] == o[ n[i].row + 1 ] ) {
      n[i+1] = { text: n[i+1], row: n[i].row + 1 };
      o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
    }
  }
  
  for ( var i = n.length - 1; i > 0; i-- ) {
    if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
         n[i-1] == o[ n[i].row - 1 ] ) {
      n[i-1] = { text: n[i-1], row: n[i].row - 1 };
      o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
    }
  }
  
  return { o: o, n: n };
}


module.exports = diffString;
