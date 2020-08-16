import React from 'react'
import MaterialIconButton from '@material-ui/core/IconButton'

const IconButton = ({ Icon, onClick, ariaLabel }) => (
  <MaterialIconButton aria-label={ariaLabel} onClick={onClick}>
    <Icon color='primary' fontSize='large' />
  </MaterialIconButton>
)

export default IconButton
