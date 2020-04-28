업데이트: 2020년 04월 28일

## package.json scripts 설명

package.json scripts 에 선언된 명령어에 대한 설명입니다

### build scripts

설정파일은 `./webpack.config.js` 를 사용합니다.

| 명령어   | 설명                                                                 |
| -------- | -------------------------------------------------------------------- |
| `build`  | `webpack --mode=production` 실행 (`dist/` 디렉토리 생성)             |
| `server` | `webpack-dev-server --mode=development` 실행 (`http://0.0.0.0:8080`) |

### 기타 명령어

| 명령어 | 설명                  |
| ------ | --------------------- |
| `lint` | `eslint`를 실행합니다 |
