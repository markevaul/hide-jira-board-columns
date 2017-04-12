'use strict';

console.log('\'Allo \'Allo! Content script');

// https://gist.github.com/dkniffin/b6f5dd4e1bde716e7b32#gistcomment-1980578
function toggle_visibility(data_id) {
    var matches = document.querySelectorAll(data_id);
    [].forEach.call(matches, function(e) {
        if(e.style.display == 'none') {
            e.style.display = 'table-cell';
        } else {
            e.style.display = 'none';
        }
    });
}

window.addEventListener ('load', myMain, false);

function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForDomReady, 111);

    function checkForDomReady () {
        var selector = jQuery('#ghx-column-headers > li.ghx-column');
        if (selector) {
            selector.append(function() {
                    return construct();
                });
            clearInterval(jsInitChecktimer);
            
            var style = [
                '<style>',
                '.column-header-hider {position:absolute;right:0;top:0;bottom:0;background:#f5f5f5;width:10px;}',
                '.column-header-hider i{position:absolute;top:50%;margin-top:-5px;left:50%;margin-left:-5px;width:10px;height:10px;}',
                '.column-header-hider i:before {font-size:10px;margin-top:-5px;}',
                '</style>'
            ];
            jQuery('head').append(style.join(''));
        }
    }
    
    function construct() {
        return jQuery('<a href="#" class="column-header-hider"><i class="aui-icon aui-icon-small aui-iconfont-arrows-left"></i></a>')
                .click(toggleCol);
    }
    
    function toggleCol(event) {
        var $this = jQuery(this);
        if ($this.find('i').hasClass('aui-iconfont-arrows-left')) {
            jQuery.proxy(hideCol, this)(event);
        }
        else {
            jQuery.proxy(showCol, this)(event);
        }
    }
    
    function hideCol(event) {
        var $this = jQuery(this);
        var colId = $this.parent().data('id');
        var cols = jQuery('[data-column-id="'+colId+'"],[data-id="'+colId+'"]');
        
        cols
            .css({
                overflow: 'hidden',
                width: '10px',
                paddingRight: '10px'
            });
        
        cols
            .filter('[data-id]')
                .find('h2').hide();
                
        cols
            .filter('[data-column-id]')
                .children().hide();
                
        $this.find('i').toggleClass('aui-iconfont-arrows-left aui-iconfont-arrows-right');
    }
    
    function showCol(event) {
        var $this = jQuery(this);
        var colId = $this.parent().data('id');
        var cols = jQuery('[data-column-id="'+colId+'"],[data-id="'+colId+'"]');
        
        cols
            .css({
                overflow: '',
                width: '',
                paddingRight: ''
            });

        cols
            .filter('[data-id]')
                .find('h2').show();
        
        cols
            .filter('[data-column-id]')
                .children().show();
                
        $this.find('i').toggleClass('aui-iconfont-arrows-left aui-iconfont-arrows-right');
    }
}
