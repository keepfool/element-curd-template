import Vue from 'vue'
import Main from './main.vue'
import { PopupManager } from 'element-ui/src/utils/popup'
import { isVNode } from 'element-ui/src/utils/vdom'
let MessageConstructor = Vue.extend(Main)

let instance

const Message = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let userOnClose = options.onClose

  options.onClose = function () {
    Message.close(userOnClose)
  }

  if (!instance) {
    instance = new MessageConstructor({
      data: options
    })

    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message]
      instance.message = null
    }
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.dom = instance.vm.$el
    instance.dom.style.zIndex = PopupManager.nextZIndex()
  }

  instance.duration = options.duration
  instance.message = options.message
  instance.closed = false

  return instance.vm
}

Message.close = function (userOnClose) {
  if (typeof userOnClose === 'function') {
    userOnClose(instance)
  }
}

export default Message
