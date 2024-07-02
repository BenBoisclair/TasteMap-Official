import {
  VerificationRequestBody,
  AuthTokenResponse,
  LoginRequestBody,
} from '../../../../apps/next/pages/api/auth/interface'
import { OtpCodeRefs, createOtpHandler, createOtpNavigationHandler } from './utils'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { usePhoneNumber } from 'app/atoms/phoneNumber'
import { NextButton } from '../../components/button'
import { getAuthStorage } from 'app/utils/storage'
import { useOtpCode } from 'app/atoms/otpCode'
import { Bottom } from '../../components/core'
import { YStack, Text, Input, Button } from '@my/ui'
import { formatTime } from 'app/utils/time'
import { useTimer } from 'app/utils/hooks'
import { useMutation } from 'react-query'
import { postApi } from 'app/utils/fetch'
import { useRouter } from 'solito/router'
import { Keyboard } from 'react-native'

export function VerificationScreen() {
  const [isError, setIsError] = useState(false)
  const [phoneNumber] = usePhoneNumber()
  const [otpCode, setOtpCode] = useOtpCode()
  const { mutateAsync } = useMutation((body: VerificationRequestBody) =>
    postApi('/auth/verify', body)
  )

  const [, setAuth] = getAuthStorage()

  const onNavigate = async () => {
    const authTokenResponse = await mutateAsync(
      VerificationRequestBody.parse({
        phone_number: phoneNumber,
        otp_code: otpCode.join(''),
      })
    )
    if (authTokenResponse.error) {
      // do something
      return null
    }
    const authToken = AuthTokenResponse.parse(authTokenResponse.data)
    await setAuth(authToken)

    return authTokenResponse.data ? '/taste-map' : null
  }

  useEffect(() => {
    setOtpCode(['', '', '', '', '', ''])
  }, [])

  return (
    <YStack
      f={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#FFF"
      onPress={() => Keyboard.dismiss()}
    >
      <Frame5094 isError={isError} setIsError={setIsError} onNavigate={onNavigate} />
      <Bottom>
        <NextButton text="ยืนยัน" onNavigate={onNavigate} />
      </Bottom>
    </YStack>
  )
}

const Frame5094 = ({
  isError,
  setIsError,
  onNavigate,
}: {
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
  onNavigate: () => Promise<string | null>
}) => {
  return (
    <YStack
      display="flex"
      width={350}
      flexDirection="column"
      alignItems="center"
      marginTop={136}
      gap={68}
    >
      <Text
        color="#000"
        textAlign="center"
        fontFamily="$body"
        fontSize={24}
        fontStyle="normal"
        fontWeight="700"
        letterSpacing={0.24}
      >
        โปรดใส่รหัสที่ SMS ส่งมา
      </Text>
      <YStack display="flex" flexDirection="column" alignItems="center" gap={20}>
        <Text
          color="#3F3F3F"
          fontFamily="$body"
          fontSize={14}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing={0.14}
        >
          ตัวอย่าง: 12345
        </Text>
        <OtpInput isError={isError} setIsError={setIsError} onNavigate={onNavigate} />
        <ResendOrOtpTimer />
      </YStack>
    </YStack>
  )
}

const ResendOrOtpTimer = () => {
  const [phoneNumber] = usePhoneNumber()
  const [timer, resetTimer] = useTimer(300)
  const { mutateAsync } = useMutation((body: LoginRequestBody) => postApi('/auth/login', body))

  const resetTimerAndSendOtp = async () => {
    resetTimer()
    await mutateAsync(
      LoginRequestBody.parse({
        phone_number: phoneNumber,
      })
    )
  }

  return (
    <>
      {timer ? (
        <Text
          color={'rgba(63, 63, 63, 0.50)'}
          textAlign="center"
          fontFamily="$body"
          fontSize={14}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing={0.14}
          alignSelf="stretch"
        >
          {`รหัสจะหมดอายุภายในอีก ${formatTime(timer)} นาที`}
        </Text>
      ) : (
        <YStack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width={340}
        >
          <Text color="#9F9F9F">ไม่ได้รับรหัส?</Text>
          <Button
            marginLeft={0}
            marginRight={0}
            paddingLeft={0}
            paddingRight={0}
            color="#4F94F3"
            hoverStyle={{
              backgroundColor: '#FFF',
            }}
            backgroundColor="#FFF"
            onPress={resetTimerAndSendOtp}
          >
            กดตรงนี้เพื่อรับรหัสใหม่อีกครั้ง
          </Button>
        </YStack>
      )}
    </>
  )
}

const OtpInput = ({
  isError,
  setIsError,
  onNavigate,
}: {
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
  onNavigate: () => Promise<string | null>
}) => {
  const [otpCode, setOtpCode] = useOtpCode()
  const refs = useRef(Array(6).fill(null) as OtpCodeRefs)
  const { push } = useRouter()

  const [setOtp, removeOtp] = createOtpHandler(otpCode, setOtpCode)
  const navigateOtp = createOtpNavigationHandler(otpCode)

  const handleOtpInput = (key: string) => {
    key === 'Backspace' ? removeOtp() : setOtp(key)
    setIsError(false)
  }
  const navigateToNextPage = async () => {
    const path = await onNavigate()
    path && push(path)
  }

  useEffect(() => {
    navigateOtp(refs, navigateToNextPage)
  }, [otpCode])

  return (
    <YStack
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      gap={10}
      alignSelf="stretch"
      justifyContent="center"
    >
      {otpCode.map((code, i) => {
        return (
          <Input
            display="flex"
            alignSelf="center"
            justifyContent="center"
            alignItems="center"
            width={50}
            height={74}
            margin={0}
            paddingVertical={20}
            paddingHorizontal={12}
            borderRadius={10}
            backgroundColor="#F0F0F0"
            gap={10}
            value={code}
            key={i}
            color="#6F6F6F"
            textAlign="center"
            textAlignVertical="center"
            fontFamily="$body"
            fontSize={20}
            letterSpacing={0.49}
            fontWeight="500"
            borderWidth={!isError ? 0 : 1.5}
            borderColor={!isError ? '#FFF' : 'red'}
            focusStyle={{
              outlineWidth: 1.5,
              outlineColor: !isError ? '#4F94F3' : 'red',
            }}
            keyboardType="number-pad"
            ref={(element) => element && (refs.current[i] = element)}
            onKeyPress={({ nativeEvent }) => handleOtpInput(nativeEvent.key)}
          />
        )
      })}
    </YStack>
  )
}
