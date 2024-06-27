import { AccountResponse } from '../../../../../apps/next/pages/api/user/interface'
import { NavHorizontalBar } from 'app/components/menu'
import { Bottom } from 'app/components/core'
import { YStack, Text, Button } from '@my/ui'
import { SolitoImage } from 'solito/image'
import { useQuery } from 'react-query'
import { getApi } from 'app/utils/fetch'
import { Keyboard } from 'react-native'

export function AccountScreen() {
  const { data, isLoading } = useQuery('account', async () => await getApi('/user/account'))

  return (
    <YStack f={1} backgroundColor="#FFF" onPress={() => Keyboard.dismiss()}>
      <YStack f={1} backgroundColor="#F6F4ED" padding={16} paddingTop={60}>
        <YStack
          display="flex"
          width="100%"
          height={212}
          flexDirection="column"
          alignItems="flex-start"
          flexShrink={0}
          borderRadius={10}
          backgroundColor="#FFF"
        >
          <YStack
            display="flex"
            width="100%"
            paddingHorizontal={16}
            paddingTop={16}
            justifyContent="center"
            alignItems="flex-end"
            alignSelf="stretch"
            backgroundColor="#FFF"
            borderRadius={10}
          >
            {
              // <Button
              //   display="flex"
              //   width="auto"
              //   height="auto"
              //   paddingVertical={6}
              //   paddingHorizontal={10}
              //   justifyContent="space-between"
              //   alignItems="center"
              //   borderRadius={24}
              //   borderWidth={1.5}
              //   borderColor="#6F6F6F"
              //   backgroundColor="#FFF"
              // >
              //   <SolitoImage
              //     src={require('../../../assets/edit.png')}
              //     width={12}
              //     height={12}
              //     contentFit="cover"
              //     alt="edit"
              //     onLayout={() => {}}
              //     resizeMode="cover"
              //   />
              //   <Text
              //     color="#3F3F3F"
              //     fontFamily="$body"
              //     fontSize={14}
              //     fontStyle="normal"
              //     fontWeight="400"
              //     letterSpacing={0.14}
              //   >
              //     แก้ไข
              //   </Text>
              // </Button>
            }
          </YStack>
          <YStack
            display="flex"
            paddingHorizontal={16}
            paddingBottom={16}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={14}
            alignSelf="stretch"
            backgroundColor="#FFF"
            borderRadius={10}
          >
            <SolitoImage
              src={require('../../../assets/chicken.png')}
              width={90}
              height={90}
              contentFit="cover"
              alt="chicken"
              onLayout={() => {}}
              resizeMode="cover"
            />
            <YStack
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={8}
              alignSelf="stretch"
            >
              <Text
                color="#000"
                textAlign="center"
                fontFamily="$body"
                fontSize={18}
                fontStyle="normal"
                fontWeight="600"
                letterSpacing={0.18}
              >
                {data?.data?.vendor_name || 'Not a registered vendor on the website'}
              </Text>
              <Text
                color="#000"
                textAlign="center"
                fontFamily="$body"
                fontSize={16}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.16}
              >
                {data?.data?.phone_number}
              </Text>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
      <Bottom>
        <YStack width="100%" backgroundColor="#F6F4ED">
          <NavHorizontalBar />
        </YStack>
      </Bottom>
    </YStack>
  )
}
