import React, { useEffect, useMemo, useState } from 'react'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  Form,
  formStyleTransitionPx,
  SchemaField,
  schemaTransitionPx,
} from 'taroify-formily/src'

import { initFormily } from '@/utils/formily'

import './index.scss'

import testJson from './event.json'

initFormily()

function transitionPx(designableJson) {
  schemaTransitionPx(designableJson.schema, { mode: 'rem' })
  formStyleTransitionPx(designableJson.form, { mode: 'rem' })
}

export default () => {
  const [designableJson, setdesignableJson] = useState<{
    form: any
    schema: any
  }>(testJson)
  const form = useMemo(
    () =>
      createForm({
        initialValues: designableJson.form?.initialValues || {},
      }),
    [designableJson]
  )
  async function submit() {
    try {
      const res = (await form.submit()) as any
      console.log('form res -> ', res)
    } catch (e) {
      console.log(`e`, e)
      if (!e?.length) return
      const temp = e[0]
    }
  }
  transitionPx(designableJson)
  console.log(designableJson)

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      if (window.opener) {
        const fn = (event) => {
          if (event.data.type === 'getSchemaRes') {
            console.log(event.data.data, JSON.parse(event.data.data))
            setdesignableJson(JSON.parse(event.data.data))
            window.removeEventListener('message', fn)
          }
        }
        window.addEventListener('message', fn, false)
        window.opener.postMessage(
          {
            type: 'getSchema',
          },
          '*'
        )
      }
    }
  }, [])

  return (
    <View>
      <Form form={form} {...designableJson.form}>
        <SchemaField schema={designableJson.schema} />
      </Form>
      {/* <Button onClick={submit} style={{marginTop: '1rem'}}>submit</Button> */}
    </View>
  )
}
