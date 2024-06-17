Web에서는 사용가능한 것들이 native에서는 되지 않는 것들이 있다.

- useForm경우 몇몇 args들은 native에서 사용안 됨

- ngrok
  Http tunnel, Web Interface, Public URL등 개발자에게 테스트를 위한 환경을 제공해준다.

  1.ngrok http http://localhost:4000 2.필요시 Authtoken설정 -> 홈페이지 참고 [https://dashboard.ngrok.com/get-started/setup/windows]

- Local tunnel
  npx localtunnel --port 8000

-핸드폰에서 ngrok 연결하기

1. QR코드를 사진으로 찍는다. (EXPO 앱이 다운되야 함)
2. 컴퓨터 cmd -> ngrok http http://localhost:4000 연결하면 나오는 Forwarding 주소 뒤에 /graphql을 더한뒤 apollo uri에 저장한다.
3. ngrok Forwarding주소가 apollo.js/tsx의 uri와 일치하면 핸드폰에서도 문제없이 모든 기능이 작동한다.
