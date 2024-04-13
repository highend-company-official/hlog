# HLOG

본 서비스는 FSD 아키텍처를 준수하고 있습니다.

## Layers

- app
- pages
- widgets (기존의 Layout 구조와 유사 혹은 Feature들의 묶음을 표현할 것일수도 있음)
- features (동작을 정의, 이벤트 핸들링 같은 동작은 Features임)
  - post
  - login
  - join
  - write
  - 등 동사적 표현을 사용함.
- entities (기존의 Components 구조와 유사) - 데이터 부분은 entities로 만들면 된다
  - feed (Slice)
  - model (Segment, 데이터)
  - api (Segment, 서버 Data Fetching)
  - hooks (Segment, custom hook)
  - article (Slice)
  - 등 명사적 표현을 사용함.
- shared (Slice가 없음)

  - hook
  - typing
  - util

[styleX 문서 번역](https://www.frontoverflow.com/magazine/4/Meta%EC%97%90%EC%84%9C%20%EB%A7%8C%EB%93%A0%20%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20StyleX)
