import { LoginRequestBody } from '../../../../apps/next/pages/api/auth/interface'
import { SuccessResponse } from '../../../../apps/next/pages/api/interface'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { usePhoneNumber } from 'app/atoms/phoneNumber'
import { NextButton } from '../../components/button'
import { getAuthStorage } from 'app/utils/storage'
import { useSlowRouter } from 'app/utils/hooks'
import { Bottom } from '../../components/core'
import { YStack, Text, Input } from '@my/ui'
import { useMutation } from 'react-query'
import { postApi } from 'app/utils/fetch'

export function HomeScreen() {
  const { mutateAsync } = useMutation((body: LoginRequestBody) => postApi('/auth/login', body))
  const [phoneNumber, setPhoneNumber] = usePhoneNumber()
  const [isError, setIsError] = useState(false)
  const { push } = useSlowRouter()

  const [getAuth] = getAuthStorage()

  const onNavigate = async () => {
    const successResponse = await mutateAsync(
      LoginRequestBody.parse({
        phone_number: phoneNumber,
      })
    )
    if (successResponse.error) {
      setIsError(true)
      return null
    }
    const { success } = SuccessResponse.parse(successResponse.data)

    return success ? '/verification' : null
  }

  useEffect(() => {
    ;(async () => {
      setPhoneNumber('')
      // await setAuth({
      //   refresh_token: '',
      //   access_token: '',
      //   expiration_date: '',
      // })
      console.log(await getAuth())
      ;(await getAuth()).access_token !== '' && push('/book')
    })()
  }, [])

  return (
    <YStack f={1} justifyContent="center" alignItems="center" backgroundColor="#FFF">
      <Frame5094 isError={isError} setIsError={setIsError} />
      <Bottom>
        <NextButton text="ไปต่อ" onNavigate={onNavigate} />
      </Bottom>
    </YStack>
  )
}

const Frame5094 = ({
  isError,
  setIsError,
}: {
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <YStack width="100%" marginTop={140} paddingLeft={20} paddingRight={20}>
      <YStack
        // Frame 5093
        display="flex"
        marginLeft={20}
        marginRight={20}
        flexDirection="column"
        alignItems="center"
        gap={40}
      >
        <Text
          color="#000"
          textAlign="center"
          fontFamily="$body"
          fontSize={28}
          fontStyle="normal"
          fontWeight="700"
        >
          ยินดีต้อนรับ
        </Text>
        <PhoneNumberInput isError={isError} setIsError={setIsError} />
      </YStack>
    </YStack>
  )
}

const PhoneNumberInput = ({
  isError,
  setIsError,
}: {
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
}) => {
  const [phoneNumber, setPhoneNumber] = usePhoneNumber()

  const evaluatePhoneNumber = (inputPhoneNumber: string) => {
    const isValidPhoneNumberCharacter = () => {
      const phoneNumberRegex = /^\+?[0-9]*$/
      return inputPhoneNumber.length === 0 || phoneNumberRegex.test(inputPhoneNumber)
    }
    const updatePhoneNumberAndResetError = () => {
      setPhoneNumber(inputPhoneNumber)
      setIsError(false)
    }

    isValidPhoneNumberCharacter() && updatePhoneNumberAndResetError()
  }

  return (
    <YStack
      display="flex"
      height={46}
      width="100%"
      paddingLeft={0}
      paddingRight={0}
      justifyContent="center"
      alignItems="center"
      gap={10}
      alignSelf="stretch"
      borderRadius={10}
    >
      {isError ? (
        <Text
          color="#EB5E2A"
          textAlign="center"
          fontFamily="$body"
          fontSize={13}
          fontStyle="normal"
          fontWeight="400"
          height={20}
        >
          หมายเลขโทรศัพท์นี้ไม่ได้อยู่ในระบบ โปรดลองใหม่อีกครั้ง
        </Text>
      ) : (
        <YStack height={20} />
      )}
      <YStack width="100%" padding={0}>
        <Input
          fontFamily="$body"
          fontSize={20}
          fontStyle="normal"
          fontWeight="500"
          textAlign="center"
          letterSpacing={0.2}
          marginLeft={0}
          marginRight={0}
          padding={0}
          borderWidth={!isError ? 0 : 1}
          borderColor={!isError ? '#FFF' : 'red'}
          backgroundColor="#F6F4ED"
          focusStyle={{
            outlineWidth: 1.5,
            outlineColor: '#4F94F3',
          }}
          value={phoneNumber}
          onChangeText={evaluatePhoneNumber}
          placeholder="หมายเลขโทรศัพท์"
          keyboardType="number-pad"
        />
      </YStack>
    </YStack>
  )
}
