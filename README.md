# Workflow

---

## Chapter

1. Devops
2. Nodejs + Express + Apollo + Basic Folder Strucrue
3. DB Modeling & DB (Prisma, MySQL)
4. Crwaling
5. API Dev Cycle
6. Build & Depolyment (Heroku)
7. API Features

---

## 1. Devops

1. []github
   - Git Hosting Service로 github 사용
   - New Repository 생성
     - https://github.com/utopier/utopier-blog-backend.git
   - git init
   - git add .
   - git commit -m 'First Commit'
   - git remote add origin https://github.com/utopier/utopier-blog-backend.git
   - git push --set-upstream origin master
   - git push -u origin master
2. []github + jira
   - Smart Commit (JIRA + Github)
   - Jira
     - 프로젝트 만들기 (이름: utopier-blog, 키: UB, 칸반)
     - App -> Github for Jira
     - 앱관리 -> Github -> Configuration
     - 프로젝트 -> 항목추가 -> 저장소 -> https://github.com/utopier/utopier-blog-backend.git
     - Smart Commit Test
3. []github + slack
   - Slack
     - 워크스페이스 생성 (utopier-blog)
     - App -> Github
     - Github -> /github subscribe utopier/utopier-blog-backend -> /github subscribe list -> /github subscribe list features
   - Github
     - Accout Settings -> Applications -> Slack -> Repository access
4. []jira + Slack
   - Slack
     - App -> Jira Cloud
     - /jira connect
   - JIRA
     - Slack Integration -> Edit
   - Slack
     - App -> Jira -> /jira create
5. []Software Process(git-flow, agile, Slack, Jira, Software Engineering)
   - **git-flow strategy**
     - master
       - origin/master, Tag
       - 배포준비된 코드
       - 병합시 git hook 스크립트로 자동 배포
     - develop
       - origin/develop
       - 배포하기 위해 개발하는 코드
     - feature
       - 기능 개발 브랜치
       - 시작브랜치: feature
       - 병합대상 브랜치: develop
       - 브랜치 이름 규칙: feature/{issue-number}-{feature-name}
     - release
       - 실제 배포할 상태가 된 경우
       - 시작브랜치: develop
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/release-..., Tag
     - hotfix
       - 배포된 운영버전에서 발생한 문제 해결
       - 시작브랜치: master
       - 병합대상 브랜치: develop, master
       - 브랜치이름 규칙: origin/hotfix-..., Tag
   - **Process**
     - 작업 시작전 JIRA 티켓 생성
     - 하나의 티켓은 하나의 커밋
     - 코드 리뷰 -> Pull Request 및 merge

## 2. Nodejs + Express + Apollo + Basic Folder Strucrue

1. [O]Install Packages
   - npm init -y
   - npm i apollo-server-express express graphql
   - npm i merge-graphql-schemas
   - npm i -D ts-node nodemon typescript
   - npm i morgan dotenv cors
   - tsconfig.json
   - .env
   - .gitignore
   - src/index.ts
   - package.json scripts 수정
2. [O]Folder Structure
   - .env
   - .gitignore
   - tsconfig.json
   - /prisma
     - schema.prisma
   - /src
     - index.ts
     - middlewares.ts
     - passport.ts
     - schema.ts
     - schema.graphql
     - utils.ts
     - /api
       - models.graphql
       - /Cart
       - /Comment
       - /Like
       - /Product
       - /Review
       - /User
     - /types

## 3. DB Modeling & DB (Prisma, MySQL)

1. [] Install Package
   - npm i @prisma/client
   - npm i -D @prisma/cli
2. []DB Modeling
3. []Prisma Setting(schema.prisma)

## 4. Crwaling(cheerio)

1. []Nike WebSite Crawling

## 5. API Dev With Prisma Client

- **passport,passport-local,passport-jwt,jsonwebtoken,bcryptjs**
- **multer, multer-s3**
- https://www.prisma.io/docs/concepts/components/prisma-client

## 6. Build & Depolyment (Heroku)

## 7. API Features
