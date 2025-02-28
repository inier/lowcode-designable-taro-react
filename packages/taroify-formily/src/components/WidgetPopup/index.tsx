import React from 'react'
import { observer, useForm } from '@formily/react'
import { Popup } from '@taroify/core'
import { View as TaroView } from '@tarojs/components'

import { formilyStoreEvent, typeEventItem, useScope } from '../utils'

type typeProps = Partial<{
  children: React.ReactNode
  style: any
  open: boolean
  placement: 'top' | 'bottom' | 'right' | 'left' // 弹出位置
  duration: number // 动画时长
  rounded: boolean
  event: Record<string, typeEventItem>
}>

const View: any = TaroView

export const WidgetPopup = observer(
  ({
    children,
    style,
    open,
    placement,
    duration,
    rounded,
    ...props
  }: typeProps) => {
    const scope = useScope()
    const PopupSyle = { height: style.height }
    return (
      <Popup
        style={PopupSyle}
        open={open}
        placement={placement}
        duration={duration}
        rounded={rounded}
        onClick={() => {
          if (props?.event?.click) {
            formilyStoreEvent(scope, props.event.click)
          }
        }}
        onClose={() => {
          if (props?.event?.close) {
            formilyStoreEvent(scope, props.event.close)
          }
        }}
      >
        <View {...props} style={{ ...style, height: '100%', width: '100%' }}>
          {children}
        </View>
      </Popup>
    )
  }
)
