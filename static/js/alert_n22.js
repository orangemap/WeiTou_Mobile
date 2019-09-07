var alert_n22 = new function() {
	this.width = $(window).width() * 0.8;
	this.height = 172;

	this.close = function() {
		$('.win iframe').fadeOut();
		$('.win').fadeOut("fast");
		setTimeout(function() {
			$('.win iframe').remove();
			$('.win').remove();
		}, 200);
	};


	function messageBox(html, title, message) {
		var jq = $(html);
		jq.find(".window-panel").width(alert_n22.width).css("margin-left", -alert_n22.width / 2).css("margin-top", -alert_n22.height / 2 - 36);
		if(valempty(title)) {
			jq.find(".title").remove();
			jq.find(".window-panel .body-panel").css("border-radius", "20px");
		} else {
			jq.find(".title").find(":header").html(title);
		}
		jq.find(".content").html(message.replace('\r\n', '<br/>'));
		jq.find(".contentrule").html(message.replace('\r\n', '<br/>'));
		jq.appendTo('body').fadeIn("fast");
		$(".win .w-btn:first").focus();
	}

	this.confirm = function(title, message, confirmName, cancelName,confirm,cancel) {
		this._close = function(flag) {
			$(".win").remove();
			if(flag) {
				if(confirm != undefined && confirm != ""){
					confirm();
				}
			} else {
				if(cancel != undefined && cancel != ""){
					cancel();
				}
			};
		};
		var html = '';
		if(confirmName == undefined || confirmName == ""){
			confirmName = "确定"
		}
		if(cancelName == undefined || cancelName == ""){
			cancelName = "取消"
		}
		if(confirmName&&cancelName){
			html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel"><p class="content"></p><p class="btns"><button class="w-btn w-btns" onclick="alert_n22._close(true);">'+confirmName+'</button><button class="w-btn" tabindex="1" onclick="alert_n22._close(false);">'+cancelName+'</button></p></div></div></div>';
		}else{
			html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel"><p class="content"></p><p class="btns"><button class="w-btn w-btns" onclick="alert_n22._close(true);">确定</button><button class="w-btn" tabindex="1" onclick="alert_n22._close(false);">取消</button></p></div></div></div>';
		}
		messageBox(html, title, message);
	};

	this.alert = function(title, message, btnName) {
		var icon = "";
		if(btnName == undefined || btnName == ""){
			btnName = "确定"
		}
		var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel"><p class="content"></p><p class="alertBtns"><button class="w-btn w-btns close-button" tabindex="1" onclick="alert_n22.close();">'+btnName+'</button></p></div></div></div>';
		messageBox(html, title, message);
	}
	
	this.alertRules = function(title, message, btnName) {
		var icon = "";
		if(btnName == undefined || btnName == ""){
			btnName = "确定"
		}
		var html = '<div class="win"><div class="mask-layer"></div><div class="window-panel"><iframe class="title-panel" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe><div class="title"><h3></h3></div><div class="body-panel"><p class="contentrule"></p><p class="alertBtns"><button class="w-btn w-btns close-button" tabindex="1" onclick="alert_n22.close();">'+btnName+'</button></p></div></div></div>';
		messageBox(html, title, message);
	}

};

function valempty(str) {
	if(str == "null" || str == null || str == "" || str == "undefined" || str == undefined || str == 0) {
		return true;
	} else {
		return false;
	}
}