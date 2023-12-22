import { useRouter } from 'solito/router'
import { YStack, Text, Button } from 'tamagui'

export const NextButton = (props: { text: string; onNavigate: () => Promise<string | null> }) => {
  const { push } = useRouter()
  const navigate = async () => {
    const path = await props.onNavigate()
    path && push(path)
  }

  return (
    <YStack width="100%" marginBottom={56} paddingLeft={20} paddingRight={20}>
      <Button
        onPress={navigate}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={10}
        borderRadius={25}
        backgroundColor="#FFD14E"
      >
        <Text
          flexShrink={0}
          color="#82630E"
          textAlign="center"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="700"
          letterSpacing={0.16}
        >
          {props.text}
        </Text>
      </Button>
    </YStack>
  )
}
