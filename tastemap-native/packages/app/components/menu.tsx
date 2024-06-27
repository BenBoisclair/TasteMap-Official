import { useRouter } from 'solito/router'
import { SolitoImage } from 'solito/image'
import { YStack, Button, Text } from '@my/ui'
import { Dispatch, SetStateAction } from 'react'
import { useCurrentRoute } from 'app/utils/hooks'
import { useInternalScreen } from 'app/atoms/internalScreen'

export enum BookState {
  BOOK = 'BOOK',
  SUMMARY = 'SUMMARY',
}

export const FinancialMenuBar = ({
  bookState,
  setBookState,
}: {
  bookState: BookState
  setBookState: Dispatch<SetStateAction<BookState>>
}) => {
  return (
    <YStack
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      alignSelf="stretch"
      marginTop={52}
    >
      <Button
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor={bookState === BookState.BOOK ? '#FFF3D1' : '#FFF'}
        borderWidth={0}
        borderRadius={0}
        hoverStyle={{
          backgroundColor: bookState === BookState.BOOK ? '#FFF3D1' : '#FFF',
        }}
        pressStyle={{
          backgroundColor: bookState === BookState.BOOK ? '#FFF3D1' : '#FFF',
          flexGrow: 1,
        }}
        onPress={() => setBookState(BookState.BOOK)}
      >
        <Text
          color="#82630E"
          textAlign="center"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="700"
          letterSpacing={0.16}
        >
          บันทึกการเงิน
        </Text>
        <YStack
          width="100%"
          height="100%"
          position="absolute"
          alignItems="center"
          justifyContent="flex-end"
        >
          {bookState === BookState.BOOK && (
            <SolitoImage
              src={require('../assets/yellow-line.png')}
              width={60}
              height={4}
              contentFit="cover"
              alt="book"
              onLayout={() => {}}
              resizeMode="cover"
            />
          )}
        </YStack>
      </Button>
      <Button
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor={bookState === BookState.SUMMARY ? '#FFF3D1' : '#FFF'}
        borderRadius={0}
        borderWidth={0}
        hoverStyle={{
          backgroundColor: bookState === BookState.SUMMARY ? '#FFF3D1' : '#FFF',
        }}
        pressStyle={{
          backgroundColor: bookState === BookState.SUMMARY ? '#FFF3D1' : '#FFF',
          borderWidth: 0,
        }}
        onPress={() => setBookState(BookState.SUMMARY)}
      >
        <Text
          color="#3F3F3F"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing={0.16}
        >
          ผลสรุปการเงิน
        </Text>
        <YStack
          width="100%"
          height="100%"
          position="absolute"
          alignItems="center"
          justifyContent="flex-end"
        >
          {bookState === BookState.SUMMARY && (
            <SolitoImage
              src={require('../assets/yellow-line.png')}
              width={60}
              height={4}
              contentFit="cover"
              alt="book"
              onLayout={() => {}}
              resizeMode="cover"
            />
          )}
        </YStack>
      </Button>
    </YStack>
  )
}

export const NavHorizontalBar = () => {
  const [internalScreen, setInternalScreen] = useInternalScreen()

  return (
    <YStack
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={43}
      alignSelf="stretch"
      backgroundColor="#FFF"
      paddingVertical={20}
    >
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
        backgroundColor="#FFF"
        outlineWidth={0}
        borderWidth={0}
        hoverStyle={{
          backgroundColor: '#FFF',
        }}
        pressStyle={{
          backgroundColor: '#FFF',
          outlineWidth: 0,
          borderWidth: 0,
        }}
      >
        <YStack
          display="flex"
          width={74}
          height={74}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={6}
          flexShrink={0}
          backgroundColor="#FFF"
          hoverStyle={{
            backgroundColor: '#FFF',
          }}
          pressStyle={{
            backgroundColor: '#FFF',
          }}
          onPress={() => setInternalScreen('book')}
        >
          <SolitoImage
            src={
              internalScreen === 'book'
                ? require('../assets/book.png')
                : require('../assets/book-disabled.png')
            }
            width={24}
            height={24}
            contentFit="cover"
            alt="book"
            onLayout={() => {}}
            resizeMode="cover"
          />
          <Text
            color={internalScreen === 'book' ? '#82630E' : '#6F6F6F'}
            textAlign="center"
            fontFamily="$body"
            fontSize={12}
            fontStyle="normal"
            fontWeight="500"
            letterSpacing={0.12}
          >
            การเงิน
          </Text>
        </YStack>
      </Button>
      {
        // <Button
        //   display="flex"
        //   flexDirection="column"
        //   justifyContent="center"
        //   alignItems="center"
        //   gap={3}
        //   backgroundColor="#FFF"
        //   outlineWidth={0}
        //   borderWidth={0}
        //   hoverStyle={{
        //     backgroundColor: '#FFF',
        //   }}
        //   pressStyle={{
        //     backgroundColor: '#FFF',
        //     outlineWidth: 0,
        //     borderWidth: 0,
        //   }}
        //   onPress={() => setInternalScreen('dashboard')}
        // >
        //   <YStack
        //     display="flex"
        //     width={74}
        //     height={74}
        //     flexDirection="column"
        //     justifyContent="center"
        //     alignItems="center"
        //     gap={6}
        //     flexShrink={0}
        //   >
        //     <SolitoImage
        //       src={
        //         internalScreen === 'dashboard'
        //           ? require('../assets/dashboard.png')
        //           : require('../assets/dashboard-disabled.png')
        //       }
        //       width={24}
        //       height={24}
        //       contentFit="cover"
        //       alt="book"
        //       onLayout={() => {}}
        //       resizeMode="cover"
        //     />
        //     <Text
        //       color={internalScreen === 'dashboard' ? '#82630E' : '#6F6F6F'}
        //       fontFamily="$body"
        //       fontSize={12}
        //       fontStyle="normal"
        //       fontWeight="500"
        //       letterSpacing={0.12}
        //     >
        //       ประสิทธิภาพ
        //     </Text>
        //   </YStack>
        // </Button>
      }
      <Button
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
        backgroundColor="#FFF"
        outlineWidth={0}
        borderWidth={0}
        hoverStyle={{
          backgroundColor: '#FFF',
        }}
        pressStyle={{
          backgroundColor: '#FFF',
          outlineWidth: 0,
          borderWidth: 0,
        }}
        onPress={() => setInternalScreen('account')}
      >
        <YStack
          display="flex"
          width={60}
          height={45}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={6}
          flexShrink={0}
        >
          <SolitoImage
            src={
              internalScreen === 'account'
                ? require('../assets/account.png')
                : require('../assets/account-disabled.png')
            }
            width={24}
            height={24}
            contentFit="cover"
            alt="book"
            onLayout={() => {}}
            resizeMode="cover"
          />
          <Text
            color={internalScreen === 'account' ? '#82630E' : '#6F6F6F'}
            fontFamily="$body"
            fontSize={12}
            fontStyle="normal"
            fontWeight="500"
            letterSpacing={0.12}
          >
            บัญชี
          </Text>
        </YStack>
      </Button>
    </YStack>
  )
}
