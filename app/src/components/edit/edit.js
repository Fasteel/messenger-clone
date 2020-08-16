import React from 'react'
import './edit.css'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import withUndevelopedModal from '../hoc/withUndevelopedModal'
import IconButton from '../icon-button/icon-button'
import ImageIcon from '@material-ui/icons/Image'
import SendIcon from '@material-ui/icons/Send'

const Edit = ({ message, send }) => {
  const IconButtonWithUndevelopedModal = withUndevelopedModal(IconButton)

  return (
    <div className='edit'>
      <div className='edit__toolbar hide-on-mobile'>
        <IconButtonWithUndevelopedModal Icon={AddCircleIcon} ariaLabel='Ajouter' />
        <IconButtonWithUndevelopedModal Icon={ImageIcon} ariaLabel='Ajouter' />
      </div>
      <div className='edit__input-container'>
        <div className='edit__input'>
          <input
            value={message}
            autoFocus
            type='text'
            placeholder='Écrivez un message...'
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                send('sendMessage')
              }
            }}
            onChange={(ev) => {
              send({
                type: 'editMessage',
                value: ev.target.value
              })
            }}
          />
        </div>
      </div>
      <div className='edit__send'>
        <IconButton
          onClick={() => send('sendMessage')}
          Icon={SendIcon}
          ariaLabel='Envoyer'
        />
      </div>
    </div>
  )
}

export default Edit
