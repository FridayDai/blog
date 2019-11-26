#!/bin/sh
# npm install
npm run production
cd ./dist
jar -cvf blog.war *
echo "!Password1234"
scp /Users/bytedance/workspace/blog/dist/blog.war root@106.15.93.13:/root/server/blog
echo "success"

# docker build -t fridaydai/blog:0.0.1 .
# docker container run --rm -p 3002:3002 -it fridaydai/blog:0.0.1

npm run build
cd ./serverDist
echo "!Password1234"
scp /Users/bytedance/workspace/blog/serverDist/server.js root@106.15.93.13:/root/server/blog
echo "success"
