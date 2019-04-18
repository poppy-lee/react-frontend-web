업데이트: 2019 년 04 월 18 일

## package.json scripts 설명

package.json scripts 에 선언된 명령어에 대한 설명입니다

### build scripts

build 하는 방법과 관련 명령어에 대한 설명입니다.
설정파일은 `./webpack.config.js` 를 사용합니다.
build 결과물은 프로젝트 최상단의 `dist/` 디렉토리 내에 생성됩니다.

| 명령어  | 설명           |
| ------- | -------------- |
| `build` | `webpack` 실행 |

### webpack-dev-server 관련 명령어

`webpack-dev-server`를 실행합니다.
설정파일은 `./webpack.config.dev.js` 를 사용합니다.

| 명령어  | 설명                      |
| ------- | ------------------------- |
| `server` | `webpack-dev-server` 실행 (`http://0.0.0.0:8080`) |

### 기타 명령어

| 명령어 | 설명                  |
| ------ | --------------------- |
| `lint` | `tslint`를 실행합니다 |
