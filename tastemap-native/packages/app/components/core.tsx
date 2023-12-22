import { YStack } from 'tamagui'

export const Bottom: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <YStack
      // Frame 585
      display="flex"
      alignItems="flex-start"
      position="relative"
      justifyContent="center"
      marginTop={'auto'}
      width={'100%'}
      bottom={0}
    >
      {props.children}
    </YStack>
  )
}
