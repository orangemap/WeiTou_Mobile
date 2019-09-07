const ui = {
  modal: (function (bodyCls) {
    var scrollTop;
    return {
      afterOpen: function () {
        console.log('open')
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function () {
        console.log('close')
        setTimeout(() => {
          document.body.classList.remove(bodyCls);
          document.scrollingElement.scrollTop = scrollTop;
        },1000)
      }
    };
  })('modal-open')
}

export default ui