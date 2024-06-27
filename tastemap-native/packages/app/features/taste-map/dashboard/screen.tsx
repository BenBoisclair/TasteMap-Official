import { NavHorizontalBar } from 'app/components/menu'
import { Bottom } from 'app/components/core'
import { YStack, Text } from '@my/ui'

export function DashboardScreen() {
  return (
    <YStack f={1}>
      <YStack f={1} display="flex" justifyContent="center" alignContent="center">
        <Text color="gray" fontSize={26} fontWeight="600" textAlign="center" verticalAlign="middle">
          Coming Soon...
        </Text>
      </YStack>
      <Bottom>
        <YStack width="100%" backgroundColor="#F6F4ED">
          <NavHorizontalBar />
        </YStack>
      </Bottom>
    </YStack>
  )
}
