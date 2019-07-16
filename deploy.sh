#!/bin/sh
jar -cvf blog.war *
echo "!Password1234"
scp /Users/bytedance/workspace/blog/blog.war root@106.15.93.13:/root/server/blog
echo "success"

# docker build -t fridaydai/blog:0.0.1 .
# docker container run --rm -p 3002:3002 -it fridaydai/blog:0.0.1


