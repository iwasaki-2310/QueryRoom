import { InputMessageProps } from '../../types/inputMessage'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export const DelayInput: React.FC<InputMessageProps> = (props) => {
  const { setDelayTime, delayTime } = props

  const updateDelayTime = (value: number) => {
    setDelayTime && setDelayTime(value)
  }
  const timesArray = Array.from({ length: 180 / 5 + 1 }, (_, i) => i * 5)

  return (
    <>
      <Menu placement="top">
        <MenuButton
          className="delay-input"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="blue.500"
          color="white"
          transition="all .3s"
        >
          {delayTime ? `${delayTime}分後` : '選択してください'}
        </MenuButton>
        <MenuList maxHeight="200px" width="81px" minW="50px" overflowY="scroll">
          {timesArray.map((time, index) => (
            <MenuItem className="delay-input__button" key={index} onClick={() => updateDelayTime(time)}>
              {time}
            </MenuItem>
          ))}
          <MenuItem className="delay-input__button" onClick={() => updateDelayTime(0.07)}>
            1
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
