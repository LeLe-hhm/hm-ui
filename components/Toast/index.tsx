import React from 'react'
import * as ReactDOM from 'react-dom'
import classNames from 'classnames'

const DURATION = 3000
const prefixCls = 'hm-toast'

let toastInfo: { [key: string]: string | number | any } = {}

interface toastParams {
  content: string | React.ReactNode
  duration?: number
  onClose?: () => void
}

const config: toastParams = {
  content: '',
  duration: DURATION,
  onClose: () => {
    return null
  },
}

// function checkIconType(icon: string | React.ReactNode, type: string) {
//   const toastIconClass = classNames(
//     type === 'loading' ? `${prefixCls}-wrap-loading_icon` : `${prefixCls}-icon`
//   )

//   if (typeof icon === 'string') {
//     return (
//       <Icon
//         type={icon as iconType}
//         loading={type === 'loading'}
//         className={toastIconClass}
//       />
//     )
//   } else if (React.isValidElement(icon)) {
//     return icon
//   } else {
//     throw new TypeError('Expect string or ReactNode, type error!')
//   }
// }

function clearToast(lastToast: Element) {
  remove(lastToast)
  if (toastInfo.onClose) {
    toastInfo.onClose()
    toastInfo.onClose = Function
  }
}
function remove(div: Element) {
  // 从DOM元素中移除已挂载的React组件，清除它的事件处理器和state
  ReactDOM.unmountComponentAtNode(div)
  if (div && div.parentNode) {
    div.parentNode.removeChild(div)
  }
}

function notice(opts: toastParams | string, type: string) {
  const lastToast = document.querySelector('[phi-toast]')
  let options = { ...config }
  if (typeof opts === 'string') {
    options.content = opts
  } else {
    options = { ...config, ...opts }
  }

  // if (type !== 'info') {
  //   options.icon = iconNames[type]
  // }

  const div: Element = document.createElement('div')
  div.setAttribute('phi-toast', 'true')
  document.body.appendChild(div)

  const toastWrapClass = classNames(`${prefixCls}-wrap`, {
    [`${prefixCls}-wrap-loading`]: type === 'loading',
    // [`${prefixCls}-wrap-icon`]: options.icon && type !== 'loading',
    // [`${prefixCls}-wrap-normal`]: !options.icon,
  })

  const toastTextClass = classNames({
    // [`${prefixCls}-wrap-icon_span`]: options.icon,
    [`${prefixCls}-wrap-loading_span`]: type === 'loading',
  })

  // const toastIconBoxClass = classNames(
  //   type === 'loading'
  //     ? `${prefixCls}-wrap-loading_box`
  //     : `${prefixCls}-wrap-icon_box`
  // )

  clearTimeout(toastInfo && toastInfo.timer)
  if (lastToast) {
    clearToast(lastToast)
  }

  toastInfo = {
    timer: setTimeout(() => {
      remove(div)
      if (options.onClose) {
        options.onClose()
      }
    }, options.duration),
    onClose: options.onClose,
  }

  ReactDOM.render(
    <div className={prefixCls}>
      <div className={toastWrapClass}>
        {/* {options.icon && (
          <div className={toastIconBoxClass}>
            {checkIconType(options.icon, type)}
          </div>
        )} */}
        <span className={toastTextClass}>{options.content}</span>
      </div>
    </div>,
    div
  )
}

export default {
  info(params: toastParams | string): void {
    notice(params, 'info')
  },
  success(params: toastParams | string): void {
    notice(params, 'success')
  },
  loading(params: toastParams | string): void {
    notice(params, 'loading')
  },
}
