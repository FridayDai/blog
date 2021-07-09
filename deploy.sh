#!/bin/sh
# npm install
# npm run production
# cd ./dist
# echo "!Password1234"
# scp -r /Users/daiyi/workspace/blog/dist/ root@106.15.93.13:/root/server/blog/
# echo "success"

# docker build -t fridaydai/blog:0.0.1 .
# docker container run --rm -p 3002:3002 -it fridaydai/blog:0.0.1

 npm run build
 cd ./serverDist
 echo "!Password1234"
 scp /Users/daiyi/workspace/blog/serverDist/server.js root@106.15.93.13:/root/server/blog
 echo "success"


#scp /Users/bytedance/workspace/blog/watermark/index.js root@106.15.93.13:/root/watermark/
#scp /Users/bytedance/workspace/blog/watermark/server.js root@106.15.93.13:/root/watermark/
#scp -r /Users/bytedance/workspace/blog/watermark/img root@106.15.93.13:/root/watermark/
#
#
#ffmpeg -r 30 -f image2 -i ./encode_png/%04d.png -i video.mp3 -vcodec libx264 -crf 25 -pix_fmt yuv420p -b 800k output.mp4
