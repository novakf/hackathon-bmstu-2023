import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode[] | ReactNode
  title: JSX.Element
  disabled?: boolean
}

const Tooltip: React.FC<Props> = (props) => {
  const { children, title } = props
  const [open, setOpen] = useState(true)

  let timeout: ReturnType<typeof setTimeout>

  const showTip = () => {
    timeout = setTimeout(() => setOpen(true), 100)
  }

  const hideTip = () => {
    clearTimeout(timeout)
    setOpen(false)
  }

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      <Tip $open={open}>{title}</Tip>
    </TooltipWrapper>
  )
}

const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  z-index: 10;
`

const Tip = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: calc(100%);
  font-size: 10px;
  background-color: white;
  color: black;
  border-radius: 5px;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.1s, transform 0.15s;
  opacity: 0;
  padding: 0 7px;
  transform-origin: bottom;
  transform: scale(0);
  ${(p) =>
    p.$open &&
    `
    opacity: 1;
    transform: scale(1);
  `}
`

export default Tooltip