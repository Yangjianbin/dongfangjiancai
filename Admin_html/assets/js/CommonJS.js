/**
 *
 * 以对话框形式打开页面
 */
 function viewFrameDialog(title, url) {
        $.dialog({
            title: title,
            lock: true,
            id: 'addAddress',
            width: '660px',
            height: '400px',
            content: ['<div class="dialog-form">',
                '<div class="form-group">',
                    '<iframe src=' + url + ' frameborder="0" width="100%" height="400"></iframe></div>',
            '</div>'].join(''),
            padding: '0px'
        });
    }
 function showInfoDialog(title, url,width,height) {
     $.dialog({
         title: title,
         lock: true,
         id: 'addAddress',
         width: width,
         height: height,
         content: ['<div class="dialog-form">',
             '<div class="form-group">',
                 '<iframe src=' + url + ' frameborder="0" width="100%" height="'+height+'"></iframe></div>',
         '</div>'].join(''),
         padding: '0px'
     });
 }