let myObj = {
  /* 自定义模态框 */
  // dialog配置
  dialogConfig: {
    title: '',
    content: '',
    btnValue: ['确认', '取消'],
    callback: function() {},
  },
  // dialog调用方法如下：
  // myObj.dialog({
  //   title: '已还款明细',
  //   content: html,
  //   callback: function() {} //点击右上角X执行回调
  // });
  dialog: function(options) {
    var opts = $.extend({}, this.dialogConfig, options);
    var html = '<div class="my-dialog">'+
                '<div class="my-dialog-modal">'+
                  '<div class="my-dialog-title"></div>'+
                  '<div class="my-dialog-content"></div>'+
                  '<div class="my-dialog-close"></div>'+
                '</div>'+
              '</div>';
    this.renderDialog(opts, html, 'dialog');
  },
  // 关闭dialog方法
  closeDialog: function() {
    $('.my-dialog').removeClass('my-active').remove();
  },
  // alert调用方法如下：
  // myObj.alert({
  //   content: html,
  //   btnValue: ['确认'],
  //   callback: function() {} //点击确认按钮执行回调
  // });
  alert: function(options) {
    var opts = $.extend({}, this.dialogConfig, options);
    var html = '<div class="my-dialog my-alert">'+
                '<div class="my-dialog-modal">'+
                  '<div class="my-dialog-content"></div>'+
                  '<div class="my-btn-alert"></div>'+
                  '<div class="my-alert-close"></div>'+
                '</div>'+
              '</div>';
    this.renderDialog(opts, html, 'alert');
  },
  // confirm调用方法如下：
  // myObj.confirm({
  //   content: html,
  //   btnValue: ['确认', '取消'],
  //   callback: function() {} //点击确认按钮执行回调
  // });
  confirm: function(options) {
    var opts = $.extend({}, this.dialogConfig, options);
    var html = '<div class="my-dialog my-alert">'+
                '<div class="my-dialog-modal">'+
                  '<div class="my-dialog-content"></div>'+
                  '<div class="my-btn-options">'+
                    '<span class="my-btn-cancel"></span>'+
                    '<span class="my-btn-confirm"></span>'+
                  '</div>'+
                '</div>'+
              '</div>';
    this.renderDialog(opts, html, 'confirm');
  },
  // 渲染dialog内容
  renderDialog: function(opts, html, type) {
    var _this = this;
    var _dialog = $('.my-dialog');
    if(_dialog.length == 0) {
      $('body').append(html);
    }
    _dialog = $('.my-dialog');
    _dialog.show().addClass('my-active');
    _dialog.find('.my-dialog-content').html(opts.content);
    if(type === 'dialog') {
      _dialog.find('.my-dialog-title').text(opts.title);
    } else if(type === 'alert') {
      _dialog.find('.my-btn-alert').text(opts.btnValue[0]);
      if(opts.close) {
        _dialog.find('.my-alert-close').show();
      } else {
        _dialog.find('.my-alert-close').hide();
      }
    } else if(type === 'confirm') {
      _dialog.find('.my-btn-confirm').text(opts.btnValue[0]);
      _dialog.find('.my-btn-cancel').text(opts.btnValue[1]);
    }
    // 关闭事件
    $('.my-dialog-close, .my-btn-alert, .my-btn-confirm').one('click', function() {
      _this.closeDialog();
      if(opts.callback && typeof opts.callback == 'function') {
        opts.callback();
      }
    });
    $('.my-btn-cancel, .my-alert-close').one('click', function() {
      _this.closeDialog();
    });
  }
}

export {myObj}
