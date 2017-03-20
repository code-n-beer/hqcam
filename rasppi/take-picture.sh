fswebcam -d /dev/video0 -r 1280x720 --jpeg 85 --fps 15 -D 1 -S 15 home/pi/hq-stream/pics/$(date +\%Y\%m\%d\%H\%M\%S).jpg
cd /home/pi/hq-stream/pics
NEW_JPEG=$(ls -t | grep '\>.jpg' | head -1)
cd ..
scp pics/$NEW_JPEG sudoer@192.168.8.201:/home/sudoer/hqcam/latest.jpg
scp pics/$NEW_JPEG sudoer@192.168.8.201:/home/sudoer/hqcam/backup/$NEW_JPEG
