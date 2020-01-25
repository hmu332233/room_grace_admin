FROM node:12
MAINTAINER minung.han <hmu332233@gmail.com>

# 앱 디렉토리 생성
RUN mkdir -p /app
WORKDIR /app

# 필수 라이브러리들 설치
RUN apt-get update && \
    apt-get install -y gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# 앱 의존성 설치
COPY package*.json ./
RUN  npm install --production

# 앱 소스 복사
COPY . .

# 포트 맵핑 및 환경변수
EXPOSE 3000
ENV NODE_ENV production

# 타임존 변경
RUN bash -c 'echo "Asia/Seoul" > /etc/timezone' && rm /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# apt-get 리스트 제거
RUN rm -rf /var/lib/apt/lists/*

CMD npm run start:server