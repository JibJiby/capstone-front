Docs
https://nextjs.org/docs/basic-features/typescript

---

<br><br>

### 전체 세팅

```bash
npx create-next-app@lastest --ts
```

추가로 node 타입 설치 (react 타입은 설치됨)

```bash
npm i -D @types/node
```

<br><br>

### emotion 설치

```bash
npm i @emotion/react @emotion/styled
npm i -D @emotion/babel-plugin emotion-normalize
```

<br><br>

### Eslint 설정

_react_

```bash
npm i -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

_prettier Eslint_

```bash
npm i -D eslint-config-prettier eslint-plugin-prettier
```

<br>

_typescript Eslint_

Dosc
https://www.npmjs.com/package/@typescript-eslint/eslint-plugin

```bash
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

<br><br>

### 테스트 추가

```bash
npm i -D @testing-library/jest-dom @testing-library/react @types/jest @types/react-dom jest
```
