/*
 * @Author: limengjuan
 * @Date: 2022-06-07 12:02:58
 * @LastEditors: limengjuan
 * @LastEditTime: 2022-06-07 12:15:55
 * @Description:视频监控
 */
import { v4 as uuidv4 } from 'uuid'

const VIDEO_MONITOR = [
  {
    id: uuidv4(),
    address: require('@/assets/images/video/smallVideo.png'),
    name: '视频监控',
    components: 'VideoMonitor',
    width: 1920 * 0.7,
    height: 977 * 0.7,
    currentWidth: '1920',
    currentHeight: '977',
    type: 'videoMonitor',
    zIndex: 1
  }
]
const VideoMonitor = () =>
  import('@/views/video-monitoring/index.vue')
const videoMonitorComponents = {
  VideoMonitor
}
export { VIDEO_MONITOR, videoMonitorComponents }
