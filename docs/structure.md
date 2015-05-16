## 워킹 디렉토리 구조

### 1. www
- /js
	- 서비스 코드, RadioApp
- /template
	- 뷰와 컨트롤러가 있는 폴더
	- 뷰, 컨트롤러는 같이 수정하는 경우가 많았음
	- 그래서 뷰가 detail.html라면, 컨트롤러는 detail.js로 이름 짓고 동일한 디렉토리에 위치시킴.
	- /tabs : LADIO의 탭(main, channel, private, search)의 UI를 담당
	- /brand & /channel & /issue & /product : 모든 탭에서 공통적으로 쓰이는 UI. 예) Product Detail Page, Channel Detail Page...
- /lib
	- 라이브러리
- /css
	- 커스텀 css 파일

### 2. plugin
- 모바일 디바이스를 제어하는 플러그인들이 설치됨.


### 3. resources
- icon, splach image들이 위치한 폴더.
- `$ ionic resources` 명령어로 icon, splash 이미지를 다양한 해상도를 플랫폼 별로 편하게 생성.
> 참조 : http://ionicframework.com/docs/cli/icon-splashscreen.html



