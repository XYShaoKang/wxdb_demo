import React from 'react'
import { storiesOf } from '@storybook/react'
import MessagAppTitle from './MessagAppTitle'

storiesOf('MessagAppTitle', module)
  .add('with text', () => <MessagAppTitle title='This is a title' />)
  .add('with some emoji', () => <MessagAppTitle title='😀 😎 👍 💯' />)
