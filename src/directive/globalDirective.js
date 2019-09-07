import Vue from 'vue'

//仅支持大小写字母,数字和汉字
Vue.directive('filterSpecialChar', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})

//仅支持大小写字母和汉字
Vue.directive('supportLetterChinese', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})

//仅支持数字 input type字段使用text
Vue.directive('supportNumber', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            if (_input.value == undefined) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/[^0-9]/g, "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})


//仅支持数字首位不能为0 input type字段使用text   
Vue.directive('supportLogNumber', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/^[0]+[0-9]*$/gi, "");
            value = value.replace(/^([1-9]\d{2})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d]/g, '');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})
//仅支持数字首位不能为0 input type字段使用text   
Vue.directive('supportLogNumbers', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/^[0]+[0-9]*$/gi, "");
            value = value.replace(/^([1-9]\d{2})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d]/g, '');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})
//仅支持数字和小数 input type字段使用text
Vue.directive('filterAmountOfMoney', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            if (_input.value == undefined) { //此处需获取input标签
                return false;
            }
            //禁止录入整数部分两位以上，但首位为0
            let value = _input.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
            //禁止录入整数部分超过6位
            value = value.replace(/^([1-9]\d{4})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d\.]/g, '');
            //第一个输入.  则自动变为0.
            value = value.replace(/^\./g, '');
            //保证.只出现一次，而不能出现两次以上 2..    2.2.2
            value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //只能输入两个小数
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) {
            console.log(e)
        }
    }
})

//仅支持数字和小数 input type字段使用text
Vue.directive('filterAmountOfBillionMoney', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            if (_input.value == undefined) { //此处需获取input标签
                return false;
            }
            //禁止录入整数部分两位以上，但首位为0
            let value = _input.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
            //禁止录入整数部分超过6位
            value = value.replace(/^([1-9]\d{8})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d\.]/g, '');
            //第一个输入.  则自动变为0.
            value = value.replace(/^\./g, '');
            //保证.只出现一次，而不能出现两次以上 2..    2.2.2
            value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //只能输入两个小数
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) {
            console.log(e)
        }
    }
})

//仅支持数字和小数 input type字段使用text
Vue.directive('filterAmountMoney', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            if (_input.value == undefined) { //此处需获取input标签
                return false;
            }
            //禁止录入整数部分两位以上，但首位为0
            let value = _input.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
            //禁止录入整数部分超过6位
            value = value.replace(/^([1-9]\d{8})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d\.]/g, '');
            //第一个输入.  则自动变为0.
            value = value.replace(/^\./g, '');
            //保证.只出现一次，而不能出现两次以上 2..    2.2.2
            value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //只能输入两个小数
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})
//仅支持数字和小数不能大于100 input type字段使用text
Vue.directive('filterAmountOfMoneys', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            //禁止录入整数部分两位以上，但首位为0
            let value = _input.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
            //禁止录入整数部分超过6位
            value = value.replace(/^([1-9]\d{2})\d*/g, '$1');
            //替换除了数字和.以外的字符
            value = value.replace(/[^\d\.]/g, '');
            //第一个输入.  则自动变为0.
            value = value.replace(/^\./g, '');
            //保证.只出现一次，而不能出现两次以上 2..    2.2.2
            value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //只能输入两个小数
            value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) {
            console.log(e)
        }
    }
})
//仅支持大小写字母,数字
Vue.directive('filterLetterNumber', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/[^\a-\z\A-\Z0-9]/g, "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})

//仅支持小数
//integerDigits参数无最大值限制,默认4
//decimal参数最大值为1默认2 
//eg: v-filterDecimal="{'integer':4,'decimal':3}"
Vue.directive('filterDecimal', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            let integerDigits = 4
            let decimalDigits = 2
            if (value != undefined) {
                integerDigits = value.integer != undefined ? value.integer : 4
                decimalDigits = value.decimal != undefined ? value.decimal : 2
            }
            let newinput = undefined
            if (_input.className.indexOf('el-input') > -1) {
                newinput = _input.getElementsByTagName('input')[0]
            } else {
                newinput = _input
            }
            if (!newinput.value) { //此处需获取input标签
                return false;
            }
            //禁止录入整数部分两位以上，但首位为0
            let value = newinput.value.replace(/^([1-9]\d*(\.[\d]{0,10})?|0(\.[\d]{0,10})?)[\d.]*/g, '$1');
            //禁止录入整数部分超过6位
            value = newinput.value.replace(eval("/^([1-9]\\d{" + (integerDigits - 1) + "})\\d*/g"), '$1');
            //替换除了数字和.以外的字符
            value = newinput.value.replace(/[^\d\.]/g, '');
            //第一个输入. 则自动变为0.
            value = newinput.value.replace(/^\./g, '0.');
            //保证.只出现一次，而不能出现两次以上 2.. 2.2.2
            value = newinput.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //只能输入两个小数
            value = newinput.value.replace(eval("/^(\\-)*(\\d+)\\.(\\d{" + decimalDigits + "}).*$/"), '$1$2.$3');
            if (newinput.value != value) {
                let pos = getPosition(newinput)
                newinput.value = value
                setPosition(newinput, pos - 1)
                newinput.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) {
            console.log(e)
        }
    }
})

//针对邮箱
Vue.directive('filterEmail', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(/[^\a-\z\A-\Z0-9\@\._-]/g, "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})

//屏蔽空格
Vue.directive('preventSpace', {
    update: function (_input, {
        value,
        modifiers
    }, vnode) {
        try {
            if (!_input.value) { //此处需获取input标签
                return false;
            }
            let value = _input.value.replace(" ", "");
            if (_input.value != value) {
                let pos = getPosition(_input)
                _input.value = value
                setPosition(_input, pos - 1)
                _input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
            }
        } catch (e) { }
    }
})

//禁止按钮重复点击
Vue.directive('preventReClick', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 2000)
            }
        })
    }
})


//改变node状态
Vue.directive('changeState', {
    update: function (el, binding, vnode) {
        let cels = el.getElementsByTagName('input')
        for (let i in cels) {
            let cel = cels[i]
            console.log('-', cel)
            try {
                if (binding.value) {
                    cel.setAttribute('disabled', 'disabled')
                } else {
                    cel.removeAttribute('disabled')
                }
            } catch (e) {
                //TODO handle the exception
            }
        }
        if (binding.value) {
            el.setAttribute('disabled', 'disabled')
        } else {
            el.removeAttribute('disabled')
        }
    }
})

function getPosition(ele) {
    let cursorPos = 0
    if (document.selection) { // IE
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -ele.value.length)
        cursorPos = selectRange.text.length
    } else if (ele.selectionStart || ele.selectionStart === '0') {
        cursorPos = ele.selectionStart
    }
    return cursorPos
}

function setPosition(ele, pos) {
    if (ele.setSelectionRange) {
        ele.focus()
		/* 选中输入框指定位置文本
		* selectionStart 起始位置
		* selectionEnd 终点位置
		* */
        ele.setSelectionRange(pos, pos)
    } else if (ele.createTextRange) { // IE
        let range = ele.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
    }
}